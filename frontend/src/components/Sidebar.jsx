import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {
  Home,
  MapPin,
  Calendar,
  PlusCircle,
  Search,
  Settings,
  User,
  Menu,
  X,
  Plane,
  Package,
  FileText,
  BarChart3,
  TrendingUp,
  Shield,
  LogOut,
  Bell,
  Globe,
  Car,
  Users,
  Camera,
  Star,
  HelpCircle,
  MessageSquare,
  BookOpen,
  ChevronUp
} from 'lucide-react'

const Sidebar = React.memo(({ isCollapsed, onToggle }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const dropdownRef = useRef(null)

  const userRole = user?.role || 'user'

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

  // Public menu items (always visible)
  const publicMenuItems = [
    {
      group: 'Main',
      items: [
        { path: '/', label: 'Home', icon: Home, visible: true, requiresAuth: false },
        { path: '/shared/:tripId', label: 'Shared Trip', icon: Globe, visible: true, requiresAuth: false },
      ]
    }
  ]

  // Authenticated menu items (only when logged in) - All pages included + more options
  const authMenuItems = [
    {
      group: 'Navigation',
      items: [
        { path: '/', label: 'Home', icon: Home, visible: true, requiresAuth: false },
        { path: '/shared/sample', label: 'Shared Trip', icon: Globe, visible: true, requiresAuth: false },
      ]
    },
    {
      group: 'Main',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: BarChart3, visible: true, requiresAuth: true },
        { path: '/dashboard/create-trip', label: 'Create Trip', icon: PlusCircle, visible: true, requiresAuth: true },
        { path: '/dashboard/my-trips', label: 'My Trips', icon: Calendar, visible: true, requiresAuth: true },
      ]
    },
    {
      group: 'Planning',
      items: [
        { path: '/dashboard/city-search', label: 'Search Cities', icon: Search, visible: true, requiresAuth: true },
        { path: '/dashboard/activity-search', label: 'Search Activities', icon: MapPin, visible: true, requiresAuth: true },
        { path: '/dashboard/itinerary-builder/sample', label: 'Itinerary Builder', icon: FileText, visible: true, requiresAuth: true },
      ]
    },
    {
      group: 'Tools',
      items: [
        { path: '/dashboard/budget/sample', label: 'Budget', icon: TrendingUp, visible: true, requiresAuth: true },
        { path: '/dashboard/packing/sample', label: 'Packing List', icon: Package, visible: true, requiresAuth: true },
        { path: '/dashboard/notes/sample', label: 'Travel Notes', icon: FileText, visible: true, requiresAuth: true },
      ]
    },
    {
      group: 'Account',
      items: [
        { path: '/dashboard/profile', label: 'Profile', icon: User, visible: true, requiresAuth: true },
        { path: '/dashboard/admin', label: 'Admin', icon: Shield, visible: userRole === 'admin', requiresAuth: true, adminOnly: true },
      ]
    }
  ]

  // Combine menu items based on auth state
  const menuItems = user ? authMenuItems : publicMenuItems

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.startsWith(path)
  }

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-r border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="cursor-pointer hover:rotate-12 transition-transform"
              onClick={() => !isCollapsed && onToggle()}
            >
              <Plane className="w-8 h-8 text-sky-blue" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-bold text-gradient">
                Traveloop
              </span>
            )}
          </div>
          
          {/* Desktop Toggle */}
          {!isCollapsed ? (
            <button
              onClick={onToggle}
              className="hidden lg:flex p-2 rounded-lg text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onToggle}
              className="hidden lg:flex p-2 rounded-lg text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 transition-all"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto min-h-0">
        {menuItems.map((group) => {
          // Filter group items based on visibility and auth requirements
          const visibleItems = group.items.filter(item => {
            if (item.visible === false) return false
            if (item.requiresAuth && !user) return false
            if (item.adminOnly && userRole !== 'admin') return false
            return true
          })

          // Only show group if it has visible items
          if (visibleItems.length === 0) return null

          return (
            <div key={group.group} className="space-y-2">
              {!isCollapsed && (
                <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {group.group}
                </h3>
              )}
              
              {visibleItems.map((item) => {
                const Icon = item.icon
                const isActive = isActivePath(item.path)
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-blue/10 to-cyan/10 text-sky-blue font-semibold shadow-sm'
                        : 'text-gray-600 hover:text-sky-blue hover:bg-sky-blue/5'
                    }`}
                  >
                    <div className="hover:scale-110 transition-transform">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-sky-blue' : 'text-gray-500'}`} />
                    </div>

                    {!isCollapsed && (
                      <span className="ml-3">
                        {item.label}
                      </span>
                    )}

                    {isActive && !isCollapsed && (
                      <div className="ml-auto w-2 h-2 bg-sky-blue rounded-full" />
                    )}
                  </Link>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-100 flex-shrink-0">
        {user ? (
          <div ref={dropdownRef} className="relative">
            {!isCollapsed && (
              <div>
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="w-full flex items-center space-x-3 p-3 bg-gradient-to-r from-sky-blue/5 to-cyan/5 rounded-xl hover:from-sky-blue/10 hover:to-cyan/10 transition-all"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-blue to-cyan rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <ChevronUp className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown Menu - Drop Up */}
                  {isProfileDropdownOpen && (
                    <div className="absolute left-0 right-0 bottom-full mb-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                      <div className="py-2">
                        {/* Settings */}
                        <Link
                          to="/dashboard/profile"
                          onClick={() => {
                            setIsProfileDropdownOpen(false)
                            setIsMobileOpen(false)
                          }}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-sky-blue hover:bg-sky-blue/5 transition-all"
                        >
                          <Settings className="w-5 h-5" />
                          <span className="text-sm font-medium">Settings</span>
                        </Link>

                        {/* Logout */}
                        <button
                          onClick={async () => {
                            await logout()
                            setIsProfileDropdownOpen(false)
                            setIsMobileOpen(false)
                            window.location.href = '/'
                          }}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                        >
                          <LogOut className="w-5 h-5" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
            )}

            {isCollapsed && (
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex justify-center w-full hover:scale-105 active:scale-95 transition-transform"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-sky-blue to-cyan rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </button>
            )}

            {/* Collapsed dropdown */}
            {isCollapsed && isProfileDropdownOpen && (
              <div className="absolute left-full bottom-0 ml-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <div className="py-2">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => {
                          setIsProfileDropdownOpen(false)
                          setIsMobileOpen(false)
                        }}
                        className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-sky-blue hover:bg-sky-blue/5 transition-all"
                      >
                        <Settings className="w-5 h-5" />
                        <span className="text-sm font-medium">Settings</span>
                      </Link>
                      <button
                        onClick={async () => {
                          await logout()
                          setIsProfileDropdownOpen(false)
                          setIsMobileOpen(false)
                          window.location.href = '/'
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
                    </div>
              </div>
            )}
          </div>
        ) : (
          // Non-authenticated state
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/login'}
              className="w-full px-4 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <User className="w-5 h-5 mr-2 inline" />
              Sign In to Access More Features
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}>
        {sidebarContent}
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-full w-64 bg-white z-50"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-sky-blue to-cyan rounded-full shadow-lg flex items-center justify-center z-30"
      >
        <Menu className="w-6 h-6 text-white" />
      </button>
    </>
  )
})

export default Sidebar