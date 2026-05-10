import prisma from '../config/prisma.js'
import { generateShareCode, createPaginationOptions } from '../utils/helpers.js'

export const sharingService = {
  // Create share link for a trip
  async createShareLink(tripId, userId, shareOptions = {}) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const { canEdit = false, expiresAt = null } = shareOptions

    // Generate unique share code
    const shareCode = generateShareCode()

    // Create share entry
    const sharedTrip = await prisma.sharedTrip.create({
      data: {
        tripId,
        userId,
        shareCode,
        canEdit,
        expiresAt: expiresAt ? new Date(expiresAt) : null
      },
      include: {
        trip: {
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

    return {
      shareCode: sharedTrip.shareCode,
      shareUrl: `/shared/${sharedTrip.shareCode}`,
      canEdit: sharedTrip.canEdit,
      expiresAt: sharedTrip.expiresAt,
      trip: sharedTrip.trip
    }
  },

  // Get shared trip by share code
  async getSharedTrip(shareCode, userId = null) {
    const sharedTrip = await prisma.sharedTrip.findFirst({
      where: { 
        shareCode,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      },
      include: {
        trip: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            },
            stops: {
              include: {
                activities: {
                  orderBy: { time: 'asc' }
                }
              },
              orderBy: { order: 'asc' }
            },
            budgets: true,
            checklistItems: true,
            notes: {
              where: { isPublic: true },
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
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    if (!sharedTrip) {
      throw new Error('Shared trip not found or expired')
    }

    // Check if user has edit permissions
    let canEdit = sharedTrip.canEdit
    
    if (userId) {
      // User can edit if they are the owner or have explicit edit permission
      canEdit = sharedTrip.trip.userId === userId || sharedTrip.canEdit
    }

    return {
      trip: sharedTrip.trip,
      sharedBy: sharedTrip.user,
      canEdit,
      shareCode: sharedTrip.shareCode,
      expiresAt: sharedTrip.expiresAt
    }
  },

  // Get all shared trips for a user
  async getUserSharedTrips(userId, options = {}) {
    const { page = 1, limit = 10 } = options
    const { skip, take } = createPaginationOptions(page, limit)

    const [sharedTrips, total] = await Promise.all([
      prisma.sharedTrip.findMany({
        where: { userId },
        skip,
        take,
        include: {
          trip: {
            select: {
              id: true,
              title: true,
              destination: true,
              startDate: true,
              endDate: true,
              status: true,
              coverImage: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.sharedTrip.count({ where: { userId } })
    ])

    return {
      sharedTrips,
      total,
      page,
      limit
    }
  },

  // Update share permissions
  async updateSharePermissions(shareCode, userId, updateData) {
    // Verify user owns the shared trip
    const sharedTrip = await prisma.sharedTrip.findFirst({
      where: { 
        shareCode,
        user: { userId }
      },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!sharedTrip) {
      throw new Error('Shared trip not found or access denied')
    }

    const { canEdit, expiresAt } = updateData

    const updatedSharedTrip = await prisma.sharedTrip.update({
      where: { id: sharedTrip.id },
      data: {
        ...(canEdit !== undefined && { canEdit }),
        ...(expiresAt !== undefined && { expiresAt: expiresAt ? new Date(expiresAt) : null })
      },
      include: {
        trip: {
          select: {
            id: true,
            title: true,
            destination: true
          }
        }
      }
    })

    return updatedSharedTrip
  },

  // Revoke share access
  async revokeShareAccess(shareCode, userId) {
    // Verify user owns the shared trip
    const sharedTrip = await prisma.sharedTrip.findFirst({
      where: { 
        shareCode,
        user: { userId }
      }
    })

    if (!sharedTrip) {
      throw new Error('Shared trip not found or access denied')
    }

    await prisma.sharedTrip.delete({
      where: { id: sharedTrip.id }
    })

    return { success: true, message: 'Share access revoked successfully' }
  },

  // Duplicate trip from shared link
  async duplicateFromSharedTrip(shareCode, userId, newTitle) {
    // Get the shared trip
    const sharedTrip = await this.getSharedTrip(shareCode)

    if (!sharedTrip) {
      throw new Error('Shared trip not found')
    }

    const originalTrip = sharedTrip.trip

    // Create new trip based on shared trip
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

      // Get newly created stops to copy activities
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

    // Return complete duplicated trip
    return await prisma.trip.findUnique({
      where: { id: newTrip.id },
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
  },

  // Get share statistics for a trip
  async getShareStats(tripId, userId) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const [totalShares, activeShares] = await Promise.all([
      prisma.sharedTrip.count({
        where: { tripId }
      }),
      prisma.sharedTrip.count({
        where: { 
          tripId,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } }
          ]
        }
      })
    ])

    return {
      totalShares,
      activeShares,
      expiredShares: totalShares - activeShares
    }
  },

  // Clean up expired shares
  async cleanupExpiredShares() {
    const result = await prisma.sharedTrip.deleteMany({
      where: {
        expiresAt: {
          lt: new Date()
        }
      }
    })

    return {
      deletedCount: result.count,
      message: `Cleaned up ${result.count} expired share links`
    }
  }
}
