import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home,
  MapPin,
  Calendar,
  DollarSign,
  PlusCircle,
  Search,
  Settings,
  User,
  Menu,
  X,
  Plane,
  Package,
  FileText,
  BarChart3
} from 'lucide-react'

const Sidebar = ({ isCollapsed, onToggle }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    {
      group: 'Main',
      items: [
        { path: '/dashboard', label: 'Dashboard', icon: Home },
        { path: '/dashboard/create-trip', label: 'Create Trip', icon: PlusCircle },
        { path: '/dashboard/my-trips', label: 'My Trips', icon: Calendar },
      ]
    },
    {
      group: 'Planning',
      items: [
        { path: '/dashboard/city-search', label: 'Search Cities', icon: Search },
        { path: '/dashboard/activity-search', label: 'Search Activities', icon: MapPin },
        { path: '/dashboard/itinerary-builder', label: 'Itinerary Builder', icon: FileText },
      ]
    },
    {
      group: 'Tools',
      items: [
        { path: '/dashboard/budget', label: 'Budget', icon: DollarSign },
        { path: '/dashboard/packing', label: 'Packing List', icon: Package },
        { path: '/dashboard/notes', label: 'Travel Notes', icon: FileText },
      ]
    },
    {
      group: 'Account',
      items: [
        { path: '/dashboard/profile', label: 'Profile', icon: User },
        { path: '/dashboard/admin', label: 'Admin', icon: BarChart3 },
      ]
    }
  ]

  const isActivePath = (path) => {
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
            <motion.div
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Plane className="w-8 h-8 text-sky-blue" />
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-xl font-bold text-gradient"
                >
                  Traveloop
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          {/* Desktop Toggle */}
          <button
            onClick={onToggle}
            className="hidden lg:flex p-2 rounded-lg text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 transition-all"
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {menuItems.map((group) => (
          <div key={group.group} className="space-y-2">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {group.group}
                </motion.h3>
              )}
            </AnimatePresence>
            
            {group.items.map((item) => {
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
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-sky-blue' : 'text-gray-500'}`} />
                  </motion.div>
                  
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-3"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {isActive && !isCollapsed && (
                    <motion.div
                      layoutId="activeTab"
                      className="ml-auto w-2 h-2 bg-sky-blue rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-100">
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3 p-3 bg-sky-blue/5 rounded-xl"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-sky-blue to-cyan rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Demo User
                </p>
                <p className="text-xs text-gray-500 truncate">
                  demo@traveloop.com
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {isCollapsed && (
          <div className="flex justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-blue to-cyan rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
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
}

export default Sidebar