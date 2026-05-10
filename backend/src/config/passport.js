import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { config } from './env.js'
import prisma from './prisma.js'
import { generateTokens } from '../utils/helpers.js'

// Google OAuth Strategy (only if configured)
if (config.googleClientId && config.googleClientSecret) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: '/api/auth/google/callback',
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value
          const name = profile.displayName || profile.name?.givenName || 'Google User'
          const avatar = profile.photos?.[0]?.value
          const googleId = profile.id

          if (!email) {
            return done(new Error('No email found in Google profile'), null)
          }

          // Check if user exists with this email
          let user = await prisma.user.findUnique({
            where: { email }
          })

          if (user) {
            // User exists, generate tokens
            const tokens = generateTokens(user.id)
            return done(null, { user, ...tokens })
          }

          // Create new user
          user = await prisma.user.create({
            data: {
              name,
              email,
              password: '', // OAuth users don't need password
              avatar,
              role: 'USER'
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

          const tokens = generateTokens(user.id)
          return done(null, { user, ...tokens })
        } catch (error) {
          return done(error, null)
        }
      }
    )
  )
}

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

export default passport
