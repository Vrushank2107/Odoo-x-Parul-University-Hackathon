import { adminService } from '../services/adminService.js'
import { successResponse, createPaginationResponse, sendResponse } from '../utils/response.js'

export const adminController = {
  // Get dashboard statistics
  async getDashboardStats(req, res, next) {
    try {
      const stats = await adminService.getDashboardStats()

      const response = successResponse(
        'Dashboard statistics retrieved successfully',
        stats
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get all users
  async getUsers(req, res, next) {
    try {
      const { page, limit, search, role } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        search,
        role
      }

      const result = await adminService.getUsers(options)

      const response = createPaginationResponse(
        result.users,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get user by ID
  async getUser(req, res, next) {
    try {
      const { id } = req.params

      const user = await adminService.getUserById(id)

      const response = successResponse(
        'User retrieved successfully',
        user
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update user role
  async updateUserRole(req, res, next) {
    try {
      const { id } = req.params
      const { role } = req.body

      if (!['USER', 'ADMIN'].includes(role)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid role. Must be USER or ADMIN'
        })
      }

      const user = await adminService.updateUserRole(id, role)

      const response = successResponse(
        'User role updated successfully',
        user
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Delete user
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params

      // Prevent admin from deleting themselves
      if (id === req.user.id) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete your own account'
        })
      }

      const result = await adminService.deleteUser(id)

      const response = successResponse(
        'User deleted successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get all trips
  async getTrips(req, res, next) {
    try {
      const { page, limit, search, status, tripType, userId } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        search,
        status,
        tripType,
        userId
      }

      const result = await adminService.getTrips(options)

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

  // Get system health
  async getSystemHealth(req, res, next) {
    try {
      const health = await adminService.getSystemHealth()

      const response = successResponse(
        'System health retrieved successfully',
        health
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get activity logs
  async getActivityLogs(req, res, next) {
    try {
      const { page, limit, action, userId } = req.query

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 50,
        action,
        userId
      }

      const result = await adminService.getActivityLogs(options)

      const response = createPaginationResponse(
        result.logs,
        result.page,
        result.limit,
        result.total
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get database statistics
  async getDatabaseStats(req, res, next) {
    try {
      const stats = await adminService.getDatabaseStats()

      const response = successResponse(
        'Database statistics retrieved successfully',
        stats
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
