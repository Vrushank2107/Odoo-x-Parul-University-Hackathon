import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const OAuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Parse URL query parameters
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    const refreshToken = params.get('refreshToken')
    const userStr = params.get('user')
    const error = params.get('error')

    if (error) {
      console.error('OAuth error:', error)
      navigate('/login?error=' + encodeURIComponent(error))
      return
    }

    if (token && refreshToken && userStr) {
      try {
        const user = JSON.parse(decodeURIComponent(userStr))

        // Store tokens
        localStorage.setItem('token', token)
        localStorage.setItem('refreshToken', refreshToken)

        // Navigate to home
        navigate('/')
      } catch (err) {
        console.error('Failed to parse user data:', err)
        navigate('/login?error=auth_failed')
      }
    } else {
      navigate('/login?error=auth_failed')
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-blue via-blue-50 to-cyan-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-sky-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  )
}

export default OAuthCallback
