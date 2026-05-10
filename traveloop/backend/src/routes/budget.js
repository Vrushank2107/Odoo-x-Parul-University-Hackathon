import express from 'express'
import { budgetController } from '../controllers/budgetController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validation.js'

const router = express.Router()

// All budget routes require authentication
router.use(authenticateToken)

// Budget CRUD routes
router.post('/trips/:tripId/budgets', validate(schemas.createBudget), budgetController.createBudget)
router.get('/trips/:tripId/budgets', budgetController.getBudgets)
router.get('/trips/:tripId/budgets/summary', budgetController.getBudgetSummary)
router.get('/trips/:tripId/budgets/insights', budgetController.getBudgetInsights)
router.get('/trips/:tripId/budgets/trends', budgetController.getSpendingTrends)
router.put('/budgets/:id', validate(schemas.updateBudget), budgetController.updateBudget)
router.delete('/budgets/:id', budgetController.deleteBudget)
router.post('/budgets/:id/expense', budgetController.addExpense)

export default router
