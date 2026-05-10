import express from 'express'
import { sharingController } from '../controllers/sharingController.js'
import { authenticateToken, optionalAuth, requireRole } from '../middleware/auth.js'

const router = express.Router()

// Public route for accessing shared trips
router.get('/shared/:shareCode', optionalAuth, sharingController.getSharedTrip)

// Authenticated routes
router.use(authenticateToken)

// Share management routes
router.post('/trips/:tripId/share', sharingController.createShareLink)
router.get('/user/shared-trips', sharingController.getUserSharedTrips)
router.put('/share/:shareCode', sharingController.updateSharePermissions)
router.delete('/share/:shareCode', sharingController.revokeShareAccess)
router.post('/shared/:shareCode/duplicate', sharingController.duplicateFromSharedTrip)
router.get('/trips/:tripId/share/stats', sharingController.getShareStats)

// Admin only route
router.delete('/admin/cleanup-expired', requireRole(['ADMIN']), sharingController.cleanupExpiredShares)

export default router
