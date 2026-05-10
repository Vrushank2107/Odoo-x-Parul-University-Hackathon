import prisma from '../config/prisma.js'
import { calculateBudgetStats, createPaginationOptions } from '../utils/helpers.js'

export const budgetService = {
  // Create budget category for a trip
  async createBudget(tripId, userId, budgetData) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    // Check if budget category already exists for this trip
    const existingBudget = await prisma.budget.findFirst({
      where: {
        tripId,
        category: budgetData.category
      }
    })

    if (existingBudget) {
      throw new Error(`Budget category '${budgetData.category}' already exists for this trip`)
    }

    const budget = await prisma.budget.create({
      data: {
        ...budgetData,
        tripId
      }
    })

    return budget
  },

  // Get all budgets for a trip
  async getTripBudgets(tripId, userId = null) {
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

    const budgets = await prisma.budget.findMany({
      where,
      orderBy: { category: 'asc' }
    })

    // Calculate overall budget stats
    const budgetStats = calculateBudgetStats(budgets)

    return {
      budgets,
      stats: budgetStats
    }
  },

  // Update budget
  async updateBudget(budgetId, userId, updateData) {
    // Verify user owns the trip containing this budget
    const budget = await prisma.budget.findFirst({
      where: { id: budgetId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!budget || budget.trip.userId !== userId) {
      throw new Error('Budget not found or access denied')
    }

    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId },
      data: updateData
    })

    return updatedBudget
  },

  // Delete budget
  async deleteBudget(budgetId, userId) {
    // Verify user owns the trip containing this budget
    const budget = await prisma.budget.findFirst({
      where: { id: budgetId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!budget || budget.trip.userId !== userId) {
      throw new Error('Budget not found or access denied')
    }

    await prisma.budget.delete({
      where: { id: budgetId }
    })

    return { success: true, message: 'Budget deleted successfully' }
  },

  // Add expense to budget category
  async addExpense(budgetId, userId, amount, description) {
    // Verify user owns the trip containing this budget
    const budget = await prisma.budget.findFirst({
      where: { id: budgetId },
      include: {
        trip: {
          select: { userId: true }
        }
      }
    })

    if (!budget || budget.trip.userId !== userId) {
      throw new Error('Budget not found or access denied')
    }

    // Update spent amount
    const updatedBudget = await prisma.budget.update({
      where: { id: budgetId },
      data: {
        spent: {
          increment: amount
        }
      }
    })

    // Update trip's total spent
    await prisma.trip.update({
      where: { id: budget.tripId },
      data: {
        spent: {
          increment: amount
        }
      }
    })

    return updatedBudget
  },

  // Get budget summary for a trip
  async getBudgetSummary(tripId, userId = null) {
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
        budgets: true
      }
    })

    if (!trip) {
      throw new Error('Trip not found')
    }

    const budgetStats = calculateBudgetStats(trip.budgets)

    return {
      trip: {
        id: trip.id,
        title: trip.title,
        totalBudget: trip.budget,
        totalSpent: trip.spent
      },
      budgets: trip.budgets,
      summary: budgetStats
    }
  },

  // Get budget insights and recommendations
  async getBudgetInsights(tripId, userId) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId },
      include: {
        budgets: true
      }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    const budgetStats = calculateBudgetStats(trip.budgets)
    
    // Generate insights
    const insights = []

    // Over budget warning
    if (budgetStats.isOverBudget) {
      insights.push({
        type: 'warning',
        title: 'Over Budget',
        message: `You're ${budgetStats.spent - budgetStats.allocated} over budget. Consider reducing expenses in some categories.`,
        severity: 'high'
      })
    }

    // Near budget warning
    if (budgetStats.spentPercentage > 80 && budgetStats.spentPercentage < 100) {
      insights.push({
        type: 'warning',
        title: 'Approaching Budget Limit',
        message: `You've used ${budgetStats.spentPercentage.toFixed(1)}% of your budget. Keep track of remaining expenses.`,
        severity: 'medium'
      })
    }

    // Category-specific insights
    trip.budgets.forEach(budget => {
      const categoryPercentage = (budget.spent / budget.allocated) * 100
      
      if (categoryPercentage > 100) {
        insights.push({
          type: 'warning',
          title: `${budget.category} Over Budget`,
          message: `You've spent ${budget.spent} on ${budget.category.toLowerCase()}, which exceeds the allocated ${budget.allocated}.`,
          severity: 'high',
          category: budget.category
        })
      } else if (categoryPercentage > 80) {
        insights.push({
          type: 'info',
          title: `${budget.category} Near Limit`,
          message: `${budget.spent} spent on ${budget.category.toLowerCase()} (${categoryPercentage.toFixed(1)}% of allocated).`,
          severity: 'medium',
          category: budget.category
        })
      }

      // Under-utilized categories
      if (categoryPercentage < 30 && budget.allocated > 0) {
        insights.push({
          type: 'info',
          title: `${budget.category} Underutilized`,
          message: `Only ${budget.spent} spent on ${budget.category.toLowerCase()} (${categoryPercentage.toFixed(1)}% of allocated). Consider reallocating funds.`,
          severity: 'low',
          category: budget.category
        })
      }
    })

    // Spending recommendations
    const recommendations = []

    if (budgetStats.spentPercentage < 50 && trip.status === 'ACTIVE') {
      recommendations.push({
        type: 'suggestion',
        title: 'Increase Activities Budget',
        message: 'You have room in your budget to add more activities or experiences.'
      })
    }

    if (budgetStats.remaining > 100) {
      recommendations.push({
        type: 'suggestion',
        title: 'Emergency Fund',
        message: `Consider setting aside ${budgetStats.remaining * 0.1} as an emergency fund for unexpected expenses.`
      })
    }

    return {
      summary: budgetStats,
      insights,
      recommendations
    }
  },

  // Get spending trends
  async getSpendingTrends(tripId, userId) {
    // Verify user owns the trip
    const trip = await prisma.trip.findFirst({
      where: { id: tripId, userId },
      include: {
        budgets: true,
        stops: {
          include: {
            activities: true
          }
        }
      }
    })

    if (!trip) {
      throw new Error('Trip not found or access denied')
    }

    // Calculate spending by category from activities
    const spendingByCategory = {}
    
    trip.stops.forEach(stop => {
      stop.activities.forEach(activity => {
        if (activity.cost) {
          if (!spendingByCategory[activity.category]) {
            spendingByCategory[activity.category] = 0
          }
          spendingByCategory[activity.category] += activity.cost
        }
      })
    })

    // Combine with budget data
    const trends = trip.budgets.map(budget => ({
      category: budget.category,
      allocated: budget.allocated,
      spent: budget.spent,
      activitySpending: spendingByCategory[budget.category] || 0,
      percentage: budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0
    }))

    return {
      trends,
      totalSpent: trip.spent,
      totalAllocated: trip.budgets.reduce((sum, b) => sum + b.allocated, 0)
    }
  }
}
