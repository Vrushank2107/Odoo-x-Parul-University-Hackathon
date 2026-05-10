import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  Menu, 
  X, 
  Plane, 
  User, 
  Settings,
  MapPin,
  Calendar,
  Package,
  TrendingUp,
  LogOut,
  Bell,
  Heart,
  Globe
} from 'lucide-react'

const Navbar = ({ variant = 'default' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const location = useLocation()

  // Simulate authentication state
  useEffect(() => {
    // In real app, this would come from auth context
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
    const userData = localStorage.getItem('user')
    if (isAuthenticated && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Public nav items (always visible)
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Plane, visible: true },
    { path: '/shared/:tripId', label: 'Shared Trip', icon: Globe, visible: true },
  ]

  // Authenticated nav items (only when logged in)
  const authNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: MapPin, visible: true },
    { path: '/dashboard/my-trips', label: 'My Trips', icon: Calendar, visible: true },
    { path: '/dashboard/itinerary-builder/sample', label: 'Itinerary Builder', icon: Calendar, visible: true },
    { path: '/dashboard/budget', label: 'Budget', icon: TrendingUp, visible: true },
    { path: '/dashboard/packing/sample', label: 'Packing List', icon: Package, visible: true },
  ]

  // Combine nav items based on auth state
  const navItems = [...publicNavItems, ...(user ? authNavItems : [])]

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${
        variant === 'transparent' 
          ? 'bg-white/80 backdrop-blur-md border-b border-white/20' 
          : 'bg-white shadow-lg border-b border-gray-100'
      } sticky top-0 z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <motion.div
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Plane className="w-8 h-8 text-sky-blue" />
            </motion.div>
            <span className="text-2xl font-bold text-gradient">Traveloop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.filter(item => item.visible !== false).map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-gradient-to-r from-sky-blue/10 to-cyan/10 text-sky-blue font-semibold shadow-sm'
                      : 'text-gray-600 hover:text-sky-blue hover:bg-sky-blue/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              // Authenticated user actions
              <div className="flex items-center space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-blue/10 to-cyan/10 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-sky-blue to-cyan rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-900">{user.firstName}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </div>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 rounded-lg transition-all relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 rounded-lg transition-all"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
                
                <Link
                  to="/dashboard/profile"
                  className="p-2 text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 rounded-lg transition-all"
                >
                  <Settings className="w-5 h-5" />
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    localStorage.removeItem('isAuthenticated')
                    localStorage.removeItem('user')
                    setUser(null)
                    window.location.href = '/'
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm font-medium">Logout</span>
                </motion.button>
              </div>
            ) : (
              // Non-authenticated user actions
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign In</span>
                </Link>
                
                <Link
                  to="/signup"
                  className="flex items-center space-x-2 px-4 py-2 border-2 border-sky-blue text-sky-blue rounded-lg hover:bg-sky-blue/10 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Sign Up</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 transition-all"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.filter(item => item.visible !== false).map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-gradient-to-r from-sky-blue/10 to-cyan/10 text-sky-blue font-semibold'
                        : 'text-gray-600 hover:text-sky-blue hover:bg-sky-blue/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              <div className="border-t border-gray-100 pt-4">
              {user ? (
                // Authenticated mobile menu
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-sky-blue/10 to-cyan/10 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-blue to-cyan rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-900">{user.firstName}</span>
                      <span className="text-xs text-gray-500">{user.email}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-sky-blue hover:bg-sky-blue/5 rounded-lg transition-all"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  
                  <button
                    onClick={() => {
                      localStorage.removeItem('isAuthenticated')
                      localStorage.removeItem('user')
                      setUser(null)
                      setIsMobileMenuOpen(false)
                      window.location.href = '/'
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                // Non-authenticated mobile menu
                <div className="space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign In</span>
                  </Link>
                  
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center space-x-3 px-4 py-3 border-2 border-sky-blue text-sky-blue rounded-lg hover:bg-sky-blue/10 transition-all"
                  >
                    <User className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar