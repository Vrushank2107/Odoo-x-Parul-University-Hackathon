import api from './axios.js'

export const tripApi = {
  // Create new trip
  createTrip: async (tripData) => {
    return await api.post('/trips', tripData)
  },

  // Get all user trips
  getTrips: async (params = {}) => {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value)
      }
    })
    return await api.get(`/trips?${queryParams}`)
  },

  // Get trip by ID
  getTrip: async (tripId) => {
    return await api.get(`/trips/${tripId}`)
  },

  // Update trip
  updateTrip: async (tripId, updateData) => {
    return await api.put(`/trips/${tripId}`, updateData)
  },

  // Delete trip
  deleteTrip: async (tripId) => {
    return await api.delete(`/trips/${tripId}`)
  },

  // Get trip statistics
  getTripStats: async () => {
    return await api.get('/trips/stats')
  },

  // Get upcoming trips
  getUpcomingTrips: async (limit = 5) => {
    return await api.get(`/trips/upcoming?limit=${limit}`)
  },

  // Get recent trips
  getRecentTrips: async (limit = 5) => {
    return await api.get(`/trips/recent?limit=${limit}`)
  },

  // Search trips
  searchTrips: async (query, params = {}) => {
    const queryParams = new URLSearchParams({ q: query, ...params })
    return await api.get(`/trips/search?${queryParams}`)
  },

  // Duplicate trip
  duplicateTrip: async (tripId, title) => {
    return await api.post(`/trips/${tripId}/duplicate`, { title })
  }
}
