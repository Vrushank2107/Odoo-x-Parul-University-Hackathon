import prisma from '../config/prisma.js'
import { createPaginationOptions, sanitizeSearchQuery } from '../utils/helpers.js'

export const searchService = {
  // Search cities
  async searchCities(query, options = {}) {
    const { page = 1, limit = 20, popular, country } = options
    const { skip, take } = createPaginationOptions(page, limit)
    
    const sanitizedQuery = sanitizeSearchQuery(query)

    const where = {
      AND: []
    }

    if (sanitizedQuery) {
      where.AND.push({
        OR: [
          { name: { contains: sanitizedQuery, mode: 'insensitive' } },
          { country: { contains: sanitizedQuery, mode: 'insensitive' } },
          { description: { contains: sanitizedQuery, mode: 'insensitive' } }
        ]
      })
    }

    if (popular !== undefined) {
      where.AND.push({ popular })
    }

    if (country) {
      where.AND.push({ country: { contains: country, mode: 'insensitive' } })
    }

    // Remove empty AND clause
    if (where.AND.length === 0) {
      delete where.AND
    }

    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        where,
        skip,
        take,
        orderBy: [
          { popular: 'desc' },
          { name: 'asc' }
        ]
      }),
      prisma.city.count({ where })
    ])

    return {
      cities,
      total,
      page,
      limit,
      query: sanitizedQuery
    }
  },

  // Get popular cities
  async getPopularCities(limit = 10) {
    const cities = await prisma.city.findMany({
      where: { popular: true },
      take: limit,
      orderBy: { name: 'asc' }
    })

    return cities
  },

  // Get city by ID
  async getCityById(cityId) {
    const city = await prisma.city.findUnique({
      where: { id: cityId }
    })

    if (!city) {
      throw new Error('City not found')
    }

    return city
  },

  // Search activities within trips
  async searchActivities(userId, query, options = {}) {
    const { page = 1, limit = 20, category, tripId } = options
    const { skip, take } = createPaginationOptions(page, limit)
    
    const sanitizedQuery = sanitizeSearchQuery(query)

    const where = {
      stop: {
        trip: {}
      }
    }

    // If userId is provided, only search in user's trips
    if (userId) {
      where.stop.trip.userId = userId
    }

    // Filter by specific trip
    if (tripId) {
      where.stop.tripId = tripId
    }

    // Filter by category
    if (category) {
      where.category = category
    }

    // Add search query
    if (sanitizedQuery) {
      where.OR = [
        { name: { contains: sanitizedQuery, mode: 'insensitive' } },
        { description: { contains: sanitizedQuery, mode: 'insensitive' } },
        { location: { contains: sanitizedQuery, mode: 'insensitive' } },
        { bookingRef: { contains: sanitizedQuery, mode: 'insensitive' } }
      ]
    }

    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        skip,
        take,
        include: {
          stop: {
            include: {
              trip: {
                select: {
                  id: true,
                  title: true,
                  destination: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.activity.count({ where })
    ])

    return {
      activities,
      total,
      page,
      limit,
      query: sanitizedQuery
    }
  },

  // Get activity suggestions based on trip destination
  async getActivitySuggestions(destination, tripType = 'LEISURE') {
    // This could be enhanced with a more sophisticated recommendation system
    // For now, return activities from similar destinations
    
    const activities = await prisma.activity.findMany({
      where: {
        stop: {
          trip: {
            destination: { contains: destination, mode: 'insensitive' },
            tripType
          }
        }
      },
      include: {
        stop: {
          select: {
            name: true,
            location: true
          }
        }
      },
      take: 20,
      orderBy: { createdAt: 'desc' }
    })

    // Group by category and get unique activities
    const uniqueActivities = activities.reduce((acc, activity) => {
      const key = `${activity.name}-${activity.category}`
      if (!acc[key]) {
        acc[key] = activity
      }
      return acc
    }, {})

    return Object.values(uniqueActivities).slice(0, 10)
  },

  // Get destinations by country
  async getDestinationsByCountry(country, options = {}) {
    const { page = 1, limit = 20 } = options
    const { skip, take } = createPaginationOptions(page, limit)

    const where = {
      country: { contains: country, mode: 'insensitive' }
    }

    const [cities, total] = await Promise.all([
      prisma.city.findMany({
        where,
        skip,
        take,
        orderBy: { popular: 'desc' }
      }),
      prisma.city.count({ where })
    ])

    return {
      cities,
      total,
      page,
      limit,
      country
    }
  },

  // Get all countries with cities
  async getAllCountries() {
    const countries = await prisma.city.groupBy({
      by: ['country'],
      _count: {
        id: true
      },
      orderBy: {
        country: 'asc'
      }
    })

    return countries.map(country => ({
      name: country.country,
      cityCount: country._count.id
    }))
  },

  // Search trips (public and user's own)
  async searchTrips(userId, query, options = {}) {
    const { page = 1, limit = 10, status, tripType, destination } = options
    const { skip, take } = createPaginationOptions(page, limit)
    
    const sanitizedQuery = sanitizeSearchQuery(query)

    const where = {
      OR: [
        { userId }, // User's own trips
        { isPublic: true } // Public trips
      ]
    }

    // Add filters
    if (sanitizedQuery) {
      where.AND = [{
        OR: [
          { title: { contains: sanitizedQuery, mode: 'insensitive' } },
          { destination: { contains: sanitizedQuery, mode: 'insensitive' } },
          { description: { contains: sanitizedQuery, mode: 'insensitive' } }
        ]
      }]
    }

    if (status) {
      where.AND = where.AND || []
      where.AND.push({ status })
    }

    if (tripType) {
      where.AND = where.AND || []
      where.AND.push({ tripType })
    }

    if (destination) {
      where.AND = where.AND || []
      where.AND.push({ destination: { contains: destination, mode: 'insensitive' } })
    }

    const [trips, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          budgets: true,
          _count: {
            stops: true,
            notes: true
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.trip.count({ where })
    ])

    return {
      trips,
      total,
      page,
      limit,
      query: sanitizedQuery
    }
  },

  // Get trending destinations
  async getTrendingDestinations(limit = 10) {
    // Get destinations that appear most in recent trips
    const destinations = await prisma.trip.groupBy({
      by: ['destination'],
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: limit
    })

    // Get city details for these destinations
    const destinationNames = destinations.map(d => d.destination)
    
    const cities = await prisma.city.findMany({
      where: {
        OR: destinationNames.map(name => ({
          name: { contains: name, mode: 'insensitive' }
        }))
      }
    })

    return destinations.map(dest => {
      const city = cities.find(c => 
        dest.destination.toLowerCase().includes(c.name.toLowerCase()) ||
        c.name.toLowerCase().includes(dest.destination.toLowerCase())
      )
      
      return {
        destination: dest.destination,
        tripCount: dest._count.id,
        city: city || null
      }
    })
  }
}
