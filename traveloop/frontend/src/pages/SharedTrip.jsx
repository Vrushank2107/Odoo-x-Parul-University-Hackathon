import React from 'react'

const SharedTrip = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shared Trip</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trip Sharing</h2>
          <p className="text-gray-600 mb-6">Share your trip itinerary with friends and family.</p>
          
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Share Link</h3>
              <div className="flex gap-4">
                <input
                  type="text"
                  value="https://traveloop.app/shared/trip-123"
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Copy Link
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Invite People</h3>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Send Invite
                </button>
              </div>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Shared With</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                      JD
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-500">john@example.com</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium text-green-100 bg-green-800 rounded-full">
                    Can Edit
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-medium">
                      SM
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sarah Miller</p>
                      <p className="text-sm text-gray-500">sarah@example.com</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium text-blue-100 bg-blue-800 rounded-full">
                    Can View
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SharedTrip