import api from './axios.js'

export const notesApi = {
  // Note management
  createNote: async (tripId, noteData) => {
    return await api.post(`/notes/trips/${tripId}/notes`, noteData)
  },

  getTripNotes: async (tripId) => {
    return await api.get(`/notes/trips/${tripId}/notes`)
  },

  getNote: async (noteId) => {
    return await api.get(`/notes/notes/${noteId}`)
  },

  updateNote: async (noteId, updateData) => {
    return await api.put(`/notes/notes/${noteId}`, updateData)
  },

  deleteNote: async (noteId) => {
    return await api.delete(`/notes/notes/${noteId}`)
  },

  // Search and filtering
  searchTripNotes: async (tripId, query) => {
    return await api.get(`/notes/trips/${tripId}/notes/search?q=${encodeURIComponent(query)}`)
  },

  getUserNotes: async (params = {}) => {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value)
      }
    })
    return await api.get(`/notes/user/notes?${queryParams}`)
  },

  toggleNoteVisibility: async (noteId) => {
    return await api.patch(`/notes/notes/${noteId}/toggle-visibility`)
  },

  getTripNoteStats: async (tripId) => {
    return await api.get(`/notes/trips/${tripId}/notes/stats`)
  }
}
