import express from 'express'
import { authController } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validate, schemas } from '../middleware/validation.js'
import Joi from 'joi'
import passport from '../config/passport.js'
import { config } from '../config/env.js'

const router = express.Router()

schemas.login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

schemas.forgotPassword = Joi.object({
  email: Joi.string().email().required()
})

schemas.resetPassword = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(8).required()
})

// Public routes
router.post('/signup', validate(schemas.signup), authController.signup)
router.post('/login', validate(schemas.login), authController.login)
router.post('/refresh', authController.refreshToken)
router.post('/forgot-password', validate(schemas.forgotPassword), authController.forgotPassword)
router.post('/reset-password', validate(schemas.resetPassword), authController.resetPassword)

// Protected routes
router.get('/me', authenticateToken, authController.getMe)
router.put('/profile', authenticateToken, validate(schemas.partialUpdateProfile), authController.updateProfile)
router.put('/change-password', authenticateToken, authController.changePassword)
router.post('/logout', authenticateToken, authController.logout)
router.delete('/account', authenticateToken, authController.deleteAccount)

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${config.frontendUrl}/login?error=google_auth_failed` }),
  (req, res) => {
    // req.user contains { user, accessToken, refreshToken }
    const { user, accessToken, refreshToken } = req.user

    // Redirect to frontend with tokens in query params
    // Frontend should handle storing tokens and redirecting
    res.redirect(`${config.frontendUrl}/oauth/callback?token=${accessToken}&refreshToken=${refreshToken}&user=${encodeURIComponent(JSON.stringify(user))}`)
  }
)

export default router
