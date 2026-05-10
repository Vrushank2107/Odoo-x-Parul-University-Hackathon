import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign,
  Star,
  Heart,
  Share2,
  MoreVertical
} from 'lucide-react'

const TripCard = ({ trip, variant = 'default', onLike, onShare, onEdit, onDelete }) => {
  const {
    id,
    title,
    destination,
    startDate,
    endDate,
    budget,
    participants,
    image,
    rating,
    isLiked,
    description
  } = trip

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getDaysCount = () => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const cardVariants = {
    default: "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden card-hover",
    compact: "bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden card-hover",
    featured: "bg-gradient-to-br from-sky-blue/5 to-cyan/5 rounded-2xl shadow-xl border border-sky-blue/20 overflow-hidden card-hover"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className={cardVariants[variant]}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image || `https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=400&h=300&fit=crop`}
          alt={destination}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top Actions */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onLike?.(id)}
            className={`p-2 rounded-full backdrop-blur-md ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-white'
            } transition-all`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onShare?.(id)}
            className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-white backdrop-blur-md transition-all"
          >
            <Share2 className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Destination Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4 text-sky-blue" />
            <span className="text-sm font-semibold text-gray-900">{destination}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          
          {rating && (
            <div className="flex items-center space-x-1 ml-4">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-900">{rating}</span>
            </div>
          )}
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="text-sm font-semibold text-gray-900">{getDaysCount()} days</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-400" />
            <div>
              <p className="text-xs text-gray-500">Travelers</p>
              <p className="text-sm font-semibold text-gray-900">{participants || 1}</p>
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
        </div>

        {/* Budget */}
        {budget && (
          <div className="flex items-center justify-between mb-4 p-3 bg-sky-blue/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-sky-blue" />
              <span className="text-sm font-semibold text-sky-blue">Budget</span>
            </div>
            <span className="text-lg font-bold text-sky-blue">${budget}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            to={`/dashboard/itinerary-view/${id}`}
            className="flex-1 btn-primary text-center py-2"
          >
            View Details
          </Link>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit?.(id)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
          >
            Edit
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default TripCard