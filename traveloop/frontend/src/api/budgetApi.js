import api from './axios.js'

export const budgetApi = {
  // Budget management
  createBudget: async (tripId, budgetData) => {
    return await api.post(`/budget/trips/${tripId}/budgets`, budgetData)
  },

  getBudgets: async (tripId) => {
    return await api.get(`/budget/trips/${tripId}/budgets`)
  },

  updateBudget: async (budgetId, updateData) => {
    return await api.put(`/budget/budgets/${budgetId}`, updateData)
  },

  deleteBudget: async (budgetId) => {
    return await api.delete(`/budget/budgets/${budgetId}`)
  },

  // Expense management
  addExpense: async (budgetId, expenseData) => {
    return await api.post(`/budget/budgets/${budgetId}/expense`, expenseData)
  },

  // Budget insights
  getBudgetSummary: async (tripId) => {
    return await api.get(`/budget/trips/${tripId}/budgets/summary`)
  },

  getBudgetInsights: async (tripId) => {
    return await api.get(`/budget/trips/${tripId}/budgets/insights`)
  },

  getSpendingTrends: async (tripId) => {
    return await api.get(`/budget/trips/${tripId}/budgets/trends`)
  }
}
