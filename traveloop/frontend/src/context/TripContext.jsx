import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const TripContext = createContext()

export const useTrip = () => {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider')
  }
  return context
}

export const TripProvider = ({ children }) => {
  const [trips, setTrips] = useState([])
  const [currentTrip, setCurrentTrip] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchTrips()
  }, [])

  const fetchTrips = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/trips')
      setTrips(response.data)
    } catch (error) {
      console.error('Failed to fetch trips:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTrip = async (tripData) => {
    try {
      setLoading(true)
      const response = await axios.post('/api/trips', tripData)
      const newTrip = response.data
      setTrips(prev => [...prev, newTrip])
      return { success: true, trip: newTrip }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to create trip' 
      }
    } finally {
      setLoading(false)
    }
  }

  const updateTrip = async (tripId, tripData) => {
    try {
      setLoading(true)
      const response = await axios.put(`/api/trips/${tripId}`, tripData)
      const updatedTrip = response.data
      setTrips(prev => prev.map(trip => 
        trip.id === tripId ? updatedTrip : trip
      ))
      if (currentTrip?.id === tripId) {
        setCurrentTrip(updatedTrip)
      }
      return { success: true, trip: updatedTrip }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update trip' 
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteTrip = async (tripId) => {
    try {
      setLoading(true)
      await axios.delete(`/api/trips/${tripId}`)
      setTrips(prev => prev.filter(trip => trip.id !== tripId))
      if (currentTrip?.id === tripId) {
        setCurrentTrip(null)
      }
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete trip' 
      }
    } finally {
      setLoading(false)
    }
  }

  const getTrip = async (tripId) => {
    try {
      setLoading(true)
      const response = await axios.get(`/api/trips/${tripId}`)
      const trip = response.data
      setCurrentTrip(trip)
      return { success: true, trip }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to fetch trip' 
      }
    } finally {
      setLoading(false)
    }
  }

  const addActivity = async (tripId, activityData) => {
    try {
      setLoading(true)
      const response = await axios.post(`/api/trips/${tripId}/activities`, activityData)
      const newActivity = response.data
      
      if (currentTrip?.id === tripId) {
        setCurrentTrip(prev => ({
          ...prev,
          activities: [...(prev.activities || []), newActivity]
        }))
      }
      
      return { success: true, activity: newActivity }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add activity' 
      }
    } finally {
      setLoading(false)
    }
  }

  const updateActivity = async (tripId, activityId, activityData) => {
    try {
      setLoading(true)
      const response = await axios.put(`/api/trips/${tripId}/activities/${activityId}`, activityData)
      const updatedActivity = response.data
      
      if (currentTrip?.id === tripId) {
        setCurrentTrip(prev => ({
          ...prev,
          activities: prev.activities?.map(activity => 
            activity.id === activityId ? updatedActivity : activity
          )
        }))
      }
      
      return { success: true, activity: updatedActivity }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update activity' 
      }
    } finally {
      setLoading(false)
    }
  }

  const deleteActivity = async (tripId, activityId) => {
    try {
      setLoading(true)
      await axios.delete(`/api/trips/${tripId}/activities/${activityId}`)
      
      if (currentTrip?.id === tripId) {
        setCurrentTrip(prev => ({
          ...prev,
          activities: prev.activities?.filter(activity => activity.id !== activityId)
        }))
      }
      
      return { success: true }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to delete activity' 
      }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    trips,
    currentTrip,
    loading,
    fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip,
    getTrip,
    addActivity,
    updateActivity,
    deleteActivity,
    setCurrentTrip
  }

  return (
    <TripContext.Provider value={value}>
      {children}
    </TripContext.Provider>
  )
}