import api from './axios.js'

export const authApi = {
  // Register new user
  signup: async (userData) => {
    return await api.post('/auth/signup', userData)
  },

  // Login user
  login: async (credentials) => {
    return await api.post('/auth/login', credentials)
  },

  // Get current user profile
  getMe: async () => {
    return await api.get('/auth/me')
  },

  // Update user profile
  updateProfile: async (profileData) => {
    return await api.put('/auth/profile', profileData)
  },

  // Change password
  changePassword: async (passwordData) => {
    return await api.put('/auth/change-password', passwordData)
  },

  // Refresh access token
  refreshToken: async (refreshToken) => {
    return await api.post('/auth/refresh', { refreshToken })
  },

  // Logout
  logout: async () => {
    return await api.post('/auth/logout')
  },

  // Delete account
  deleteAccount: async () => {
    return await api.delete('/auth/account')
  }
}
