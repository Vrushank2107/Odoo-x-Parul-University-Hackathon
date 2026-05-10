import express from 'express'
import { packingController } from '../controllers/packingController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validation.js'

const router = express.Router()

// All packing routes require authentication
router.use(authenticateToken)

// Checklist CRUD routes
router.post('/trips/:tripId/checklist', validate(schemas.createChecklistItem), packingController.createChecklistItem)
router.get('/trips/:tripId/checklist', packingController.getChecklist)
router.get('/trips/:tripId/checklist/stats', packingController.getPackingStats)
router.get('/trips/:tripId/checklist/suggestions', packingController.getPackingSuggestions)
router.put('/checklist/:id', validate(schemas.updateChecklistItem), packingController.updateChecklistItem)
router.delete('/checklist/:id', packingController.deleteChecklistItem)
router.patch('/checklist/:id/toggle', packingController.toggleItemPacked)
router.put('/trips/:tripId/checklist/bulk', packingController.bulkUpdateChecklist)
router.post('/trips/:fromTripId/checklist/duplicate/:toTripId', packingController.duplicateChecklist)

export default router
