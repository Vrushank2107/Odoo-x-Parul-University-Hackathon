import { searchService } from '../services/searchService.js'
import { successResponse, createPaginationResponse, sendResponse } from '../utils/response.js'

export const searchController = {
  // Search cities
  async searchCities(req, res, next) {
    try {
      const { q } = req.query
      const { page, limit, popular, country } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        popular: popular === 'true',
        country
      }

      const result = await searchService.searchCities(q, options)

      const response = createPaginationResponse(
        result.cities,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get popular cities
  async getPopularCities(req, res, next) {
    try {
      const { limit } = req.query

      const cities = await searchService.getPopularCities(parseInt(limit) || 10)

      const response = successResponse(
        'Popular cities retrieved successfully',
        cities
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get city by ID
  async getCity(req, res, next) {
    try {
      const { id } = req.params

      const city = await searchService.getCityById(id)

      const response = successResponse(
        'City retrieved successfully',
        city
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Search activities
  async searchActivities(req, res, next) {
    try {
      const userId = req.user?.id
      const { q } = req.query
      const { page, limit, category, tripId } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        category,
        tripId
      }

      const result = await searchService.searchActivities(userId, q, options)

      const response = createPaginationResponse(
        result.activities,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get activity suggestions
  async getActivitySuggestions(req, res, next) {
    try {
      const { destination, tripType } = req.query

      const suggestions = await searchService.getActivitySuggestions(
        destination,
        tripType || 'LEISURE'
      )

      const response = successResponse(
        'Activity suggestions retrieved successfully',
        suggestions
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get destinations by country
  async getDestinationsByCountry(req, res, next) {
    try {
      const { country } = req.params
      const { page, limit } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20
      }

      const result = await searchService.getDestinationsByCountry(country, options)

      const response = createPaginationResponse(
        result.cities,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get all countries
  async getAllCountries(req, res, next) {
    try {
      const countries = await searchService.getAllCountries()

      const response = successResponse(
        'Countries retrieved successfully',
        countries
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Search trips
  async searchTrips(req, res, next) {
    try {
      const userId = req.user?.id
      const { q } = req.query
      const { page, limit, status, tripType, destination } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        status,
        tripType,
        destination
      }

      const result = await searchService.searchTrips(userId, q, options)

      const response = createPaginationResponse(
        result.trips,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get trending destinations
  async getTrendingDestinations(req, res, next) {
    try {
      const { limit } = req.query

      const destinations = await searchService.getTrendingDestinations(parseInt(limit) || 10)

      const response = successResponse(
        'Trending destinations retrieved successfully',
        destinations
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
