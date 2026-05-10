import React from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  Circle,
  Calendar,
  ArrowRight
} from 'lucide-react'

const Timeline = ({ 
  items, 
  variant = 'default', 
  showDates = true,
  interactive = false,
  onItemClick 
}) => {
  const timelineVariants = {
    default: "space-y-8",
    compact: "space-y-4",
    minimal: "space-y-2"
  }

  const itemVariants = {
    default: "flex items-start space-x-4",
    compact: "flex items-center space-x-3",
    minimal: "flex items-center space-x-2"
  }

  const getIconSize = () => {
    switch (variant) {
      case 'compact': return 'w-4 h-4'
      case 'minimal': return 'w-3 h-3'
      default: return 'w-5 h-5'
    }
  }

  const getDotSize = () => {
    switch (variant) {
      case 'compact': return 'w-8 h-8'
      case 'minimal': return 'w-6 h-6'
      default: return 'w-10 h-10'
    }
  }

  return (
    <div className={timelineVariants[variant]}>
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className={itemVariants[variant]}
        >
          {/* Timeline Line */}
          {index < items.length - 1 && (
            <div className="absolute left-5 top-10 w-0.5 h-full bg-gray-200 mt-2" />
          )}

          {/* Timeline Dot */}
          <motion.div
            whileHover={interactive ? { scale: 1.1 } : {}}
            onClick={() => interactive && onItemClick?.(item)}
            className={`relative flex-shrink-0 ${getDotSize()} rounded-full flex items-center justify-center ${
              item.completed 
                ? 'bg-gradient-to-r from-sky-blue to-cyan text-white' 
                : 'bg-gray-200 text-gray-500'
            } ${interactive ? 'cursor-pointer' : ''}`}
          >
            {item.completed ? (
              <CheckCircle className={getIconSize()} />
            ) : (
              <Circle className={getIconSize()} />
            )}
          </motion.div>

          {/* Content */}
          <div className={`flex-1 ${interactive ? 'cursor-pointer' : ''}`} 
               onClick={() => interactive && onItemClick?.(item)}>
            <motion.div
              whileHover={interactive ? { x: 5 } : {}}
              className="bg-white rounded-xl p-4 border border-gray-100 card-hover"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  {item.location && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
                
                {showDates && item.time && (
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
              )}

              {/* Date */}
              {showDates && item.date && (
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(item.date).toLocaleDateString()}</span>
                </div>
              )}

              {/* Duration */}
              {item.duration && (
                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-2">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
              )}

              {/* Action */}
              {item.action && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    item.action?.()
                  }}
                  className="mt-3 flex items-center space-x-2 text-sky-blue text-sm font-medium hover:text-sky-blue/80"
                >
                  <span>{item.actionText || 'View Details'}</span>
                  <ArrowRight className="w-3 h-3" />
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Timeline
