import api from './axios.js'

export const sharingApi = {
  // Share management
  createShareLink: async (tripId, shareOptions = {}) => {
    return await api.post(`/trips/${tripId}/share`, shareOptions)
  },

  getSharedTrip: async (shareCode) => {
    return await api.get(`/shared/${shareCode}`)
  },

  getUserSharedTrips: async (params = {}) => {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value)
      }
    })
    return await api.get(`/user/shared-trips?${queryParams}`)
  },

  updateSharePermissions: async (shareCode, updateData) => {
    return await api.put(`/share/${shareCode}`, updateData)
  },

  revokeShareAccess: async (shareCode) => {
    return await api.delete(`/share/${shareCode}`)
  },

  duplicateFromSharedTrip: async (shareCode, title) => {
    return await api.post(`/shared/${shareCode}/duplicate`, { title })
  },

  getShareStats: async (tripId) => {
    return await api.get(`/trips/${tripId}/share/stats`)
  }
}
