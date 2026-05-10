import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { 
  Share2, 
  Copy, 
  Mail, 
  Users, 
  Calendar, 
  MapPin, 
  Clock, 
  Star,
  Heart,
  Eye,
  Edit,
  Lock,
  Unlock,
  CheckCircle,
  X,
  Download,
  Globe,
  Camera,
  Utensils,
  Hotel,
  Plane,
  ChevronRight,
  Plus
} from 'lucide-react'

const SharedTrip = () => {
  const { tripId } = useParams()
  const [copied, setCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)
  const [liked, setLiked] = useState(false)

  const tripData = {
    title: 'Paris Adventure 2024',
    destination: 'Paris, France',
    dates: 'March 15-22, 2024',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&h=600&fit=crop',
    description: 'Experience the magic of Paris with our carefully curated 7-day adventure. From the Eiffel Tower to the Louvre, from charming cafés to world-class museums.',
    highlights: ['Eiffel Tower Summit', 'Louvre Museum', 'Seine River Cruise', 'Versailles Day Trip'],
    rating: 4.9,
    reviews: 247,
    views: 1234,
    isPublic: true,
    allowEdit: true,
    allowComment: true
  }

  const itinerary = [
    {
      day: 1,
      date: 'March 15, 2024',
      theme: 'Arrival & Exploration',
      activities: [
        { time: '09:00', activity: 'Arrival at Charles de Gaulle Airport', location: 'CDG Airport' },
        { time: '11:00', activity: 'Check-in at Hotel Le Marais', location: 'Hotel Le Marais' },
        { time: '13:00', activity: 'Lunch at Café de Flore', location: 'Saint-Germain-des-Prés' },
        { time: '15:00', activity: 'Visit Louvre Museum', location: 'Louvre Museum' },
        { time: '19:00', activity: 'Dinner Cruise on Seine River', location: 'Seine River' }
      ]
    },
    {
      day: 2,
      date: 'March 16, 2024',
      theme: 'Iconic Paris',
      activities: [
        { time: '09:30', activity: 'Eiffel Tower Visit', location: 'Champ de Mars' },
        { time: '12:30', activity: 'Lunch at Champ de Mars', location: 'Eiffel Tower Area' },
        { time: '14:00', activity: 'Arc de Triomphe', location: 'Charles de Gaulle Square' },
        { time: '16:30', activity: 'Shopping on Champs-Élysées', location: 'Champs-Élysées' },
        { time: '19:30', activity: 'Dinner in Montmartre', location: 'Montmartre' }
      ]
    }
  ]

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareTrip = () => {
    if (navigator.share) {
      navigator.share({
        title: tripData.title,
        text: `Check out my trip to ${tripData.destination}: ${tripData.description}`,
        url: window.location.href
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={tripData.image}
          alt={tripData.destination}
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
              <h1 className="text-5xl font-bold text-white mb-4">{tripData.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {tripData.destination}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {tripData.dates}
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-400 fill-current" />
                  {tripData.rating}
                </div>
                <div className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  {tripData.views} views
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
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-xl flex items-center transition-all ${
                  liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyLink}
                className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 flex items-center"
              >
                <Copy className="w-5 h-5 mr-2" />
                {copied ? 'Copied!' : 'Copy Link'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={shareTrip}
                className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 flex items-center"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share
              </motion.button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowShareModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Itinerary
            </motion.button>
          </div>
        </motion.div>

        {/* Trip Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Trip</h2>
          <p className="text-gray-700 text-lg mb-6">{tripData.description}</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            {tripData.highlights.map((highlight, index) => (
              <span key={index} className="px-4 py-2 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium">
                {highlight}
              </span>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Star className="w-6 h-6 text-yellow-400 fill-current mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">{tripData.rating}</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Users className="w-6 h-6 text-sky-blue mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">{tripData.reviews}</p>
              <p className="text-sm text-gray-600">Reviews</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <Eye className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">{tripData.views}</p>
              <p className="text-sm text-gray-600">Views</p>
            </div>
          </div>
        </motion.div>

        {/* Itinerary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-gray-900">Itinerary</h2>
          
          {itinerary.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-sky-blue to-cyan p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Day {day.day}</h3>
                <p className="text-white/90 mb-1">{day.date}</p>
                <p className="text-xl font-semibold">{day.theme}</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {day.activities.map((activity, actIndex) => (
                    <motion.div
                      key={actIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + actIndex * 0.05 }}
                      className="flex gap-6"
                    >
                      <div className="flex-shrink-0 w-20 text-center">
                        <span className="text-lg font-bold text-sky-blue">{activity.time}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{activity.activity}</h4>
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {activity.location}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-sky-blue to-cyan rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Plan Your Own Adventure?</h2>
          <p className="text-white/90 text-lg mb-6">Create amazing itineraries and share them with friends and family</p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-sky-blue rounded-xl font-semibold hover:shadow-lg flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your Trip
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 flex items-center border border-white/30"
            >
              <Globe className="w-5 h-5 mr-2" />
              Explore More Trips
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowShareModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Share Trip</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowShareModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Share via Email</label>
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send
                  </motion.button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Share Link</label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={window.location.href}
                    readOnly
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl bg-gray-50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyLink}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default SharedTrip