import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Edit, 
  Save, 
  X, 
  Camera,
  Globe,
  Heart,
  Settings,
  Award,
  Clock,
  TrendingUp,
  CheckCircle
} from 'lucide-react'

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    bio: 'Passionate traveler exploring the world one destination at a time. Love discovering hidden gems and sharing experiences with fellow adventurers.',
    preferences: {
      accommodation: 'Hotel',
      transportation: 'Flight',
      budgetRange: 'Medium'
    },
    stats: {
      tripsCompleted: 23,
      countriesVisited: 15,
      totalDistance: 125000,
      memberSince: '2022-03-15'
    }
  })

  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('personal')

  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'preferences', name: 'Travel Preferences', icon: Settings },
    { id: 'stats', name: 'Travel Stats', icon: TrendingUp }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsEditing(false)
    // Handle profile update logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-xl text-gray-600">Manage your personal information and travel preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-sky-blue to-cyan rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg"
              >
                <Camera className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-lg text-gray-600 mb-4">{profile.email}</p>
              <p className="text-gray-700 mb-6">{profile.bio}</p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <span className="px-4 py-2 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Gold Member
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-600 rounded-lg text-sm font-medium flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verified
                </span>
                <span className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Member since {new Date(profile.stats.memberSince).getFullYear()}
                </span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
              >
                {isEditing ? <X className="w-5 h-5 mr-2" /> : <Edit className="w-5 h-5 mr-2" />}
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </motion.button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <Globe className="w-8 h-8 text-sky-blue mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">{profile.stats.countriesVisited}</p>
              <p className="text-sm text-gray-600">Countries Visited</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">{profile.stats.tripsCompleted}</p>
              <p className="text-sm text-gray-600">Trips Completed</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">{profile.stats.totalDistance.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Kilometers Traveled</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
              <Heart className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900 mb-1">4.9</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-2 bg-white rounded-xl shadow p-2 mb-8">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all flex-1 justify-center ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-sky-blue to-cyan text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {activeTab === 'personal' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                />
              </div>

              {isEditing && (
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 flex items-center"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                  </motion.button>
                </div>
              )}
            </form>
          )}

          {activeTab === 'preferences' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Travel Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="preferences.accommodation" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Accommodation
                  </label>
                  <select
                    id="preferences.accommodation"
                    name="preferences.accommodation"
                    value={profile.preferences.accommodation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Airbnb">Airbnb</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Resort">Resort</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="preferences.transportation" className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Transportation
                  </label>
                  <select
                    id="preferences.transportation"
                    name="preferences.transportation"
                    value={profile.preferences.transportation}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="Flight">Flight</option>
                    <option value="Train">Train</option>
                    <option value="Car">Car</option>
                    <option value="Bus">Bus</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="preferences.budgetRange" className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    id="preferences.budgetRange"
                    name="preferences.budgetRange"
                    value={profile.preferences.budgetRange}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue disabled:bg-gray-50 disabled:text-gray-500"
                  >
                    <option value="Budget">Budget</option>
                    <option value="Medium">Medium</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Save Preferences
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Travel Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">Total Trips</span>
                    <span className="text-2xl font-bold text-gray-900">{profile.stats.tripsCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">Countries Visited</span>
                    <span className="text-2xl font-bold text-gray-900">{profile.stats.countriesVisited}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">Distance Traveled</span>
                    <span className="text-2xl font-bold text-gray-900">{profile.stats.totalDistance.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-gray-700">Member Since</span>
                    <span className="text-2xl font-bold text-gray-900">{new Date(profile.stats.memberSince).getFullYear()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Profile