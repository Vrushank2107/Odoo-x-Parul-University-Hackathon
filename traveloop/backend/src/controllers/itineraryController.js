import { itineraryService } from '../services/itineraryService.js'
import { successResponse, sendResponse } from '../utils/response.js'

export const itineraryController = {
  // Create stop
  async createStop(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const stopData = req.body

      const stop = await itineraryService.createStop(tripId, userId, stopData)

      const response = successResponse(
        'Stop created successfully',
        stop,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get all stops for a trip
  async getStops(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user?.id

      const stops = await itineraryService.getTripStops(tripId, userId)

      const response = successResponse(
        'Stops retrieved successfully',
        stops
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update stop
  async updateStop(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const updateData = req.body

      const stop = await itineraryService.updateStop(id, userId, updateData)

      const response = successResponse(
        'Stop updated successfully',
        stop
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Delete stop
  async deleteStop(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const result = await itineraryService.deleteStop(id, userId)

      const response = successResponse(
        'Stop deleted successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Reorder stops
  async reorderStops(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const { stopOrders } = req.body

      const stops = await itineraryService.reorderStops(tripId, userId, stopOrders)

      const response = successResponse(
        'Stops reordered successfully',
        stops
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Create activity
  async createActivity(req, res, next) {
    try {
      const { stopId } = req.params
      const userId = req.user.id
      const activityData = req.body

      const activity = await itineraryService.createActivity(stopId, userId, activityData)

      const response = successResponse(
        'Activity created successfully',
        activity,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get all activities for a stop
  async getActivities(req, res, next) {
    try {
      const { stopId } = req.params
      const userId = req.user?.id

      const activities = await itineraryService.getStopActivities(stopId, userId)

      const response = successResponse(
        'Activities retrieved successfully',
        activities
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update activity
  async updateActivity(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const updateData = req.body

      const activity = await itineraryService.updateActivity(id, userId, updateData)

      const response = successResponse(
        'Activity updated successfully',
        activity
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Delete activity
  async deleteActivity(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const result = await itineraryService.deleteActivity(id, userId)

      const response = successResponse(
        'Activity deleted successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Toggle activity completion
  async toggleActivityCompletion(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const activity = await itineraryService.toggleActivityCompletion(id, userId)

      const response = successResponse(
        'Activity completion toggled successfully',
        activity
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get complete itinerary for a trip
  async getItinerary(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user?.id

      const itinerary = await itineraryService.getTripItinerary(tripId, userId)

      const response = successResponse(
        'Itinerary retrieved successfully',
        itinerary
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get activities by category
  async getActivitiesByCategory(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id

      const activities = await itineraryService.getActivitiesByCategory(tripId, userId)

      const response = successResponse(
        'Activities by category retrieved successfully',
        activities
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
