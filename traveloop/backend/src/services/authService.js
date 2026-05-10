import prisma from '../config/prisma.js'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { hashPassword, verifyPassword, generateTokens } from '../utils/helpers.js'
import { emailService } from './emailService.js'

export const authService = {
  // Register new user
  async signup(userData) {
    const { name, email, password } = userData

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true
      }
    })

    // Generate tokens
    const tokens = generateTokens(user.id)

    return {
      user,
      ...tokens
    }
  },

  // Login user
  async login(email, password) {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('Invalid email or password')
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)

    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    // Generate tokens
    const tokens = generateTokens(user.id)

    // Return user without password
    const { password: _, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword,
      ...tokens
    }
  },

  // Get user by ID
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  },

  // Update user profile
  async updateUser(userId, updateData) {
    const { name, avatar } = updateData

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar })
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return user
  },

  // Change password
  async changePassword(userId, currentPassword, newPassword) {
    // Get user with password
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        password: true
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    // Verify current password
    const isCurrentPasswordValid = await verifyPassword(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect')
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword)

    // Update password
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword }
    })

    return { success: true, message: 'Password updated successfully' }
  },

  // Delete user account
  async deleteUser(userId) {
    // This will cascade delete all related records
    await prisma.user.delete({
      where: { id: userId }
    })

    return { success: true, message: 'Account deleted successfully' }
  },

  // Refresh access token
  async refreshToken(refreshToken) {
    try {
      const { config } = await import('../config/env.js')
      const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret)

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true
        }
      })

      if (!user) {
        throw new Error('User not found')
      }

      // Generate new tokens
      const tokens = generateTokens(user.id)

      return {
        user,
        ...tokens
      }
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  },

  // Generate password reset token
  async forgotPassword(email) {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    })

    // Don't reveal if user exists or not for security
    if (!user) {
      return { success: true, message: 'If an account exists, a password reset link has been sent' }
    }

    // Generate random reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set token expiration (1 hour from now)
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000)

    // Save hashed token and expiration to user record
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetTokenHash,
        resetPasswordExpires: resetExpires
      }
    })

    // Send password reset email
    try {
      await emailService.sendPasswordResetEmail(email, resetToken, user.name)
      console.log(`Password reset email sent to ${email}`)
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError)
      // Still return success to prevent email enumeration attacks
      // But log the error for debugging
    }

    return { success: true, message: 'If an account exists, a password reset link has been sent' }
  },

  // Reset password with token
  async resetPassword(token, newPassword) {
    // Hash the token to compare with stored hash
    const resetTokenHash = crypto.createHash('sha256').update(token).digest('hex')

    // Find user with valid reset token
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: resetTokenHash,
        resetPasswordExpires: {
          gt: new Date()
        }
      }
    })

    if (!user) {
      throw new Error('Invalid or expired reset token')
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword)

    // Update password and clear reset token fields
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    })

    return { success: true, message: 'Password reset successfully' }
  }
}
