import api from './axios.js'

export const packingApi = {
  // Checklist management
  createChecklistItem: async (tripId, itemData) => {
    return await api.post(`/packing/trips/${tripId}/checklist`, itemData)
  },

  getChecklist: async (tripId) => {
    return await api.get(`/packing/trips/${tripId}/checklist`)
  },

  updateChecklistItem: async (itemId, updateData) => {
    return await api.put(`/packing/checklist/${itemId}`, updateData)
  },

  deleteChecklistItem: async (itemId) => {
    return await api.delete(`/packing/checklist/${itemId}`)
  },

  toggleItemPacked: async (itemId) => {
    return await api.patch(`/packing/checklist/${itemId}/toggle`)
  },

  bulkUpdateChecklist: async (tripId, updates) => {
    return await api.put(`/packing/trips/${tripId}/checklist/bulk`, { updates })
  },

  // Packing insights
  getPackingStats: async (tripId) => {
    return await api.get(`/packing/trips/${tripId}/checklist/stats`)
  },

  getPackingSuggestions: async (tripId) => {
    return await api.get(`/packing/trips/${tripId}/checklist/suggestions`)
  },

  duplicateChecklist: async (fromTripId, toTripId) => {
    return await api.post(`/packing/trips/${fromTripId}/checklist/duplicate/${toTripId}`)
  }
}
