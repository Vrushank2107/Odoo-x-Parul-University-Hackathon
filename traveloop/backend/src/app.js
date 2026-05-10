import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { config } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

// Route imports
import authRoutes from './routes/auth.js'
import tripRoutes from './routes/trips.js'
import itineraryRoutes from './routes/itinerary.js'
import budgetRoutes from './routes/budget.js'
import packingRoutes from './routes/packing.js'
import notesRoutes from './routes/notes.js'
import searchRoutes from './routes/search.js'
import sharingRoutes from './routes/sharing.js'
import adminRoutes from './routes/admin.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))

// CORS configuration
app.use(cors({
  origin: [
    config.frontendUrl,
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:50702',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Rate limiting disabled for development
// const limiter = rateLimit({
//   windowMs: config.rateLimitWindowMs,
//   max: config.rateLimitMaxRequests,
//   message: {
//     success: false,
//     message: 'Too many requests from this IP, please try again later.'
//   },
//   standardHeaders: true,
//   legacyHeaders: false
// })

// app.use('/api/', limiter)

// General middleware
app.use(compression())
app.use(morgan('combined'))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/itinerary', itineraryRoutes)
app.use('/api/budget', budgetRoutes)
app.use('/api/packing', packingRoutes)
app.use('/api/notes', notesRoutes)
app.use('/api/search', searchRoutes)
app.use('/api', sharingRoutes)
app.use('/api/admin', adminRoutes)

// API documentation endpoint
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Traveloop API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      trips: '/api/trips',
      itinerary: '/api/itinerary',
      budget: '/api/budget',
      packing: '/api/packing',
      notes: '/api/notes',
      search: '/api/search',
      sharing: '/api',
      admin: '/api/admin'
    },
    health: '/health'
  })
})

// 404 handler for undefined routes
app.use(notFound)

// Global error handler
app.use(errorHandler)

export default app
