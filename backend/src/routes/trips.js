import express from 'express'
import { tripController } from '../controllers/tripController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validation.js'

const router = express.Router()

// All trip routes require authentication
router.use(authenticateToken)

// Trip CRUD routes
router.post('/', validate(schemas.createTrip), tripController.createTrip)
router.get('/', tripController.getTrips)
router.get('/search', tripController.searchTrips)
router.get('/stats', tripController.getTripStats)
router.get('/upcoming', tripController.getUpcomingTrips)
router.get('/recent', tripController.getRecentTrips)
router.get('/:id', tripController.getTrip)
router.put('/:id', validate(schemas.updateTrip), tripController.updateTrip)
router.delete('/:id', tripController.deleteTrip)
router.post('/:id/duplicate', tripController.duplicateTrip)

export default router
