import prisma from '../config/prisma.js'
import { 
  formatTrip, 
  calculateTripStats, 
  createPaginationOptions,
  validateDateRange 
} from '../utils/helpers.js'

export const tripService = {
  // Create new trip
  async createTrip(userId, tripData) {
    const { title, destination, description, startDate, endDate, budget, tripType, travelers } = tripData

    // Validate date range
    const dateValidation = validateDateRange(startDate, endDate)
    if (!dateValidation.valid) {
      throw new Error(dateValidation.message)
    }

    const trip = await prisma.trip.create({
      data: {
        title,
        destination,
        description,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget,
        tripType,
        travelers,
        userId
      },
      include: {
        budgets: true,
        stops: {
          include: {
            activities: true
          }
        },
        checklistItems: true,
        notes: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return formatTrip(trip)
  },

  // Get all trips for a user (including shared trips)
  async getUserTrips(userId, options = {}) {
    const { page = 1, limit = 10, status, tripType, search } = options
    const { skip, take } = createPaginationOptions(page, limit)

    const where = {
      OR: [
        // User's own trips
        { userId },
        // Shared trips from other users
        { 
          sharedTrips: { 
            some: { userId }
          }
        },
        // Public trips from all users
        { isPublic: true }
      ],
      ...(status && { status }),
      ...(tripType && { tripType }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { destination: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      })
    }

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip,
        take,
        include: {
          budgets: true,
          stops: {
            include: {
              activities: true
            }
          },
          checklistItems: true,
          notes: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.trip.count({ where })
    ])

    const formattedTrips = trips.map(formatTrip)

    return {
      trips: formattedTrips,
      total,
      page,
      limit
    }
  },

  // Get trip by ID
  async getTripById(tripId, userId = null) {
    const where = { id: tripId }
    
    // If userId is provided, ensure user owns the trip or trip is public
    if (userId) {
      where.OR = [
        { userId },
        { isPublic: true }
      ]
    }

    const trip = await prisma.trip.findFirst({
      where,
      include: {
        budgets: true,
        stops: {
          include: {
            activities: {
              orderBy: { time: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        },
        checklistItems: true,
        notes: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        },
        sharedTrips: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        }
      }
    })

    if (!trip) {
      throw new Error('Trip not found')
    }

    return formatTrip(trip)
  },

  // Update trip
  async updateTrip(tripId, userId, updateData) {
    // Verify user owns the trip
    const existingTrip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!existingTrip) {
      throw new Error('Trip not found or access denied')
    }

    // Validate date range if dates are being updated
    if (updateData.startDate || updateData.endDate) {
      const startDate = updateData.startDate || existingTrip.startDate
      const endDate = updateData.endDate || existingTrip.endDate
      const dateValidation = validateDateRange(startDate, endDate)
      if (!dateValidation.valid) {
        throw new Error(dateValidation.message)
      }
    }

    const trip = await prisma.trip.update({
      where: { id: tripId },
      data: {
        ...updateData,
        ...(updateData.startDate && { startDate: new Date(updateData.startDate) }),
        ...(updateData.endDate && { endDate: new Date(updateData.endDate) })
      },
      include: {
        budgets: true,
        stops: {
          include: {
            activities: true
          }
        },
        checklistItems: true,
        notes: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    })

    return formatTrip(trip)
  },

  // Delete trip
  async deleteTrip(tripId, userId) {
    // Verify user owns the trip
    const existingTrip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!existingTrip) {
      throw new Error('Trip not found or access denied')
    }

    await prisma.trip.delete({
      where: { id: tripId }
    })

    return { success: true, message: 'Trip deleted successfully' }
  },

  // Get trip statistics
  async getTripStats(userId) {
    const trips = await prisma.trip.findMany({
      where: { userId },
      include: {
        budgets: true
      }
    })

    return calculateTripStats(trips)
  },

  // Get upcoming trips
  async getUpcomingTrips(userId, limit = 5) {
    const now = new Date()
    
    const trips = await prisma.trip.findMany({
      where: {
        userId,
        startDate: { gt: now },
        status: { in: ['PLANNED', 'ACTIVE'] }
      },
      include: {
        budgets: true
      },
      orderBy: { startDate: 'asc' },
      take: limit
    })

    return trips.map(formatTrip)
  },

  // Get recent trips
  async getRecentTrips(userId, limit = 5) {
    const trips = await prisma.trip.findMany({
      where: {
        userId,
        status: 'COMPLETED'
      },
      include: {
        budgets: true
      },
      orderBy: { updatedAt: 'desc' },
      take: limit
    })

    return trips.map(formatTrip)
  },

  // Search trips
  async searchTrips(userId, query, options = {}) {
    const { page = 1, limit = 10 } = options
    const { skip, take } = createPaginationOptions(page, limit)

    const where = {
      userId,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { destination: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ]
    }

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip,
        take,
        include: {
          budgets: true,
          stops: {
            include: {
              activities: true
            }
          },
          checklistItems: true,
          notes: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.trip.count({ where })
    ])

    const formattedTrips = trips.map(formatTrip)

    return {
      trips: formattedTrips,
      total,
      page,
      limit,
      query
    }
  },

  // Duplicate trip
  async duplicateTrip(tripId, userId, newTitle) {
    const originalTrip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        budgets: true,
        stops: {
          include: {
            activities: true
          }
        },
        checklistItems: true
      }
    })

    if (!originalTrip) {
      throw new Error('Original trip not found')
    }

    // Create new trip based on original
    const newTrip = await prisma.trip.create({
      data: {
        title: newTitle || `${originalTrip.title} (Copy)`,
        destination: originalTrip.destination,
        description: originalTrip.description,
        startDate: new Date(originalTrip.startDate),
        endDate: new Date(originalTrip.endDate),
        budget: originalTrip.budget,
        tripType: originalTrip.tripType,
        travelers: originalTrip.travelers,
        userId
      }
    })

    // Copy budgets
    if (originalTrip.budgets.length > 0) {
      await prisma.budget.createMany({
        data: originalTrip.budgets.map(budget => ({
          ...budget,
          id: undefined,
          tripId: newTrip.id
        }))
      })
    }

    // Copy stops and activities
    if (originalTrip.stops.length > 0) {
      const newStops = await prisma.stop.createMany({
        data: originalTrip.stops.map(stop => ({
          ...stop,
          id: undefined,
          tripId: newTrip.id
        }))
      })

      // Get the newly created stops to copy activities
      const createdStops = await prisma.stop.findMany({
        where: { tripId: newTrip.id },
        orderBy: { order: 'asc' }
      })

      for (let i = 0; i < originalTrip.stops.length; i++) {
        const originalStop = originalTrip.stops[i]
        const newStop = createdStops[i]

        if (originalStop.activities.length > 0) {
          await prisma.activity.createMany({
            data: originalStop.activities.map(activity => ({
              ...activity,
              id: undefined,
              stopId: newStop.id
            }))
          })
        }
      }
    }

    // Copy checklist items
    if (originalTrip.checklistItems.length > 0) {
      await prisma.checklistItem.createMany({
        data: originalTrip.checklistItems.map(item => ({
          ...item,
          id: undefined,
          tripId: newTrip.id
        }))
      })
    }

    // Return the complete duplicated trip
    return await this.getTripById(newTrip.id)
  }
}
