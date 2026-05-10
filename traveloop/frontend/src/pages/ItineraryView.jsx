import React from 'react'

const ItineraryView = () => {
  const itinerary = {
    title: 'Paris Adventure 2024',
    destination: 'Paris, France',
    dates: 'March 15-22, 2024',
    days: [
      {
        day: 1,
        date: 'March 15, 2024',
        activities: [
          { time: '09:00', activity: 'Arrival at Charles de Gaulle Airport', location: 'CDG Airport' },
          { time: '11:00', activity: 'Check-in at Hotel', location: 'Hotel Le Marais' },
          { time: '13:00', activity: 'Lunch at local bistro', location: 'Café de Flore' },
          { time: '15:00', activity: 'Visit Louvre Museum', location: 'Louvre Museum' },
          { time: '19:00', activity: 'Dinner cruise on Seine', location: 'Seine River' }
        ]
      },
      {
        day: 2,
        date: 'March 16, 2024',
        activities: [
          { time: '08:00', activity: 'Breakfast at hotel', location: 'Hotel Le Marais' },
          { time: '09:30', activity: 'Eiffel Tower visit', location: 'Eiffel Tower' },
          { time: '12:00', activity: 'Lunch at Champ de Mars', location: 'Champ de Mars' },
          { time: '14:00', activity: 'Arc de Triomphe', location: 'Arc de Triomphe' },
          { time: '16:00', activity: 'Shopping on Champs-Élysées', location: 'Champs-Élysées' },
          { time: '19:30', activity: 'Dinner in Montmartre', location: 'Montmartre' }
        ]
      },
      {
        day: 3,
        date: 'March 17, 2024',
        activities: [
          { time: '09:00', activity: 'Versailles day trip', location: 'Palace of Versailles' },
          { time: '10:00', activity: 'Palace tour', location: 'Palace of Versailles' },
          { time: '13:00', activity: 'Lunch in Versailles', location: 'Versailles Gardens' },
          { time: '15:00', activity: 'Explore gardens', location: 'Versailles Gardens' },
          { time: '18:00', activity: 'Return to Paris', location: 'Paris' }
        ]
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{itinerary.title}</h1>
          <div className="flex items-center gap-6 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{itinerary.destination}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{itinerary.dates}</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Edit Itinerary
            </button>
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Share
            </button>
            <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Download PDF
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {itinerary.days.map((day) => (
            <div key={day.day} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Day {day.day}</h2>
                <span className="text-gray-600">{day.date}</span>
              </div>
              
              <div className="space-y-4">
                {day.activities.map((activity, index) => (
                  <div key={index} className="flex gap-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-20 text-center">
                        <span className="text-sm font-medium text-blue-600">{activity.time}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 text-lg">{activity.activity}</h4>
                          <p className="text-gray-600 flex items-center gap-2 mt-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {activity.location}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-500 hover:text-blue-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                  Add Activity
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Duration</h4>
              <p className="text-gray-600">7 days, 6 nights</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Total Activities</h4>
              <p className="text-gray-600">{itinerary.days.reduce((total, day) => total + day.activities.length, 0)} activities</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Budget</h4>
              <p className="text-gray-600">$3,500 estimated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItineraryView