import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
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
  Globe,
  ChevronDown
} from 'lucide-react'

const Navbar = ({ variant = 'default' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const { user, logout, loading } = useAuth()
  const location = useLocation()
  const dropdownRef = useRef(null)

  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Public nav items (always visible) - Essential pages only
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Plane, visible: true },
    { path: '/shared/sample', label: 'Shared Trip', icon: Globe, visible: true },
  ]

  // Combine nav items based on auth state
  const navItems = publicNavItems

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
          ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm' 
          : 'bg-white shadow-lg border-b border-gray-100'
      } sticky top-0 z-50 transition-all duration-300`}
      style={{ display: 'block' }}
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
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-sky-blue/10 to-cyan/10 rounded-lg hover:from-sky-blue/20 hover:to-cyan/20 transition-all"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-sky-blue to-cyan rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <span className="text-sm font-semibold text-gray-900 block">{user.name}</span>
                    <span className="text-xs text-gray-500 block">{user.email}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        {/* Settings */}
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setIsProfileDropdownOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-sky-blue hover:bg-sky-blue/5 transition-all"
                        >
                          <Settings className="w-5 h-5" />
                          <span className="text-sm font-medium">Settings</span>
                        </Link>

                        
                        {/* Logout */}
                        <motion.button
                          whileHover={{ backgroundColor: '#fef2f2' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={async () => {
                            await logout()
                            setIsProfileDropdownOpen(false)
                            window.location.href = '/'
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="text-sm font-medium">Logout</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                      <span className="text-sm font-semibold text-gray-900">{user.name}</span>
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
                    onClick={async () => {
                      await logout()
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