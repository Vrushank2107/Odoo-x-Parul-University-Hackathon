import React, { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api/authApi'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async () => {
    try {
      console.log('AuthContext - Verifying token...')
      const response = await authApi.getMe()
      console.log('AuthContext - getMe response:', response)
      setUser(response.data.data)
      console.log('AuthContext - User set:', response.data.data)
    } catch (error) {
      console.log('AuthContext - Token verification failed:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      console.log('AuthContext - Attempting login with:', email)
      const response = await authApi.login({ email, password })
      console.log('AuthContext - Login response:', response)
      const { user, accessToken, refreshToken } = response.data.data
      
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      setUser(user)
      console.log('AuthContext - Login successful, user set:', user)
      
      return { success: true, data: response.data }
    } catch (error) {
      console.log('AuthContext - Login failed:', error)
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      }
    }
  }

  const signup = async (userData) => {
    try {
      const response = await authApi.signup(userData)
      const { user, accessToken, refreshToken } = response.data
      
      localStorage.setItem('token', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      setUser(user)
      
      return { success: true, data: response.data }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Signup failed' 
      }
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      // Continue with logout even if API call fails
    }
    
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}