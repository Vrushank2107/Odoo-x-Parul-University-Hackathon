import api from './axios.js'

export const itineraryApi = {
  // Stop management
  createStop: async (tripId, stopData) => {
    return await api.post(`/itinerary/trips/${tripId}/stops`, stopData)
  },

  getStops: async (tripId) => {
    return await api.get(`/itinerary/trips/${tripId}/stops`)
  },

  updateStop: async (stopId, updateData) => {
    return await api.put(`/itinerary/stops/${stopId}`, updateData)
  },

  deleteStop: async (stopId) => {
    return await api.delete(`/itinerary/stops/${stopId}`)
  },

  reorderStops: async (tripId, stopOrders) => {
    return await api.put(`/itinerary/trips/${tripId}/stops/reorder`, { stopOrders })
  },

  // Activity management
  createActivity: async (stopId, activityData) => {
    return await api.post(`/itinerary/stops/${stopId}/activities`, activityData)
  },

  getActivities: async (stopId) => {
    return await api.get(`/itinerary/stops/${stopId}/activities`)
  },

  updateActivity: async (activityId, updateData) => {
    return await api.put(`/itinerary/activities/${activityId}`, updateData)
  },

  deleteActivity: async (activityId) => {
    return await api.delete(`/itinerary/activities/${activityId}`)
  },

  toggleActivityCompletion: async (activityId) => {
    return await api.patch(`/itinerary/activities/${activityId}/toggle`)
  },

  // Itinerary management
  getItinerary: async (tripId) => {
    return await api.get(`/itinerary/trips/${tripId}/itinerary`)
  },

  getActivitiesByCategory: async (tripId) => {
    return await api.get(`/itinerary/trips/${tripId}/activities/by-category`)
  }
}
