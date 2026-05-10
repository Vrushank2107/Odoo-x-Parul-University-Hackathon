import app from './app.js'
import { config } from './config/env.js'

const PORT = config.port || 5000

const server = app.listen(PORT, () => {
  console.log(`
🚀 Traveloop Backend Server Started Successfully!

Server Information:
- Environment: ${config.nodeEnv}
- Port: ${PORT}
- Local URL: http://localhost:${PORT}
- API Base: http://localhost:${PORT}/api
- Health Check: http://localhost:${PORT}/health

API Endpoints:
- Authentication: /api/auth
- Trips: /api/trips
- Itinerary: /api/itinerary
- Budget: /api/budget
- Packing: /api/packing
- Notes: /api/notes
- Search: /api/search
- Sharing: /api
- Admin: /api/admin

Server is ready to accept requests! 🎯
`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

export default server
