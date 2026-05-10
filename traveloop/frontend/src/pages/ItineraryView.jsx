import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Clock,
  Calendar,
  ArrowRight,
  Share2,
  Download,
  Edit,
  Camera,
  Utensils,
  Hotel,
  ShoppingBag,
  Plane,
  Star,
  Heart,
  Users,
  Navigation,
  CheckCircle
} from 'lucide-react'
import { tripApi } from '../api/tripApi'

const ItineraryView = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const [selectedDay, setSelectedDay] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true)
        const response = await tripApi.getTrip(tripId)
        setTrip(response.data)
      } catch (err) {
        console.error('Failed to fetch trip:', err)
        setError('Failed to load trip details')
      } finally {
        setLoading(false)
      }
    }

    if (tripId) {
      fetchTrip()
    }
  }, [tripId])

  const formatTripData = (tripData) => {
    if (!tripData) return null

    // Format stops into days with activities
    const days = tripData.stops?.map((stop, index) => ({
      id: stop.id || index + 1,
      day: index + 1,
      date: new Date(stop.date || tripData.startDate).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      theme: stop.title || `Day ${index + 1}`,
      activities: stop.activities?.map(activity => ({
        time: activity.time || '09:00',
        activity: activity.title || 'Activity',
        location: activity.location || 'Location',
        type: activity.type || 'sightseeing',
        duration: activity.duration || '1 hour',
        notes: activity.description || ''
      })) || []
    })) || []

    return {
      title: tripData.title || 'Untitled Trip',
      destination: tripData.destination || 'Unknown Destination',
      dates: `${new Date(tripData.startDate).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })} - ${new Date(tripData.endDate).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })}`,
      image: tripData.coverImage || 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&h=400&fit=crop',
      rating: tripData.rating || 4.5,
      totalActivities: days.reduce((sum, day) => sum + day.activities.length, 0),
      estimatedBudget: `₹${tripData.budget?.toLocaleString('en-IN') || '0'}`,
      travelers: tripData.travelers || 1,
      days
    }
  }

  const itinerary = formatTripData(trip)

  const getActivityIcon = (type) => {
    switch (type) {
      case 'sightseeing': return Camera
      case 'dining': return Utensils
      case 'accommodation': return Hotel
      case 'shopping': return ShoppingBag
      case 'transport': return Plane
      default: return MapPin
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'sightseeing': return 'from-blue-500 to-cyan-500'
      case 'dining': return 'from-orange-500 to-red-500'
      case 'accommodation': return 'from-purple-500 to-pink-500'
      case 'shopping': return 'from-green-500 to-emerald-500'
      case 'transport': return 'from-indigo-500 to-blue-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-sky-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-sky-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-sky-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-gray-600">Loading trip details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Plane className="w-12 h-12 text-red-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Trip Not Found</h3>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/dashboard/my-trips"
            className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center mx-auto"
          >
            Back to My Trips
          </Link>
        </div>
      </div>
    )
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No Trip Data</h3>
          <Link
            to="/dashboard/my-trips"
            className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center mx-auto"
          >
            Back to My Trips
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={itinerary.image}
          alt={itinerary.destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold text-white mb-4">{itinerary.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {itinerary.destination}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {itinerary.dates}
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {itinerary.travelers} travelers
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-400 fill-current" />
                  {itinerary.rating}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex gap-8">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Activities</p>
                <p className="text-2xl font-bold text-gray-900">{itinerary.totalActivities}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Est. Budget</p>
                <p className="text-2xl font-bold text-gray-900">{itinerary.estimatedBudget}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="text-2xl font-bold text-gray-900">{itinerary.days.length} Days</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-xl flex items-center transition-all ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </motion.button>
              <Link
                to={`/dashboard/itinerary-builder/${tripId}`}
                className="px-4 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Day Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex gap-4 mb-8 overflow-x-auto pb-2"
        >
          {itinerary.days.map((day, index) => (
            <motion.button
              key={day.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDay(day.id)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl font-semibold transition-all ${
                selectedDay === day.id
                  ? 'bg-gradient-to-r from-sky-blue to-cyan text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Day {day.day}
            </motion.button>
          ))}
        </motion.div>

        {/* Current Day Content */}
        {itinerary.days.map((day) => (
          selectedDay === day.id && (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Day Header */}
              <div className="bg-gradient-to-r from-sky-blue to-cyan rounded-2xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Day {day.day}</h2>
                <p className="text-xl text-white/90 mb-1">{day.date}</p>
                <p className="text-lg text-white/80">{day.theme}</p>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-blue to-cyan" />

                {day.activities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="relative flex gap-6 mb-8"
                    >
                      {/* Timeline Dot */}
                      <div className="relative z-10">
                        <div className={`w-16 h-16 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Activity Card */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex-1 bg-white rounded-2xl shadow-lg p-6 card-hover"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-lg font-bold text-sky-blue">{activity.time}</span>
                              {activity.duration && (
                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                  {activity.duration}
                                </span>
                              )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{activity.activity}</h3>
                            <div className="flex items-center text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="font-medium">{activity.location}</span>
                            </div>
                            {activity.notes && (
                              <p className="text-gray-600 bg-gray-50 p-3 rounded-xl">{activity.notes}</p>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-sky-blue hover:bg-sky-blue/10 rounded-xl"
                            >
                              <Navigation className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )
        ))}

        {/* Trip Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Trip Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <Calendar className="w-8 h-8 text-sky-blue mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{itinerary.days.length}</p>
              <p className="text-gray-600">Days</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <Camera className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{itinerary.totalActivities}</p>
              <p className="text-gray-600">Activities</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{itinerary.travelers}</p>
              <p className="text-gray-600">Travelers</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
              <TrendingUp className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{itinerary.estimatedBudget}</p>
              <p className="text-gray-600">Est. Budget</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ItineraryView