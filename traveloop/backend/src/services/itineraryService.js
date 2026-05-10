import prisma from '../config/prisma.js'
import { createPaginationOptions } from '../utils/helpers.js'

export const itineraryService = {
  // Create stop for a trip
  async createStop(tripId, userId, stopData) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const stop = await prisma.stop.create({
      data: {
        ...stopData,
        date: new Date(stopData.date),
        tripId
      },
      include: {
        activities: true
      }
    })

    return stop
  },

  // Get all stops for a trip
  async getTripStops(tripId, userId = null) {
    const where = { tripId }
    
    // If userId is provided, verify access
    if (userId) {
      const trip = await prisma.trip.findFirst({
        where: { 
          OR: [
            { id: tripId, userId },
            { id: tripId, isPublic: true }
          ]
        }
      })

      if (!trip) {
        throw new Error('Trip not found or access denied')
      }
    }

    const stops = await prisma.stop.findMany({
      where,
      include: {
        activities: {
          orderBy: { time: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })

    return stops
  },

  // Update stop
  async updateStop(stopId, userId, updateData) {
    // Verify user owns the trip containing this stop
    const stop = await prisma.stop.findFirst({
      where: { id: stopId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!stop || stop.trip.userId !== userId) {
      throw new Error('Stop not found or access denied')
    }

    const updatedStop = await prisma.stop.update({
      where: { id: stopId },
      data: {
        ...updateData,
        ...(updateData.date && { date: new Date(updateData.date) })
      },
      include: {
        activities: true
      }
    })

    return updatedStop
  },

  // Delete stop
  async deleteStop(stopId, userId) {
    // Verify user owns the trip containing this stop
    const stop = await prisma.stop.findFirst({
      where: { id: stopId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!stop || stop.trip.userId !== userId) {
      throw new Error('Stop not found or access denied')
    }

    await prisma.stop.delete({
      where: { id: stopId }
    })

    return { success: true, message: 'Stop deleted successfully' }
  },

  // Reorder stops
  async reorderStops(tripId, userId, stopOrders) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    // Update all stops in a transaction
    const updatePromises = stopOrders.map(({ stopId, order }) =>
      prisma.stop.update({
        where: { id: stopId },
        data: { order }
      })
    )

    await prisma.$transaction(updatePromises)

    // Return updated stops
    return await this.getTripStops(tripId, userId)
  },

  // Create activity for a stop
  async createActivity(stopId, userId, activityData) {
    // Verify user owns the trip containing this stop
    const stop = await prisma.stop.findFirst({
      where: { id: stopId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!stop || stop.trip.userId !== userId) {
      throw new Error('Stop not found or access denied')
    }

    const activity = await prisma.activity.create({
      data: {
        ...activityData,
        ...(activityData.time && { time: new Date(activityData.time) }),
        stopId
      }
    })

    return activity
  },

  // Get all activities for a stop
  async getStopActivities(stopId, userId = null) {
    const where = { stopId }

    // If userId is provided, verify access
    if (userId) {
      const stop = await prisma.stop.findFirst({
        where: { id: stopId },
        include: {
          trip: {
            select: { userId: true, isPublic: true }
          }
        }
      })

      if (!stop || (stop.trip.userId !== userId && !stop.trip.isPublic)) {
        throw new Error('Stop not found or access denied')
      }
    }

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { time: 'asc' }
    })

    return activities
  },

  // Update activity
  async updateActivity(activityId, userId, updateData) {
    // Verify user owns the trip containing this activity
    const activity = await prisma.activity.findFirst({
      where: { id: activityId },
      include: {
        stop: {
          include: {
            trip: {
              select: { userId: true }
            }
          }
        }
      }
    })

    if (!activity || activity.stop.trip.userId !== userId) {
      throw new Error('Activity not found or access denied')
    }

    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        ...updateData,
        ...(updateData.time && { time: new Date(updateData.time) })
      }
    })

    return updatedActivity
  },

  // Delete activity
  async deleteActivity(activityId, userId) {
    // Verify user owns the trip containing this activity
    const activity = await prisma.activity.findFirst({
      where: { id: activityId },
      include: {
        stop: {
          include: {
            trip: {
              select: { userId: true }
            }
          }
        }
      }
    })

    if (!activity || activity.stop.trip.userId !== userId) {
      throw new Error('Activity not found or access denied')
    }

    await prisma.activity.delete({
      where: { id: activityId }
    })

    return { success: true, message: 'Activity deleted successfully' }
  },

  // Toggle activity completion
  async toggleActivityCompletion(activityId, userId) {
    // Verify user owns the trip containing this activity
    const activity = await prisma.activity.findFirst({
      where: { id: activityId },
      include: {
        stop: {
          include: {
            trip: {
              select: { userId: true }
            }
          }
        }
      }
    })

    if (!activity || activity.stop.trip.userId !== userId) {
      throw new Error('Activity not found or access denied')
    }

    const updatedActivity = await prisma.activity.update({
      where: { id: activityId },
      data: { isCompleted: !activity.isCompleted }
    })

    return updatedActivity
  },

  // Get complete itinerary for a trip
  async getTripItinerary(tripId, userId = null) {
    const where = { id: tripId }

    // If userId is provided, verify access
    if (userId) {
      const trip = await prisma.trip.findFirst({
        where: {
          OR: [
            { id: tripId, userId },
            { id: tripId, isPublic: true }
          ]
        }
      })

      if (!trip) {
        throw new Error('Trip not found or access denied')
      }
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        stops: {
          include: {
            activities: {
              orderBy: { time: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!trip) {
      throw new Error('Trip not found')
    }

    // Group activities by day
    const itinerary = trip.stops.map(stop => ({
      ...stop,
      activities: stop.activities.sort((a, b) => {
        if (a.time && b.time) {
          return new Date(a.time) - new Date(b.time)
        }
        return 0
      })
    }))

    return {
      trip: {
        id: trip.id,
        title: trip.title,
        destination: trip.destination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        status: trip.status
      },
      itinerary
    }
  },

  // Get activities by category for a trip
  async getActivitiesByCategory(tripId, userId) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const activities = await prisma.activity.findMany({
      where: {
        stop: {
          tripId
        }
      },
      include: {
        stop: {
          select: {
            name: true,
            date: true
          }
        }
      }
    })

    // Group by category
    const groupedActivities = activities.reduce((acc, activity) => {
      if (!acc[activity.category]) {
        acc[activity.category] = []
      }
      acc[activity.category].push(activity)
      return acc
    }, {})

    return groupedActivities
  }
}
