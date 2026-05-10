import express from 'express'
import { adminController } from '../controllers/adminController.js'
import { authenticateToken, requireRole } from '../middleware/auth.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(authenticateToken)
router.use(requireRole(['ADMIN']))

// Dashboard routes
router.get('/dashboard/stats', adminController.getDashboardStats)
router.get('/system/health', adminController.getSystemHealth)
router.get('/system/database', adminController.getDatabaseStats)

// User management routes
router.get('/users', adminController.getUsers)
router.get('/users/:id', adminController.getUser)
router.put('/users/:id/role', adminController.updateUserRole)
router.delete('/users/:id', adminController.deleteUser)

// Trip management routes
router.get('/trips', adminController.getTrips)

// Activity logs
router.get('/logs', adminController.getActivityLogs)

export default router
