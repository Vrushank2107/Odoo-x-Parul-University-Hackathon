import { sharingService } from '../services/sharingService.js'
import { successResponse, createPaginationResponse, sendResponse } from '../utils/response.js'

export const sharingController = {
  // Create share link
  async createShareLink(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id
      const shareOptions = req.body

      const shareData = await sharingService.createShareLink(tripId, userId, shareOptions)

      const response = successResponse(
        'Share link created successfully',
        shareData,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get shared trip
  async getSharedTrip(req, res, next) {
    try {
      const { shareCode } = req.params
      const userId = req.user?.id

      const sharedTrip = await sharingService.getSharedTrip(shareCode, userId)

      const response = successResponse(
        'Shared trip retrieved successfully',
        sharedTrip
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get user's shared trips
  async getUserSharedTrips(req, res, next) {
    try {
      const userId = req.user.id
      const { page, limit } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10
      }

      const result = await sharingService.getUserSharedTrips(userId, options)

      const response = createPaginationResponse(
        result.sharedTrips,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update share permissions
  async updateSharePermissions(req, res, next) {
    try {
      const { shareCode } = req.params
      const userId = req.user.id
      const updateData = req.body

      const updatedShare = await sharingService.updateSharePermissions(shareCode, userId, updateData)

      const response = successResponse(
        'Share permissions updated successfully',
        updatedShare
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Revoke share access
  async revokeShareAccess(req, res, next) {
    try {
      const { shareCode } = req.params
      const userId = req.user.id

      const result = await sharingService.revokeShareAccess(shareCode, userId)

      const response = successResponse(
        'Share access revoked successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Duplicate trip from shared link
  async duplicateFromSharedTrip(req, res, next) {
    try {
      const { shareCode } = req.params
      const userId = req.user.id
      const { title } = req.body

      const duplicatedTrip = await sharingService.duplicateFromSharedTrip(shareCode, userId, title)

      const response = successResponse(
        'Trip duplicated successfully',
        duplicatedTrip,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get share statistics
  async getShareStats(req, res, next) {
    try {
      const { tripId } = req.params
      const userId = req.user.id

      const stats = await sharingService.getShareStats(tripId, userId)

      const response = successResponse(
        'Share statistics retrieved successfully',
        stats
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Clean up expired shares (admin only)
  async cleanupExpiredShares(req, res, next) {
    try {
      const result = await sharingService.cleanupExpiredShares()

      const response = successResponse(
        'Expired shares cleaned up successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
