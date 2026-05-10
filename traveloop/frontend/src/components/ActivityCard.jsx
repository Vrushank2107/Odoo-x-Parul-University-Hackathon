import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Star,
  Heart,
  Calendar,
  Users,
  Info
} from 'lucide-react'

const ActivityCard = ({ activity, variant = 'default', onSelect, onLike }) => {
  const [isLiked, setIsLiked] = useState(activity.isLiked || false)

  const {
    id,
    title,
    location,
    duration,
    price,
    rating,
    reviews,
    image,
    category,
    description,
    maxParticipants,
    availability
  } = activity

  const handleLike = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    onLike?.(id, !isLiked)
  }

  const handleSelect = () => {
    onSelect?.(activity)
  }

  const cardVariants = {
    default: "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden card-hover",
    compact: "bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden card-hover",
    featured: "bg-gradient-to-br from-sky-blue/5 to-cyan/5 rounded-2xl shadow-xl border border-sky-blue/20 overflow-hidden card-hover"
  }

  const formatDuration = (mins) => {
    if (mins < 60) return `${mins} min`
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onClick={handleSelect}
      className={`${cardVariants[variant]} cursor-pointer group`}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || `https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {category && (
            <div className="px-3 py-1 bg-sky-blue text-white text-xs font-semibold rounded-full backdrop-blur-md">
              {category}
            </div>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-md ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            } transition-all`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>
        
        {/* Location Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4 text-sky-blue" />
            <span className="text-sm font-semibold text-gray-900 truncate max-w-[150px]">
              {location}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-sky-blue transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          
          {rating && (
            <div className="flex items-center space-x-1 ml-4">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-900">{rating}</span>
              {reviews && (
                <span className="text-xs text-gray-500">({reviews})</span>
              )}
            </div>
          )}
        </div>

        {/* Activity Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-sm font-semibold text-gray-900">{formatDuration(duration || 60)}</p>
            </div>
          </div>
          
          {maxParticipants && (
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Group Size</p>
                <p className="text-sm font-semibold text-gray-900">{maxParticipants} max</p>
              </div>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-sky-blue" />
            <span className="text-lg font-bold text-sky-blue">${price || 0}</span>
            <span className="text-sm text-gray-500">per person</span>
          </div>
          
          {availability && (
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              availability === 'available' 
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              {availability === 'available' ? 'Available' : 'Limited'}
            </div>
          )}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Add to Itinerary</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ActivityCard