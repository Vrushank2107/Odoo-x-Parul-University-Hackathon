import { budgetService } from '../services/budgetService.js'
import { successResponse, sendResponse } from '../utils/response.js'

export const budgetController = {
  // Create budget category
  async createBudget(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const budgetData = req.body

      const budget = await budgetService.createBudget(tripId, userId, budgetData)

      const response = successResponse(
        'Budget created successfully',
        budget,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get all budgets for a trip
  async getBudgets(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user?.id

      const result = await budgetService.getTripBudgets(tripId, userId)

      const response = successResponse(
        'Budgets retrieved successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update budget
  async updateBudget(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const updateData = req.body

      const budget = await budgetService.updateBudget(id, userId, updateData)

      const response = successResponse(
        'Budget updated successfully',
        budget
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Delete budget
  async deleteBudget(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const result = await budgetService.deleteBudget(id, userId)

      const response = successResponse(
        'Budget deleted successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Add expense to budget
  async addExpense(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const { amount, description } = req.body

      if (!amount || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Valid expense amount is required'
        })
      }

      const budget = await budgetService.addExpense(id, userId, amount, description)

      const response = successResponse(
        'Expense added successfully',
        budget
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get budget summary
  async getBudgetSummary(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user?.id

      const summary = await budgetService.getBudgetSummary(tripId, userId)

      const response = successResponse(
        'Budget summary retrieved successfully',
        summary
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get budget insights
  async getBudgetInsights(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id

      const insights = await budgetService.getBudgetInsights(tripId, userId)

      const response = successResponse(
        'Budget insights retrieved successfully',
        insights
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get spending trends
  async getSpendingTrends(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id

      const trends = await budgetService.getSpendingTrends(tripId, userId)

      const response = successResponse(
        'Spending trends retrieved successfully',
        trends
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
