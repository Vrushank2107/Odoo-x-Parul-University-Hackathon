import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Plane, 
  MapPin, 
  Calendar, 
  Star,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Globe,
  Heart,
  Zap,
  Shield,
  Plus
} from 'lucide-react'
import { tripApi } from '../api/tripApi'

const Dashboard = () => {
  const [stats, setStats] = useState([])
  const [recentTrips, setRecentTrips] = useState([])
  const [upcomingTrips, setUpcomingTrips] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch all data in parallel
      const [statsResponse, recentResponse, upcomingResponse] = await Promise.all([
        tripApi.getTripStats(),
        tripApi.getRecentTrips(3),
        tripApi.getUpcomingTrips(3)
      ])

      // Transform stats data for display
      const statsData = [
        {
          id: 1,
          title: "Total Trips",
          value: statsResponse.data.totalTrips?.toString() || "0",
          change: statsResponse.data.completedTrips ? `+${statsResponse.data.completedTrips} completed` : "No completed trips",
          icon: Plane,
          color: "from-blue-500 to-cyan-500",
          bgColor: "bg-blue-50",
          textColor: "text-blue-600"
        },
        {
          id: 2,
          title: "Total Spent",
          value: `₹${statsResponse.data.totalSpent?.toLocaleString('en-IN') || "0"}`,
          change: statsResponse.data.totalBudget ? `Budget: ₹${statsResponse.data.totalBudget.toLocaleString('en-IN')}` : "No budget set",
          icon: TrendingUp,
          color: "from-green-500 to-emerald-500",
          bgColor: "bg-green-50",
          textColor: "text-green-600"
        },
        {
          id: 3,
          title: "Upcoming Trips",
          value: statsResponse.data.upcomingTrips?.toString() || "0",
          change: statsResponse.data.activeTrips ? `${statsResponse.data.activeTrips} active` : "No active trips",
          icon: Calendar,
          color: "from-yellow-500 to-orange-500",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-600"
        },
        {
          id: 4,
          title: "Avg Rating",
          value: statsResponse.data.avgRating ? statsResponse.data.avgRating.toFixed(1) : "0.0",
          change: "Based on completed trips",
          icon: Star,
          color: "from-purple-500 to-pink-500",
          bgColor: "bg-purple-50",
          textColor: "text-purple-600"
        }
      ]

      setStats(statsData)
      setRecentTrips(recentResponse.data || [])
      setUpcomingTrips(upcomingResponse.data || [])
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Traveler!</h1>
          <p className="text-lg text-gray-600">Here's your travel dashboard overview</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg p-6 card-hover"
              >
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <span className="text-sm text-green-600 font-medium flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-sky-blue to-cyan rounded-2xl p-8 mb-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Ready for your next adventure?</h2>
              <p className="text-white/90">Start planning your dream trip today</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard/create-trip"
                className="bg-white text-sky-blue px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center justify-center"
              >
                Create Trip
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/dashboard/city-search"
                className="border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Explore
                <Globe className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Trips */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Trips</h2>
              <Link
                to="/dashboard/my-trips"
                className="text-sky-blue hover:text-sky-blue/80 font-medium text-sm flex items-center"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {Array.isArray(recentTrips) && recentTrips.length > 0 ? (
                recentTrips.map((trip, index) => (
                <Link key={trip.id} to={`/dashboard/itinerary-view/${trip.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer mb-3"
                  >
                    <img
                      src={trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop'}
                      alt={trip.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{trip.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{trip.destination}</span>
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                        {trip.startDate && trip.endDate 
                          ? `${new Date(trip.startDate).toLocaleDateString()} - ${new Date(trip.endDate).toLocaleDateString()}`
                          : trip.dates || 'Dates not set'}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {trip.rating && (
                        <div className="flex items-center justify-end mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium ml-1">{trip.rating}</span>
                        </div>
                      )}
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{(trip.spent || 0).toLocaleString('en-IN')}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-green-100 bg-green-800 rounded-full mt-1">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {trip.status || 'Completed'}
                      </span>
                    </div>
                  </motion.div>
                </Link>
                ))
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No recent trips found</p>
                  <p className="text-sm text-gray-400 mt-1">Your completed trips will appear here</p>
                  <Link
                    to="/dashboard/create-trip"
                    className="mt-4 inline-flex items-center text-sky-blue hover:text-sky-blue/80 font-medium"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Create your first trip
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Upcoming Trips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Trips</h2>
              <Link
                to="/dashboard/my-trips"
                className="text-sky-blue hover:text-sky-blue/80 font-medium text-sm flex items-center"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {Array.isArray(upcomingTrips) && upcomingTrips.length > 0 ? (
                upcomingTrips.map((trip, index) => (
                <Link key={trip.id} to={`/dashboard/itinerary-view/${trip.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all cursor-pointer mb-3"
                  >
                    <img
                      src={trip.coverImage || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200&h=200&fit=crop'}
                      alt={trip.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{trip.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{trip.destination}</span>
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                        {trip.daysUntil !== undefined 
                          ? `${trip.daysUntil} days left`
                          : trip.startDate 
                            ? `${Math.ceil((new Date(trip.startDate) - new Date()) / (1000 * 60 * 60 * 24))} days left`
                            : 'Upcoming'}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-semibold text-gray-900">
                        ₹{(trip.budget || 0).toLocaleString('en-IN')}
                      </p>
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-100 bg-blue-800 rounded-full mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        {trip.status || 'Planned'}
                      </span>
                    </div>
                  </motion.div>
                </Link>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No upcoming trips found</p>
                  <p className="text-sm text-gray-400 mt-1">Your planned trips will appear here</p>
                  <Link
                    to="/dashboard/create-trip"
                    className="mt-4 inline-flex items-center text-sky-blue hover:text-sky-blue/80 font-medium"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Plan your next trip
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard