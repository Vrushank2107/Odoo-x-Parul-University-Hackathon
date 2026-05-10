import { tripService } from '../services/tripService.js'
import { successResponse, createPaginationResponse, sendResponse } from '../utils/response.js'

export const tripController = {
  // Create new trip
  async createTrip(req, res, next) {
    try {
      const userId = req.user.id
      const tripData = req.body

      const trip = await tripService.createTrip(userId, tripData)

      const response = successResponse(
        'Trip created successfully',
        trip,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get all user trips
  async getTrips(req, res, next) {
    try {
      const userId = req.user.id
      const { page, limit, status, tripType, search } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        status,
        tripType,
        search
      }

      const result = await tripService.getUserTrips(userId, options)

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

  // Get trip by ID
  async getTrip(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user?.id

      const trip = await tripService.getTripById(id, userId)

      const response = successResponse(
        'Trip retrieved successfully',
        trip
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update trip
  async updateTrip(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const updateData = req.body

      const trip = await tripService.updateTrip(id, userId, updateData)

      const response = successResponse(
        'Trip updated successfully',
        trip
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Delete trip
  async deleteTrip(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const result = await tripService.deleteTrip(id, userId)

      const response = successResponse(
        'Trip deleted successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get trip statistics
  async getTripStats(req, res, next) {
    try {
      const userId = req.user.id

      const stats = await tripService.getTripStats(userId)

      const response = successResponse(
        'Trip statistics retrieved successfully',
        stats
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get upcoming trips
  async getUpcomingTrips(req, res, next) {
    try {
      const userId = req.user.id
      const { limit } = req.query

      const trips = await tripService.getUpcomingTrips(userId, parseInt(limit) || 5)

      const response = successResponse(
        'Upcoming trips retrieved successfully',
        trips
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get recent trips
  async getRecentTrips(req, res, next) {
    try {
      const userId = req.user.id
      const { limit } = req.query

      const trips = await tripService.getRecentTrips(userId, parseInt(limit) || 5)

      const response = successResponse(
        'Recent trips retrieved successfully',
        trips
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Search trips
  async searchTrips(req, res, next) {
    try {
      const userId = req.user.id
      const { q } = req.query
      const { page, limit } = req.query

      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        })
      }

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10
      }

      const result = await tripService.searchTrips(userId, q, options)

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

  // Duplicate trip
  async duplicateTrip(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const { title } = req.body

      const trip = await tripService.duplicateTrip(id, userId, title)

      const response = successResponse(
        'Trip duplicated successfully',
        trip,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
