import express from 'express'
import { itineraryController } from '../controllers/itineraryController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validation.js'

const router = express.Router()

// All itinerary routes require authentication
router.use(authenticateToken)

// Stop routes
router.post('/trips/:tripId/stops', validate(schemas.createStop), itineraryController.createStop)
router.get('/trips/:tripId/stops', itineraryController.getStops)
router.put('/stops/:id', validate(schemas.updateStop), itineraryController.updateStop)
router.delete('/stops/:id', itineraryController.deleteStop)
router.put('/trips/:tripId/stops/reorder', itineraryController.reorderStops)

// Activity routes
router.post('/stops/:stopId/activities', validate(schemas.createActivity), itineraryController.createActivity)
router.get('/stops/:stopId/activities', itineraryController.getActivities)
router.put('/activities/:id', validate(schemas.updateActivity), itineraryController.updateActivity)
router.delete('/activities/:id', itineraryController.deleteActivity)
router.patch('/activities/:id/toggle', itineraryController.toggleActivityCompletion)

// Itinerary routes
router.get('/trips/:tripId/itinerary', itineraryController.getItinerary)
router.get('/trips/:tripId/activities/by-category', itineraryController.getActivitiesByCategory)

export default router
