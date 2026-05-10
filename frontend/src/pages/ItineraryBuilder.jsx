import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Clock, 
  Plus,
  Calendar,
  ArrowRight,
  Search,
  Camera,
  Utensils,
  Hotel,
  ShoppingBag,
  Plane,
  Star,
  Trash2,
  Edit,
  Save,
  GripVertical,
  X,
  Check,
  Loader2
} from 'lucide-react'
import { tripApi } from '../api/tripApi'
import { itineraryApi } from '../api/itineraryApi'

const ItineraryBuilder = () => {
  const { tripId } = useParams()
  const navigate = useNavigate()
  
  const [trip, setTrip] = useState(null)
  const [itinerary, setItinerary] = useState({
    title: '',
    destination: '',
    dates: '',
    days: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const fallbackTrip = {
    id: 1,
    title: 'Paris Adventure 2024',
    destination: 'Paris, France',
    description: 'Experience the magic of Paris with our carefully curated 7-day adventure.',
    startDate: '2024-03-15',
    endDate: '2024-03-22',
    budget: 200000,
    travelers: 2,
    tripType: 'cultural',
    status: 'PLANNED'
  }

  const fallbackItinerary = {
    title: 'Paris Adventure 2024',
    destination: 'Paris, France',
    dates: 'March 15, 2024 - March 22, 2024',
    days: [
      {
        id: 1,
        date: 'March 15, 2024',
        activities: [
          {
            id: 1,
            time: '09:00',
            activity: 'Arrival at Charles de Gaulle Airport',
            location: 'CDG Airport',
            type: 'transport',
            duration: '2 hours',
            notes: 'Flight from Mumbai, Terminal 2E'
          },
          {
            id: 2,
            time: '11:00',
            activity: 'Check-in at Hotel Le Marais',
            location: 'Hotel Le Marais',
            type: 'accommodation',
            duration: '1 hour',
            notes: '4th Arrondissement, near Metro'
          },
          {
            id: 3,
            time: '13:00',
            activity: 'Lunch at Café de Flore',
            location: 'Saint-Germain-des-Prés',
            type: 'dining',
            duration: '2 hours',
            notes: 'Classic French café, famous for its history'
          },
          {
            id: 4,
            time: '15:00',
            activity: 'Visit Louvre Museum',
            location: 'Louvre Museum',
            type: 'sightseeing',
            duration: '3 hours',
            notes: 'Must see: Mona Lisa, Venus de Milo'
          },
          {
            id: 5,
            time: '19:00',
            activity: 'Dinner Cruise on Seine River',
            location: 'Seine River',
            type: 'dining',
            duration: '3 hours',
            notes: 'Bateaux Mouches cruise with French cuisine'
          }
        ]
      },
      {
        id: 2,
        date: 'March 16, 2024',
        activities: [
          {
            id: 6,
            time: '09:30',
            activity: 'Eiffel Tower Visit',
            location: 'Champ de Mars',
            type: 'sightseeing',
            duration: '2 hours',
            notes: 'Skip-the-line tickets, summit access'
          },
          {
            id: 7,
            time: '12:30',
            activity: 'Lunch at Champ de Mars',
            location: 'Eiffel Tower Area',
            type: 'dining',
            duration: '1.5 hours',
            notes: 'Picnic style with tower views'
          },
          {
            id: 8,
            time: '14:00',
            activity: 'Arc de Triomphe',
            location: 'Charles de Gaulle Square',
            type: 'sightseeing',
            duration: '1.5 hours',
            notes: 'Climb to top for panoramic views'
          },
          {
            id: 9,
            time: '16:30',
            activity: 'Shopping on Champs-Élysées',
            location: 'Champs-Élysées',
            type: 'shopping',
            duration: '2.5 hours',
            notes: 'Luxury brands and souvenir shopping'
          },
          {
            id: 10,
            time: '19:30',
            activity: 'Dinner in Montmartre',
            location: 'Montmartre',
            type: 'dining',
            duration: '2 hours',
            notes: 'Traditional French bistro'
          }
        ]
      },
      {
        id: 3,
        date: 'March 17, 2024',
        activities: [
          {
            id: 11,
            time: '10:00',
            activity: 'Musée d\'Orsay',
            location: 'Left Bank',
            type: 'sightseeing',
            duration: '3 hours',
            notes: 'Impressionist art collection'
          },
          {
            id: 12,
            time: '13:30',
            activity: 'Lunch at Latin Quarter',
            location: 'Latin Quarter',
            type: 'dining',
            duration: '1.5 hours',
            notes: 'Student area with affordable restaurants'
          },
          {
            id: 13,
            time: '15:00',
            activity: 'Notre-Dame Cathedral',
            location: 'Île de la Cité',
            type: 'sightseeing',
            duration: '1.5 hours',
            notes: 'Gothic architecture masterpiece'
          },
          {
            id: 14,
            time: '17:00',
            activity: 'Sainte-Chapelle',
            location: 'Île de la Cité',
            type: 'sightseeing',
            duration: '1 hour',
            notes: 'Stained glass windows'
          }
        ]
      }
    ]
  }

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true)
        
        // Handle sample tripId by using fallback data
        let actualTripId = tripId
        let useFallback = false
        
        if (tripId === 'sample') {
          // Try to get user's trips first
          try {
            const tripsResponse = await tripApi.getTrips({ limit: 1 })
            if (tripsResponse.data?.length > 0) {
              actualTripId = tripsResponse.data[0].id
              // Update URL to use actual trip ID
              navigate(`/dashboard/itinerary-builder/${actualTripId}`, { replace: true })
              return
            } else {
              useFallback = true
            }
          } catch (apiError) {
            useFallback = true
          }
        }
        
        if (useFallback) {
          // Use fallback data
          setTrip(fallbackTrip)
          setItinerary(fallbackItinerary)
          setLoading(false)
          return
        }
        
        // Get trip details
        const tripResponse = await tripApi.getTrip(actualTripId)
        const tripData = tripResponse.data
        setTrip(tripData)
        
        // Get itinerary data
        const itineraryResponse = await itineraryApi.getItinerary(actualTripId)
        const itineraryData = itineraryResponse.data
        
        // Format trip data for the builder
        const formattedItinerary = {
          title: tripData.title || '',
          destination: tripData.destination || '',
          dates: `${new Date(tripData.startDate).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })} - ${new Date(tripData.endDate).toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
          })}`,
          days: itineraryData.itinerary?.map((stop, index) => ({
            id: stop.id || index + 1,
            date: new Date(stop.date || tripData.startDate).toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            }),
            activities: stop.activities?.map(activity => ({
              id: activity.id || Date.now() + Math.random(),
              time: activity.time ? new Date(activity.time).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              }) : '09:00',
              activity: activity.name || 'Activity',
              location: activity.location || 'Location',
              type: activity.category?.toLowerCase() || 'sightseeing',
              duration: activity.duration ? `${activity.duration} minutes` : '1 hour',
              notes: activity.description || ''
            })) || []
          })) || []
        }
        
        setItinerary(formattedItinerary)
      } catch (err) {
        console.error('Failed to fetch trip:', err)
        // Use fallback data on error
        setTrip(fallbackTrip)
        setItinerary(fallbackItinerary)
        setError(null) // Clear error since we have fallback data
      } finally {
        setLoading(false)
      }
    }

    if (tripId) {
      fetchTrip()
    }
  }, [tripId, navigate])

  const saveItinerary = async () => {
    try {
      setSaving(true)
      
      // Don't save if using sample tripId
      if (tripId === 'sample') {
        setError('Cannot save sample trip. Please create a real trip first.')
        return
      }
      
      // Update trip basic info
      const tripData = {
        title: itinerary.title,
        destination: itinerary.destination,
        description: trip?.description || '',
        startDate: trip?.startDate,
        endDate: trip?.endDate,
        budget: trip?.budget,
        tripType: trip?.tripType,
        travelers: trip?.travelers
      }

      await tripApi.updateTrip(tripId, tripData)
      
      // Get existing stops to compare
      const existingStopsResponse = await itineraryApi.getStops(tripId)
      const existingStops = existingStopsResponse.data
      
      // Create, update, or delete stops
      for (const [index, day] of itinerary.days.entries()) {
        const stopData = {
          name: `Day ${index + 1}`,
          date: new Date(day.date).toISOString(),
          order: index
        }
        
        const existingStop = existingStops.find(s => s.id === day.id)
        
        if (existingStop) {
          // Update existing stop
          await itineraryApi.updateStop(day.id, stopData)
          
          // Handle activities for this stop
          const existingActivities = await itineraryApi.getActivities(day.id)
          const existingActivitiesData = existingActivities.data
          
          // Create or update activities
          for (const [activityIndex, activity] of day.activities.entries()) {
            const activityData = {
              name: activity.activity,
              description: activity.notes,
              location: activity.location,
              time: activity.time ? new Date(`2024-01-01 ${activity.time}`).toISOString() : null,
              duration: activity.duration?.includes('minutes') ? parseInt(activity.duration) : 60,
              category: activity.type?.toUpperCase() || 'SIGHTSEEING'
            }
            
            const existingActivity = existingActivitiesData.find(a => a.id === activity.id)
            if (existingActivity) {
              await itineraryApi.updateActivity(activity.id, activityData)
            } else {
              await itineraryApi.createActivity(day.id, activityData)
            }
          }
          
          // Delete activities that are no longer in the itinerary
          for (const existingActivity of existingActivitiesData) {
            if (!day.activities.find(a => a.id === existingActivity.id)) {
              await itineraryApi.deleteActivity(existingActivity.id)
            }
          }
        } else {
          // Create new stop
          const newStop = await itineraryApi.createStop(tripId, stopData)
          
          // Create activities for the new stop
          for (const [activityIndex, activity] of day.activities.entries()) {
            const activityData = {
              name: activity.activity,
              description: activity.notes,
              location: activity.location,
              time: activity.time ? new Date(`2024-01-01 ${activity.time}`).toISOString() : null,
              duration: activity.duration?.includes('minutes') ? parseInt(activity.duration) : 60,
              category: activity.type?.toUpperCase() || 'SIGHTSEEING'
            }
            
            await itineraryApi.createActivity(newStop.data.id, activityData)
          }
        }
      }
      
      // Delete stops that are no longer in the itinerary
      for (const existingStop of existingStops) {
        if (!itinerary.days.find(d => d.id === existingStop.id)) {
          await itineraryApi.deleteStop(existingStop.id)
        }
      }
      
      // Navigate to view page after successful save
      navigate(`/dashboard/itinerary-view/${tripId}`)
    } catch (err) {
      console.error('Failed to save trip:', err)
      setError('Failed to save trip')
    } finally {
      setSaving(false)
    }
  }

  const [newActivity, setNewActivity] = useState({
    time: '',
    activity: '',
    location: '',
    type: 'sightseeing',
    duration: '',
    notes: ''
  })

  const [draggedActivity, setDraggedActivity] = useState(null)
  const [isAddingActivity, setIsAddingActivity] = useState(false)
  const [selectedDay, setSelectedDay] = useState(null)

  const activityTypes = [
    { id: 'sightseeing', name: 'Sightseeing', icon: Camera, color: 'from-blue-500 to-cyan-500' },
    { id: 'dining', name: 'Dining', icon: Utensils, color: 'from-orange-500 to-red-500' },
    { id: 'accommodation', name: 'Hotel', icon: Hotel, color: 'from-purple-500 to-pink-500' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'from-green-500 to-emerald-500' },
    { id: 'transport', name: 'Transport', icon: Plane, color: 'from-indigo-500 to-blue-500' }
  ]

  const getActivityIcon = (type) => {
    const activityType = activityTypes.find(t => t.id === type)
    return activityType ? activityType.icon : Camera
  }

  const getActivityColor = (type) => {
    const activityType = activityTypes.find(t => t.id === type)
    return activityType ? activityType.color : 'from-gray-500 to-gray-600'
  }

  const addActivity = (dayId) => {
    if (newActivity.time && newActivity.activity && newActivity.location) {
      const updatedItinerary = { ...itinerary }
      const dayIndex = updatedItinerary.days.findIndex(d => d.id === dayId)
      if (dayIndex !== -1) {
        const newActivityWithId = {
          ...newActivity,
          id: Date.now()
        }
        updatedItinerary.days[dayIndex].activities.push(newActivityWithId)
        setItinerary(updatedItinerary)
        setNewActivity({
          time: '',
          activity: '',
          location: '',
          type: 'sightseeing',
          duration: '',
          notes: ''
        })
        setIsAddingActivity(false)
        setSelectedDay(null)
      }
    }
  }

  const deleteActivity = (dayId, activityId) => {
    const updatedItinerary = { ...itinerary }
    const dayIndex = updatedItinerary.days.findIndex(d => d.id === dayId)
    if (dayIndex !== -1) {
      updatedItinerary.days[dayIndex].activities = updatedItinerary.days[dayIndex].activities.filter(
        a => a.id !== activityId
      )
      setItinerary(updatedItinerary)
    }
  }

  const addDay = () => {
    const newDay = {
      id: Date.now(),
      date: `March ${15 + itinerary.days.length}, 2024`,
      activities: []
    }
    setItinerary(prev => ({
      ...prev,
      days: [...prev.days, newDay]
    }))
  }

  const handleDragStart = (activity, dayId) => {
    setDraggedActivity({ activity, dayId })
  }

  const handleDrop = (targetDayId) => {
    if (draggedActivity && draggedActivity.dayId !== targetDayId) {
      const updatedItinerary = { ...itinerary }
      
      // Remove from source day
      const sourceDayIndex = updatedItinerary.days.findIndex(d => d.id === draggedActivity.dayId)
      if (sourceDayIndex !== -1) {
        updatedItinerary.days[sourceDayIndex].activities = updatedItinerary.days[sourceDayIndex].activities.filter(
          a => a.id !== draggedActivity.activity.id
        )
      }
      
      // Add to target day
      const targetDayIndex = updatedItinerary.days.findIndex(d => d.id === targetDayId)
      if (targetDayIndex !== -1) {
        updatedItinerary.days[targetDayIndex].activities.push(draggedActivity.activity)
      }
      
      setItinerary(updatedItinerary)
    }
    setDraggedActivity(null)
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
          <p className="text-gray-600">Loading trip builder...</p>
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
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Error</h3>
          <p className="text-gray-600 mb-8">{error}</p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/dashboard/my-trips"
              className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
            >
              My Trips
            </Link>
            {error.includes('No trips found') && (
              <Link
                to="/dashboard/city-search"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
              >
                Create New Trip
              </Link>
            )}
          </div>
        </div>
      </div>
    )
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
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Itinerary Builder</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {itinerary.destination}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {itinerary.dates}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={saveItinerary}
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg flex items-center disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {saving ? 'Saving...' : 'Save'}
              </motion.button>
              <Link
                to={`/dashboard/itinerary-view/${tripId}`}
                className="px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
              >
                Preview
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Itinerary Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <input
            type="text"
            value={itinerary.title}
            onChange={(e) => setItinerary(prev => ({ ...prev, title: e.target.value }))}
            className="w-full text-3xl font-bold text-gray-900 placeholder-gray-400 border-none focus:outline-none"
            placeholder="Enter itinerary title..."
          />
        </motion.div>

        {/* Days and Activities */}
        <div className="space-y-8">
          {itinerary.days.map((day, dayIndex) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + dayIndex * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(day.id)}
            >
              {/* Day Header */}
              <div className="bg-gradient-to-r from-sky-blue to-cyan p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Day {dayIndex + 1}</h2>
                    <p className="text-white/90">{day.date}</p>
                  </div>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsAddingActivity(true)
                        setSelectedDay(day.id)
                      }}
                      className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 flex items-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Activity
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Activities */}
              <div className="p-6">
                {day.activities.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No activities planned for this day</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsAddingActivity(true)
                        setSelectedDay(day.id)
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold flex items-center mx-auto"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Activity
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {day.activities.map((activity, activityIndex) => {
                      const Icon = getActivityIcon(activity.type)
                      return (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + activityIndex * 0.1 }}
                          draggable
                          onDragStart={() => handleDragStart(activity, day.id)}
                          className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-move group"
                        >
                          <GripVertical className="w-5 h-5 text-gray-400 mt-1 cursor-move" />
                          
                          <div className={`w-12 h-12 bg-gradient-to-r ${getActivityColor(activity.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold text-gray-900 text-lg mb-1">{activity.activity}</h4>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {activity.time}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {activity.location}
                                  </div>
                                  {activity.duration && (
                                    <div className="flex items-center">
                                      <Star className="w-4 h-4 mr-1" />
                                      {activity.duration}
                                    </div>
                                  )}
                                </div>
                                {activity.notes && (
                                  <p className="text-sm text-gray-500 italic">{activity.notes}</p>
                                )}
                              </div>
                              
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                >
                                  <Edit className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => deleteActivity(day.id, activity.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}

                {/* Add Activity Form */}
                {isAddingActivity && selectedDay === day.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-6 bg-gradient-to-r from-sky-blue/10 to-cyan/10 rounded-xl border-2 border-sky-blue/20"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Add New Activity</h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setIsAddingActivity(false)
                          setSelectedDay(null)
                        }}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                        <input
                          type="time"
                          value={newActivity.time}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          placeholder="e.g., 2 hours"
                          value={newActivity.duration}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, duration: e.target.value }))}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Activity</label>
                        <input
                          type="text"
                          placeholder="What will you do?"
                          value={newActivity.activity}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, activity: e.target.value }))}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          placeholder="Where will it be?"
                          value={newActivity.location}
                          onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                          className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Activity Type</label>
                      <div className="flex flex-wrap gap-2">
                        {activityTypes.map((type) => {
                          const Icon = type.icon
                          return (
                            <motion.button
                              key={type.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setNewActivity(prev => ({ ...prev, type: type.id }))}
                              className={`px-4 py-2 rounded-xl font-medium flex items-center transition-all ${
                                newActivity.type === type.id
                                  ? 'bg-gradient-to-r ' + type.color + ' text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              <Icon className="w-4 h-4 mr-2" />
                              {type.name}
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
                      <textarea
                        placeholder="Additional details..."
                        value={newActivity.notes}
                        onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                        rows={2}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                      />
                    </div>

                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addActivity(day.id)}
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold flex items-center"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Add Activity
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsAddingActivity(false)
                          setSelectedDay(null)
                        }}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Day Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addDay}
            className="px-8 py-4 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center mx-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Day
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default ItineraryBuilder