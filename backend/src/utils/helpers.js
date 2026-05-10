import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config } from '../config/env.js'

// Password hashing
export const hashPassword = async (password) => {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Password verification
export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

// JWT token generation
export const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { userId },
    config.jwtSecret,
    { expiresIn: '15m' }
  )

  const refreshToken = jwt.sign(
    { userId },
    config.jwtRefreshSecret,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

// Verify refresh token
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwtRefreshSecret)
}

// Generate random share code
export const generateShareCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

// Calculate trip statistics
export const calculateTripStats = (trips) => {
  const totalTrips = trips.length
  const completedTrips = trips.filter(trip => trip.status === 'COMPLETED').length
  const upcomingTrips = trips.filter(trip => trip.status === 'PLANNED').length
  const activeTrips = trips.filter(trip => trip.status === 'ACTIVE').length
  
  const totalBudget = trips.reduce((sum, trip) => sum + (trip.budget || 0), 0)
  const totalSpent = trips.reduce((sum, trip) => sum + (trip.spent || 0), 0)
  
  const avgRating = trips
    .filter(trip => trip.rating)
    .reduce((sum, trip, _, arr) => sum + trip.rating / arr.length, 0)

  return {
    totalTrips,
    completedTrips,
    upcomingTrips,
    activeTrips,
    totalBudget,
    totalSpent,
    avgRating: avgRating || 0
  }
}

// Calculate budget statistics
export const calculateBudgetStats = (budgets) => {
  const totalAllocated = budgets.reduce((sum, budget) => sum + budget.allocated, 0)
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0)
  const remaining = totalAllocated - totalSpent
  const spentPercentage = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0

  return {
    totalAllocated,
    totalSpent,
    remaining,
    spentPercentage,
    isOverBudget: totalSpent > totalAllocated
  }
}

// Format date for API responses
export const formatDate = (date) => {
  return new Date(date).toISOString()
}

// Calculate days until trip
export const calculateDaysUntil = (startDate) => {
  const now = new Date()
  const start = new Date(startDate)
  const diffTime = start - now
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Calculate trip duration in days
export const calculateTripDuration = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  return diffDays
}

// Validate date range
export const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const now = new Date()

  if (start > end) {
    return { valid: false, message: 'Start date must be before end date' }
  }

  if (start < now) {
    return { valid: false, message: 'Start date cannot be in the past' }
  }

  return { valid: true }
}

// Sanitize search query
export const sanitizeSearchQuery = (query) => {
  return query.trim().replace(/[<>]/g, '')
}

// Create pagination options
export const createPaginationOptions = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit
  return {
    skip,
    take: limit,
    page: parseInt(page),
    limit: parseInt(limit)
  }
}

// Format trip for API response
export const formatTrip = (trip) => {
  return {
    ...trip,
    daysUntil: calculateDaysUntil(trip.startDate),
    duration: calculateTripDuration(trip.startDate, trip.endDate),
    budgetStats: trip.budgets ? calculateBudgetStats(trip.budgets) : null
  }
}

// Error logging helper
export const logError = (error, context = {}) => {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString()
  })
}
