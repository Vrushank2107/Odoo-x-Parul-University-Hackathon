import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
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
  Check
} from 'lucide-react'

const ItineraryBuilder = () => {
  const { tripId } = useParams()
  
  const [itinerary, setItinerary] = useState({
    title: 'Paris Adventure 2024',
    destination: 'Paris, France',
    dates: 'March 15-22, 2024',
    days: [
      {
        id: 1,
        date: 'March 15, 2024',
        activities: [
          { 
            id: 1, 
            time: '09:00', 
            activity: 'Breakfast at Café de Flore', 
            location: 'Saint-Germain-des-Prés',
            type: 'dining',
            duration: '1 hour',
            notes: 'Famous historic café'
          },
          { 
            id: 2, 
            time: '11:00', 
            activity: 'Visit Eiffel Tower', 
            location: 'Champ de Mars',
            type: 'sightseeing',
            duration: '2 hours',
            notes: 'Book tickets in advance'
          },
          { 
            id: 3, 
            time: '14:00', 
            activity: 'Lunch at Le Jules Verne', 
            location: 'Eiffel Tower',
            type: 'dining',
            duration: '1.5 hours',
            notes: 'Michelin starred restaurant'
          }
        ]
      },
      {
        id: 2,
        date: 'March 16, 2024',
        activities: [
          { 
            id: 4, 
            time: '10:00', 
            activity: 'Louvre Museum', 
            location: 'Rue de Rivoli',
            type: 'sightseeing',
            duration: '4 hours',
            notes: 'See Mona Lisa and Venus de Milo'
          }
        ]
      }
    ]
  })

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
                className="px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Draft
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