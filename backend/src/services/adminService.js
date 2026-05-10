import prisma from '../config/prisma.js'
import { createPaginationOptions } from '../utils/helpers.js'

export const adminService = {
  // Get dashboard statistics
  async getDashboardStats() {
    const [
      totalUsers,
      totalTrips,
      activeTrips,
      completedTrips,
      totalBudget,
      totalSpent,
      recentUsers,
      popularDestinations,
      tripTypeStats
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Total trips
      prisma.trip.count(),
      
      // Active trips
      prisma.trip.count({ where: { status: 'ACTIVE' } }),
      
      // Completed trips
      prisma.trip.count({ where: { status: 'COMPLETED' } }),
      
      // Total budget allocated
      prisma.trip.aggregate({
        _sum: { budget: true }
      }),
      
      // Total spent
      prisma.trip.aggregate({
        _sum: { spent: true }
      }),
      
      // Recent users (last 30 days)
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          }
        }
      }),
      
      // Popular destinations
      prisma.trip.groupBy({
        by: ['destination'],
        _count: {
          id: true
        },
        orderBy: {
          _count: {
            id: 'desc'
          }
        },
        take: 10
      }),
      
      // Trip type statistics
      prisma.trip.groupBy({
        by: ['tripType'],
        _count: {
          id: true
        }
      })
    ])

    return {
      users: {
        total: totalUsers,
        recent: recentUsers
      },
      trips: {
        total: totalTrips,
        active: activeTrips,
        completed: completedTrips
      },
      budget: {
        totalAllocated: totalBudget._sum.budget || 0,
        totalSpent: totalSpent._sum.spent || 0
      },
      popularDestinations: popularDestinations.map(dest => ({
        destination: dest.destination,
        tripCount: dest._count.id
      })),
      tripTypes: tripTypeStats.map(stat => ({
        type: stat.tripType,
        count: stat._count.id
      }))
    }
  },

  // Get all users with pagination
  async getUsers(options = {}) {
    const { page = 1, limit = 20, search, role } = options
    const { skip, take } = createPaginationOptions(page, limit)

    const where = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (role) {
      where.role = role
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          avatar: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            trips: true
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.user.count({ where })
    ])

    return {
      users,
      total,
      page,
      limit
    }
  },

  // Get user by ID with detailed info
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          trips: true,
          notes: true
        },
        trips: {
          select: {
            id: true,
            title: true,
            destination: true,
            status: true,
            budget: true,
            spent: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  },

  // Update user role
  async updateUserRole(userId, role) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        updatedAt: true
      }
    })

    return updatedUser
  },

  // Delete user (admin action)
  async deleteUser(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error('User not found')
    }

    await prisma.user.delete({
      where: { id: userId }
    })

    return { success: true, message: 'User deleted successfully' }
  },

  // Get all trips with pagination
  async getTrips(options = {}) {
    const { page = 1, limit = 20, search, status, tripType, userId } = options
    const { skip, take } = createPaginationOptions(page, limit)

    const where = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { destination: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (status) {
      where.status = status
    }

    if (tripType) {
      where.tripType = tripType
    }

    if (userId) {
      where.userId = userId
    }

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true
            }
          },
          _count: {
            stops: true,
            notes: true,
            sharedTrips: true
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.trip.count({ where })
    ])

    return {
      trips,
      total,
      page,
      limit
    }
  },

  // Get system health metrics
  async getSystemHealth() {
    const now = new Date()
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const [
      totalUsers,
      newUsers30Days,
      newUsers7Days,
      totalTrips,
      newTrips30Days,
      newTrips7Days,
      activeTrips,
      completedTrips30Days,
      totalBudget,
      totalSpent,
      averageTripBudget,
      averageTripDuration
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: last30Days } }
      }),
      prisma.user.count({
        where: { createdAt: { gte: last7Days } }
      }),
      prisma.trip.count(),
      prisma.trip.count({
        where: { createdAt: { gte: last30Days } }
      }),
      prisma.trip.count({
        where: { createdAt: { gte: last7Days } }
      }),
      prisma.trip.count({ where: { status: 'ACTIVE' } }),
      prisma.trip.count({
        where: { 
          status: 'COMPLETED',
          updatedAt: { gte: last30Days }
        }
      }),
      prisma.trip.aggregate({
        _sum: { budget: true }
      }),
      prisma.trip.aggregate({
        _sum: { spent: true }
      }),
      prisma.trip.aggregate({
        _avg: { budget: true }
      }),
      prisma.trip.aggregate({
        _avg: {
          endDate: true,
          startDate: true
        }
      })
    ])

    // Calculate average trip duration in days
    const avgDuration = averageTripDuration._avg.startDate && averageTripDuration._avg.endDate
      ? Math.ceil((averageTripDuration._avg.endDate - averageTripDuration._avg.startDate) / (1000 * 60 * 60 * 24))
      : 0

    return {
      users: {
        total: totalUsers,
        newLast30Days: newUsers30Days,
        newLast7Days: newUsers7Days,
        growthRate30Days: totalUsers > 0 ? (newUsers30Days / totalUsers) * 100 : 0
      },
      trips: {
        total: totalTrips,
        newLast30Days: newTrips30Days,
        newLast7Days: newTrips7Days,
        active: activeTrips,
        completedLast30Days: completedTrips30Days,
        growthRate30Days: totalTrips > 0 ? (newTrips30Days / totalTrips) * 100 : 0
      },
      budget: {
        totalAllocated: totalBudget._sum.budget || 0,
        totalSpent: totalSpent._sum.spent || 0,
        averageBudget: averageTripBudget._avg.budget || 0
      },
      metrics: {
        averageTripDuration: avgDuration,
        budgetUtilization: totalBudget._sum.budget > 0 
          ? (totalSpent._sum.spent / totalBudget._sum.budget) * 100 
          : 0
      }
    }
  },

  // Get activity logs (simplified version)
  async getActivityLogs(options = {}) {
    const { page = 1, limit = 50, action, userId } = options
    const { skip, take } = createPaginationOptions(page, limit)

    // This is a simplified version - in production, you'd want proper activity logging
    const where = {}

    if (userId) {
      where.userId = userId
    }

    // For now, return recent trip activities as a proxy for activity logs
    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip,
        take,
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      }),
      prisma.trip.count({ where })
    ])

    const logs = trips.map(trip => ({
      id: trip.id,
      action: trip.status === 'COMPLETED' ? 'TRIP_COMPLETED' : 'TRIP_UPDATED',
      resource: 'TRIP',
      resourceId: trip.id,
      details: {
        title: trip.title,
        status: trip.status
      },
      user: trip.user,
      createdAt: trip.updatedAt
    }))

    return {
      logs,
      total,
      page,
      limit
    }
  },

  // Get database statistics
  async getDatabaseStats() {
    const [
      userCount,
      tripCount,
      stopCount,
      activityCount,
      budgetCount,
      noteCount,
      checklistCount,
      sharedTripCount,
      cityCount
    ] = await Promise.all([
      prisma.user.count(),
      prisma.trip.count(),
      prisma.stop.count(),
      prisma.activity.count(),
      prisma.budget.count(),
      prisma.note.count(),
      prisma.checklistItem.count(),
      prisma.sharedTrip.count(),
      prisma.city.count()
    ])

    return {
      users: userCount,
      trips: tripCount,
      stops: stopCount,
      activities: activityCount,
      budgets: budgetCount,
      notes: noteCount,
      checklistItems: checklistCount,
      sharedTrips: sharedTripCount,
      cities: cityCount
    }
  }
}
