import React, { useState } from 'react'

const ItineraryBuilder = () => {
  const [itinerary, setItinerary] = useState({
    title: '',
    days: [
      {
        day: 1,
        activities: [
          { time: '09:00', activity: 'Breakfast at hotel', location: 'Hotel Restaurant' },
          { time: '10:30', activity: 'City tour', location: 'Downtown' }
        ]
      }
    ]
  })

  const [newActivity, setNewActivity] = useState({
    time: '',
    activity: '',
    location: ''
  })

  const addActivity = (dayIndex) => {
    if (newActivity.time && newActivity.activity && newActivity.location) {
      const updatedItinerary = { ...itinerary }
      updatedItinerary.days[dayIndex].activities.push({ ...newActivity })
      setItinerary(updatedItinerary)
      setNewActivity({ time: '', activity: '', location: '' })
    }
  }

  const addDay = () => {
    const newDay = {
      day: itinerary.days.length + 1,
      activities: []
    }
    setItinerary(prev => ({
      ...prev,
      days: [...prev.days, newDay]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Itinerary Builder</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <input
            type="text"
            placeholder="Itinerary Title"
            value={itinerary.title}
            onChange={(e) => setItinerary(prev => ({ ...prev, title: e.target.value }))}
            className="w-full text-2xl font-semibold text-gray-900 placeholder-gray-400 border-none focus:outline-none"
          />
        </div>

        {itinerary.days.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Day {day.day}</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Add Activity
                </button>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {day.activities.map((activity, activityIndex) => (
                <div key={activityIndex} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <span className="text-sm font-medium text-blue-600">{activity.time}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{activity.activity}</h4>
                    <p className="text-sm text-gray-500">{activity.location}</p>
                  </div>
                  <button className="text-red-500 hover:text-red-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Add New Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  type="time"
                  value={newActivity.time}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Activity"
                  value={newActivity.activity}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, activity: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => addActivity(dayIndex)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            onClick={addDay}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
          >
            Add Day
          </button>
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700">
            Save Itinerary
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItineraryBuilder