import { authService } from '../services/authService.js'
import { successResponse, errorResponse, sendResponse } from '../utils/response.js'

export const authController = {
  // Register new user
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body

      const result = await authService.signup({ name, email, password })

      const response = successResponse(
        'User registered successfully',
        result,
        201
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Login user
  async login(req, res, next) {
    try {
      const { email, password } = req.body

      const result = await authService.login(email, password)

      const response = successResponse(
        'Login successful',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Get current user profile
  async getMe(req, res, next) {
    try {
      const userId = req.user.id

      const user = await authService.getUserById(userId)

      const response = successResponse(
        'User profile retrieved successfully',
        user
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Update user profile
  async updateProfile(req, res, next) {
    try {
      const userId = req.user.id
      const { name, avatar } = req.body

      const user = await authService.updateUser(userId, { name, avatar })

      const response = successResponse(
        'Profile updated successfully',
        user
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Change password
  async changePassword(req, res, next) {
    try {
      const userId = req.user.id
      const { currentPassword, newPassword } = req.body

      const result = await authService.changePassword(userId, currentPassword, newPassword)

      const response = successResponse(
        'Password changed successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Refresh access token
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body

      const result = await authService.refreshToken(refreshToken)

      const response = successResponse(
        'Token refreshed successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Logout (client-side token removal)
  async logout(req, res, next) {
    try {
      // In a stateless JWT setup, logout is handled client-side
      // But we can add token blacklisting if needed
      
      const response = successResponse(
        'Logout successful'
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Delete user account
  async deleteAccount(req, res, next) {
    try {
      const userId = req.user.id

      const result = await authService.deleteUser(userId)

      const response = successResponse(
        'Account deleted successfully',
        result
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Request password reset
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body

      const result = await authService.forgotPassword(email)

      const response = successResponse(
        result.message,
        { success: result.success }
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  },

  // Reset password with token
  async resetPassword(req, res, next) {
    try {
      const { token, newPassword } = req.body

      const result = await authService.resetPassword(token, newPassword)

      const response = successResponse(
        result.message,
        { success: result.success }
      )

      sendResponse(res, response)
    } catch (error) {
      next(error)
    }
  }
}
