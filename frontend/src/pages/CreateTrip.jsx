import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
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
  Camera,
  Luggage,
  Hotel,
  Car,
  Utensils,
  TrendingUp
} from 'lucide-react'
import { tripApi } from '../api/tripApi.js'

const CreateTrip = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [tripData, setTripData] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    travelers: 1,
    tripType: 'leisure',
    accommodation: 'hotel',
    transportation: 'flight',
    activities: []
  })

  // Set minimum date to today for date inputs
  const today = new Date().toISOString().split('T')[0]

  const tripTypes = [
    { id: 'leisure', name: 'Leisure', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { id: 'business', name: 'Business', icon: Plane, color: 'from-blue-500 to-cyan-500' },
    { id: 'adventure', name: 'Adventure', icon: Globe, color: 'from-green-500 to-emerald-500' },
    { id: 'family', name: 'Family', icon: Users, color: 'from-purple-500 to-pink-500' }
  ]

  const popularDestinations = [
    { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=300&h=200&fit=crop' },
    { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop' },
    { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537953764746-f6e532f4dbaf?w=300&h=200&fit=crop' },
    { name: 'New York, USA', image: 'https://images.unsplash.com/photo-1496442226666-8274e0d47c5a?w=300&h=200&fit=crop' }
  ]

  const activities = [
    { id: 'sightseeing', name: 'Sightseeing', icon: Camera },
    { id: 'dining', name: 'Dining', icon: Utensils },
    { id: 'shopping', name: 'Shopping', icon: Heart },
    { id: 'adventure', name: 'Adventure', icon: Globe },
    { id: 'relaxation', name: 'Relaxation', icon: Star },
    { id: 'culture', name: 'Culture', icon: Hotel }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setTripData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleTripTypeSelect = (type) => {
    setTripData(prev => ({
      ...prev,
      tripType: type
    }))
  }

  const handleDestinationSelect = (destination) => {
    setTripData(prev => ({
      ...prev,
      destination
    }))
  }

  const handleActivityToggle = (activityId) => {
    setTripData(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(id => id !== activityId)
        : [...prev.activities, activityId]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      // Validate required fields
      if (!tripData.title || !tripData.destination || !tripData.startDate || !tripData.endDate || !tripData.budget || !tripData.travelers) {
        setError('Please fill in all required fields')
        setIsSubmitting(false)
        return
      }

      // Prepare data for API
      const apiData = {
        title: tripData.title,
        destination: tripData.destination,
        description: tripData.description,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        budget: parseFloat(tripData.budget) || 0,
        tripType: tripData.tripType.toUpperCase(),
        travelers: parseInt(tripData.travelers) || 1
      }

      console.log('Creating trip:', apiData)
      
      // Call API to create trip
      const response = await tripApi.createTrip(apiData)
      
      if (response.data.success) {
        console.log('Trip created successfully:', response.data.data)
        navigate('/dashboard/my-trips')
      } else {
        setError(response.data.message || 'Failed to create trip')
      }
    } catch (err) {
      console.error('Error creating trip:', err)
      console.error('Error details:', JSON.stringify(err, null, 2))
      
      // Handle validation errors specifically
      if (err.errors && Array.isArray(err.errors)) {
        const validationErrors = err.errors.map(e => e.message).join(', ')
        setError(`Validation failed: ${validationErrors}`)
      } else if (err.response?.data) {
        setError(err.response.data.message || 'Failed to create trip. Please try again.')
      } else {
        setError(err.message || 'Failed to create trip. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Dream Trip</h1>
          <p className="text-lg text-gray-600">Plan an unforgettable journey in just a few steps</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep >= step
                      ? 'bg-gradient-to-r from-sky-blue to-cyan text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step}
                </motion.div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-gradient-to-r from-sky-blue to-cyan' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-16 text-sm">
            <span className={currentStep >= 1 ? 'text-sky-blue font-semibold' : 'text-gray-500'}>Basic Info</span>
            <span className={currentStep >= 2 ? 'text-sky-blue font-semibold' : 'text-gray-500'}>Trip Type</span>
            <span className={currentStep >= 3 ? 'text-sky-blue font-semibold' : 'text-gray-500'}>Activities</span>
            <span className={currentStep >= 4 ? 'text-sky-blue font-semibold' : 'text-gray-500'}>Review</span>
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                      Trip Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={tripData.title}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all"
                      placeholder="Summer Adventure 2024"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
                      Destination
                    </label>
                    <input
                      type="text"
                      id="destination"
                      name="destination"
                      value={tripData.destination}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all"
                      placeholder="Paris, France"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={tripData.startDate}
                        onChange={handleChange}
                        min={today}
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-2">
                      End Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={tripData.endDate}
                        onChange={handleChange}
                        min={tripData.startDate || today}
                        required
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                      Budget
                    </label>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="budget"
                        name="budget"
                        value={tripData.budget}
                        onChange={handleChange}
                        required
                        min="0"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all"
                        placeholder="500000"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="travelers" className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Travelers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        id="travelers"
                        name="travelers"
                        value={tripData.travelers}
                        onChange={handleChange}
                        required
                        min="1"
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    Trip Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={tripData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all"
                    placeholder="Describe your dream trip, activities you want to do, and experiences you're looking for..."
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Trip Type */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What type of trip is this?</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tripTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTripTypeSelect(type.id)}
                        className={`relative cursor-pointer rounded-xl p-6 border-2 transition-all ${
                          tripData.tripType === type.id
                            ? 'border-sky-blue bg-gradient-to-br from-sky-blue/10 to-cyan/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${type.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-center text-gray-900">{type.name}</h3>
                        {tripData.tripType === type.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-sky-blue rounded-full flex items-center justify-center">
                            <Star className="w-4 h-4 text-white fill-current" />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Destinations</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {popularDestinations.map((dest, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDestinationSelect(dest.name)}
                        className="relative cursor-pointer rounded-xl overflow-hidden"
                      >
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm font-semibold text-center">{dest.name}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Activities */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What activities interest you?</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activities.map((activity) => {
                    const Icon = activity.icon
                    const isSelected = tripData.activities.includes(activity.id)
                    return (
                      <motion.div
                        key={activity.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleActivityToggle(activity.id)}
                        className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all ${
                          isSelected
                            ? 'border-sky-blue bg-gradient-to-br from-sky-blue/10 to-cyan/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-sky-blue' : 'bg-gray-200'
                          }`}>
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                          </div>
                          <span className={`font-medium ${isSelected ? 'text-sky-blue' : 'text-gray-700'}`}>
                            {activity.name}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 bg-sky-blue rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white fill-current" />
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Trip</h2>
                
                <div className="bg-gradient-to-r from-sky-blue/10 to-cyan/10 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{tripData.title || 'Untitled Trip'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-sky-blue" />
                      <span className="text-gray-700">{tripData.destination || 'No destination'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-sky-blue" />
                      <span className="text-gray-700">{tripData.startDate || 'No start date'} - {tripData.endDate || 'No end date'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-sky-blue" />
                      <span className="text-gray-700">₹{tripData.budget || '0'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-sky-blue" />
                      <span className="text-gray-700">{tripData.travelers || '1'} travelers</span>
                    </div>
                  </div>
                  {tripData.description && (
                    <p className="mt-4 text-gray-700">{tripData.description}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-semibold flex items-center transition-all ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Previous
              </motion.button>

              {currentStep < 4 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold flex items-center hover:shadow-lg transition-all"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 rounded-xl font-semibold flex items-center transition-all ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Trip...
                    </>
                  ) : (
                    <>
                      Create Trip
                      <Plane className="w-4 h-4 ml-2" />
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default CreateTrip