import express from 'express'
import { searchController } from '../controllers/searchController.js'
import { optionalAuth } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validation.js'

const router = express.Router()

// Public routes (optional auth for personalized results)
router.use(optionalAuth)

// City search routes
router.get('/cities', searchController.searchCities)
router.get('/cities/popular', searchController.getPopularCities)
router.get('/cities/:id', searchController.getCity)
router.get('/countries/:country/destinations', searchController.getDestinationsByCountry)
router.get('/countries', searchController.getAllCountries)

// Activity search routes
router.get('/activities', searchController.searchActivities)
router.get('/activities/suggestions', searchController.getActivitySuggestions)

// Trip search routes
router.get('/trips', searchController.searchTrips)
router.get('/destinations/trending', searchController.getTrendingDestinations)

export default router
