import React, { useState } from 'react'
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
  DollarSign
} from 'lucide-react'

const Navbar = ({ variant = 'default' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: Plane },
    { path: '/dashboard', label: 'Dashboard', icon: MapPin },
    { path: '/dashboard/my-trips', label: 'My Trips', icon: Calendar },
    { path: '/dashboard/budget', label: 'Budget', icon: DollarSign },
  ]

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
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-sky-blue/10 text-sky-blue font-semibold'
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
            <div className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-4 py-2 bg-sky-blue/10 rounded-lg"
              >
                <User className="w-4 h-4 text-sky-blue" />
                <span className="text-sm font-medium text-sky-blue">
                  Demo User
                </span>
              </motion.div>
              
              <Link
                to="/dashboard/profile"
                className="p-2 text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 rounded-lg transition-all"
              >
                <Settings className="w-5 h-5" />
              </Link>
              
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-sky-blue/10 text-sky-blue rounded-lg hover:bg-sky-blue/20 transition-all"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
            </div>
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
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-sky-blue/10 text-sky-blue font-semibold'
                        : 'text-gray-600 hover:text-sky-blue hover:bg-sky-blue/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              <div className="border-t border-gray-100 pt-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 px-4 py-3 bg-sky-blue/10 rounded-lg">
                  <User className="w-5 h-5 text-sky-blue" />
                  <span className="text-sm font-medium text-sky-blue">
                    Demo User
                  </span>
                </div>
                
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-sky-blue hover:bg-sky-blue/5 rounded-lg transition-all"
                >
                  <Settings className="w-5 h-5" />
                  <span>Profile</span>
                </Link>
                
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-sky-blue/10 text-sky-blue rounded-lg hover:bg-sky-blue/20 transition-all"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              </div>
            </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar