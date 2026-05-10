import React from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MapPin,
  Calendar,
  Plane,
  Star
} from 'lucide-react'

const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color = 'sky-blue',
  size = 'default',
  trend = 'up'
}) => {
  const getIconComponent = (iconName) => {
    const icons = {
      trendingUp: TrendingUp,
      trendingDown: TrendingDown,
      users: Users,
      mapPin: MapPin,
      calendar: Calendar,
      plane: Plane,
      star: Star
    }
    return icons[iconName] || TrendingUp
  }

  const Icon = getIconComponent(icon)

  const sizeClasses = {
    small: 'p-4',
    default: 'p-6',
    large: 'p-8'
  }

  const colorClasses = {
    'sky-blue': 'from-sky-blue to-cyan',
    'purple': 'from-purple-500 to-pink-500',
    'green': 'from-green-500 to-teal-500',
    'orange': 'from-orange-500 to-red-500',
    'pink': 'from-pink-500 to-rose-500'
  }

  const bgColorClasses = {
    'sky-blue': 'bg-sky-blue/10',
    'purple': 'bg-purple-500/10',
    'green': 'bg-green-500/10',
    'orange': 'bg-orange-500/10',
    'pink': 'bg-pink-500/10'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className={`bg-white rounded-2xl shadow-lg border border-gray-100 ${sizeClasses[size]} card-hover`}
    >
      <div className="flex items-center justify-between">
        {/* Content */}
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
          
          {change !== undefined && (
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${
                trend === 'up' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {trend === 'up' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                <span>{Math.abs(change)}%</span>
              </div>
              <span className="text-xs text-gray-500">vs last period</span>
            </div>
          )}
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default StatsCard
