import React from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  Calendar, 
  Plus,
  Package,
  FileText,
  Heart
} from 'lucide-react'

const EmptyState = ({ 
  type = 'default', 
  title, 
  description, 
  actionText, 
  onAction,
  illustration 
}) => {
  const getEmptyStateConfig = (type) => {
    const configs = {
      trips: {
        icon: MapPin,
        title: title || 'No trips yet',
        description: description || 'Start planning your adventure by creating your first trip',
        actionText: actionText || 'Create Trip',
        gradient: 'from-sky-blue to-cyan'
      },
      activities: {
        icon: Search,
        title: title || 'No activities found',
        description: description || 'Try adjusting your search or filters to find activities',
        actionText: actionText || 'Search Again',
        gradient: 'from-purple-500 to-pink-500'
      },
      itinerary: {
        icon: Calendar,
        title: title || 'No itinerary yet',
        description: description || 'Add activities to build your perfect itinerary',
        actionText: actionText || 'Add Activities',
        gradient: 'from-green-500 to-teal-500'
      },
      budget: {
        icon: DollarSign,
        title: title || 'No budget data',
        description: description || 'Start tracking your expenses to see budget insights',
        actionText: actionText || 'Add Expenses',
        gradient: 'from-yellow-500 to-orange-500'
      },
      packing: {
        icon: Package,
        title: title || 'No items packed',
        description: description || 'Create a packing list to prepare for your trip',
        actionText: actionText || 'Add Items',
        gradient: 'from-indigo-500 to-purple-500'
      },
      notes: {
        icon: FileText,
        title: title || 'No notes yet',
        description: description || 'Start documenting your travel memories and plans',
        actionText: actionText || 'Add Note',
        gradient: 'from-pink-500 to-rose-500'
      },
      favorites: {
        icon: Heart,
        title: title || 'No favorites yet',
        description: description || 'Save activities and destinations you love',
        actionText: actionText || 'Explore',
        gradient: 'from-red-500 to-pink-500'
      },
      default: {
        icon: Search,
        title: title || 'Nothing found',
        description: description || 'Try adjusting your search or filters',
        actionText: actionText || 'Try Again',
        gradient: 'from-gray-500 to-gray-600'
      }
    }
    
    return configs[type] || configs.default
  }

  const config = getEmptyStateConfig(type)
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      {/* Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={`w-24 h-24 rounded-full bg-gradient-to-r ${config.gradient} flex items-center justify-center mb-6 shadow-lg`}
      >
        <Icon className="w-12 h-12 text-white" />
      </motion.div>

      {/* Custom Illustration */}
      {illustration && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mb-6"
        >
          {illustration}
        </motion.div>
      )}

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-2xl font-bold text-gray-900 mb-3"
      >
        {config.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="text-gray-600 max-w-md mb-8"
      >
        {config.description}
      </motion.p>

      {/* Action Button */}
      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className={`btn-primary bg-gradient-to-r ${config.gradient}`}
        >
          {config.actionText}
        </motion.button>
      )}
    </motion.div>
  )
}

export default EmptyState
