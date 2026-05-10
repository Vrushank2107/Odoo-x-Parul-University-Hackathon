import React, { useState } from 'react'

const CitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  const popularCities = [
    { name: 'Paris', country: 'France', description: 'City of lights and romance' },
    { name: 'Tokyo', country: 'Japan', description: 'Modern metropolis with traditional charm' },
    { name: 'New York', country: 'USA', description: 'The city that never sleeps' },
    { name: 'London', country: 'UK', description: 'Historic capital with modern attractions' },
    { name: 'Dubai', country: 'UAE', description: 'Luxury shopping and ultramodern architecture' },
    { name: 'Singapore', country: 'Singapore', description: 'Garden city with diverse culture' }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const filtered = popularCities.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Cities</h1>
        
        <form onSubmit={handleSearch} className="mb-8">
          <div className="max-w-2xl">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a city or country..."
                className="w-full px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {searchQuery && searchResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((city, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
                     onClick={() => setSelectedCity(city)}>
                  <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{city.country}</p>
                  <p className="text-gray-600 text-sm">{city.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!searchQuery && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCities.map((city, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
                     onClick={() => setSelectedCity(city)}>
                  <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{city.country}</p>
                  <p className="text-gray-600 text-sm">{city.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedCity.name}</h2>
              <p className="text-lg text-gray-600 mb-2">{selectedCity.country}</p>
              <p className="text-gray-700 mb-6">{selectedCity.description}</p>
              <div className="flex gap-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Details
                </button>
                <button 
                  onClick={() => setSelectedCity(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CitySearch