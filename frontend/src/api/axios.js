import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    
    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      // Only attempt refresh if we're not already trying to refresh
      if (!originalRequest.url?.includes('/auth/refresh')) {
        try {
          const refreshToken = localStorage.getItem('refreshToken')
          if (refreshToken) {
            const response = await api.post('/auth/refresh', { refreshToken })
            const { accessToken } = response.data
            
            localStorage.setItem('token', accessToken)
            
            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
            return api(originalRequest)
          }
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          window.location.href = '/login'
          return Promise.reject(refreshError)
        }
      }
    }
    
    // Return standardized error format
    const errorData = error.response?.data || {
      success: false,
      message: error.message || 'Network error'
    }
    
    return Promise.reject(errorData)
  }
)

export default api