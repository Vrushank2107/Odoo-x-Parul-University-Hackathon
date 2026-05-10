import { packingService } from '../services/packingService.js'
import { successResponse, sendResponse } from '../utils/response.js'

export const packingController = {
  // Create checklist item
  async createChecklistItem(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const itemData = req.body

      const item = await packingService.createChecklistItem(tripId, userId, itemData)

      const response = successResponse(
        'Checklist item created successfully',
        item,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get trip checklist
  async getChecklist(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user?.id

      const checklist = await packingService.getTripChecklist(tripId, userId)

      const response = successResponse(
        'Checklist retrieved successfully',
        checklist
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update checklist item
  async updateChecklistItem(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id
      const updateData = req.body

      const item = await packingService.updateChecklistItem(id, userId, updateData)

      const response = successResponse(
        'Checklist item updated successfully',
        item
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Delete checklist item
  async deleteChecklistItem(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const result = await packingService.deleteChecklistItem(id, userId)

      const response = successResponse(
        'Checklist item deleted successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Toggle item packed status
  async toggleItemPacked(req, res, next) {
    try {
      const { id } = req.params
      const userId = req.user.id

      const item = await packingService.toggleItemPacked(id, userId)

      const response = successResponse(
        'Item status toggled successfully',
        item
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Bulk update checklist items
  async bulkUpdateChecklist(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const { updates } = req.body

      if (!Array.isArray(updates)) {
        return res.status(400).json({
          success: false,
          message: 'Updates must be an array'
        })
      }

      const checklist = await packingService.bulkUpdateChecklist(tripId, userId, updates)

      const response = successResponse(
        'Checklist updated successfully',
        checklist
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get packing suggestions
  async getPackingSuggestions(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id

      const suggestions = await packingService.getPackingSuggestions(tripId, userId)

      const response = successResponse(
        'Packing suggestions retrieved successfully',
        suggestions
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get packing statistics
  async getPackingStats(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id

      const stats = await packingService.getPackingStats(tripId, userId)

      const response = successResponse(
        'Packing statistics retrieved successfully',
        stats
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Duplicate checklist
  async duplicateChecklist(req, res, next) {
    try {
      const { fromTripId, toTripId } = req.params
      const userId = req.user.id

      const result = await packingService.duplicateChecklist(fromTripId, toTripId, userId)

      const response = successResponse(
        'Checklist duplicated successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
