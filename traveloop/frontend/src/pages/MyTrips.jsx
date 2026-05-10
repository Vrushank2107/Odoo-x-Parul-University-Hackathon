import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  MapPin, 
  Calendar, 
  Users,
  ArrowRight,
  Plane,
  Globe,
  Heart,
  Star,
  Clock,
  Filter,
  Search,
  Plus,
  Edit,
  Eye,
  TrendingUp,
  CheckCircle
} from 'lucide-react'

const MyTrips = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: 'Paris Adventure 2024',
      destination: 'Paris, France',
      dates: 'March 15-22, 2024',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=250&fit=crop',
      budget: 290500,
      spent: 99600,
      description: 'Romantic getaway to City of Light with visits to Eiffel Tower, Louvre, and charming cafés.',
      rating: 4.8,
      daysLeft: 45,
      travelers: 2
    },
    {
      id: 2,
      title: 'Tokyo Explorer',
      destination: 'Tokyo, Japan',
      dates: 'February 10-18, 2024',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=250&fit=crop',
      budget: 348600,
      spent: 340300,
      description: 'Amazing cultural experience exploring temples, modern districts, and incredible cuisine.',
      rating: 4.9,
      daysLeft: 0,
      travelers: 3
    },
    {
      id: 3,
      title: 'NYC Weekend',
      destination: 'New York, USA',
      dates: 'January 5-7, 2024',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1496442226665-8d4d0e62e6e9?w=400&h=250&fit=crop',
      budget: 124500,
      spent: 120350,
      description: 'Quick weekend trip to see Broadway shows and explore Central Park.',
      rating: 4.6,
      daysLeft: 0,
      travelers: 2
    },
    {
      id: 4,
      title: 'Summer in Greece',
      destination: 'Santorini, Greece',
      dates: 'June 20-30, 2024',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=250&fit=crop',
      budget: 415000,
      spent: 66400,
      description: 'Island hopping through beautiful Greek islands with stunning sunsets and beaches.',
      rating: 4.7,
      daysLeft: 75,
      travelers: 4
    },
    {
      id: 5,
      title: 'London Business Trip',
      destination: 'London, UK',
      dates: 'May 10-15, 2024',
      status: 'upcoming',
      image: 'https://images.unsplash.com/photo-1513635263979-8845079d7d5b?w=400&h=250&fit=crop',
      budget: 249000,
      spent: 0,
      description: 'Business trip with some leisure time to explore historic landmarks.',
      rating: 4.5,
      daysLeft: 30,
      travelers: 1
    }
  ])

  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTrips = trips.filter(trip => {
    const matchesFilter = filter === 'all' || trip.status === filter
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
      case 'cancelled':
        return 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  const getBudgetProgress = (spent, budget) => {
    const percentage = (spent / budget) * 100
    if (percentage > 90) return 'bg-gradient-to-r from-red-500 to-pink-500'
    if (percentage > 70) return 'bg-gradient-to-r from-yellow-500 to-orange-500'
    return 'bg-gradient-to-r from-green-500 to-emerald-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Trips</h1>
            <p className="text-lg text-gray-600">Manage and explore your travel adventures</p>
          </div>
          <Link
            to="/dashboard/create-trip"
            className="bg-gradient-to-r from-sky-blue to-cyan text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Trip
          </Link>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{trips.length}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Trips</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{trips.filter(t => t.status === 'upcoming').length}</span>
            </div>
            <p className="text-gray-600 text-sm">Upcoming</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">{trips.filter(t => t.status === 'completed').length}</span>
            </div>
            <p className="text-gray-600 text-sm">Completed</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">₹{trips.reduce((sum, t) => sum + t.budget, 0).toLocaleString('en-IN')}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Budget</p>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-xl font-semibold flex items-center transition-all ${
                  filter === 'all' 
                    ? 'bg-gradient-to-r from-sky-blue to-cyan text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-4 h-4 mr-2" />
                All Trips
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('upcoming')}
                className={`px-6 py-2 rounded-xl font-semibold flex items-center transition-all ${
                  filter === 'upcoming' 
                    ? 'bg-gradient-to-r from-sky-blue to-cyan text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Clock className="w-4 h-4 mr-2" />
                Upcoming
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter('completed')}
                className={`px-6 py-2 rounded-xl font-semibold flex items-center transition-all ${
                  filter === 'completed' 
                    ? 'bg-gradient-to-r from-sky-blue to-cyan text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Completed
              </motion.button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all w-64"
              />
            </div>
          </div>
        </motion.div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrips.map((trip, index) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
            >
              <div className="relative h-52">
                <img 
                  src={trip.image} 
                  alt={trip.destination}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(trip.status)}`}>
                    {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                  </span>
                </div>

                {/* Like Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                >
                  <Heart className="w-5 h-5 text-white" />
                </motion.button>

                {/* Trip Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">{trip.title}</h3>
                  <div className="flex items-center text-white/90 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    {trip.destination}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{trip.rating}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-1" />
                    {trip.travelers}
                  </div>
                  {trip.status === 'upcoming' && (
                    <div className="flex items-center text-blue-600 text-sm font-medium">
                      <Clock className="w-4 h-4 mr-1" />
                      {trip.daysLeft} days
                    </div>
                  )}
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {trip.dates}
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trip.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">Budget Progress</span>
                    <span className="font-semibold text-gray-900">₹{trip.spent.toLocaleString('en-IN')} / ₹{trip.budget.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className={`h-2 rounded-full ${getBudgetProgress(trip.spent, trip.budget)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((trip.spent / trip.budget) * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link
                    to={`/dashboard/itinerary-view/${trip.id}`}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center text-sm"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Link>
                  <Link
                    to={`/dashboard/itinerary-builder/${trip.id}`}
                    className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center text-sm"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plane className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No trips found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filter === 'all' && !searchQuery 
                ? 'Start by creating your first adventure' 
                : `No trips found matching your criteria`}
            </p>
            {(filter !== 'all' || searchQuery) && (
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => { setFilter('all'); setSearchQuery('') }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center"
                >
                  Clear Filters
                </button>
                <Link
                  to="/dashboard/create-trip"
                  className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Trip
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MyTrips