import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Search, 
  MapPin, 
  Star,
  Heart,
  Filter,
  Globe,
  Calendar,
  Users,
  TrendingUp,
  X,
  ChevronDown,
  ArrowRight,
  Plane,
  Hotel,
  Camera,
  Utensils
} from 'lucide-react'

const CitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  const regions = [
    { id: 'all', name: 'All Regions' },
    { id: 'europe', name: 'Europe' },
    { id: 'asia', name: 'Asia' },
    { id: 'americas', name: 'Americas' },
    { id: 'africa', name: 'Africa' },
    { id: 'oceania', name: 'Oceania' }
  ]

  const tripTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'adventure', name: 'Adventure' },
    { id: 'beach', name: 'Beach' },
    { id: 'cultural', name: 'Cultural' },
    { id: 'romantic', name: 'Romantic' },
    { id: 'family', name: 'Family' }
  ]

  const priceRanges = [
    { id: 'all', name: 'All Budgets' },
    { id: 'budget', name: 'Budget ($)' },
    { id: 'moderate', name: 'Moderate ($$)' },
    { id: 'luxury', name: 'Luxury ($$$)' }
  ]

  const popularCities = [
    { 
      id: 1,
      name: 'Paris', 
      country: 'France', 
      region: 'europe',
      description: 'City of lights and romance',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop',
      rating: 4.8,
      price: '₹₹₹',
      type: 'romantic',
      activities: 156,
      bestTime: 'Apr-Jun, Sep-Oct'
    },
    { 
      id: 2,
      name: 'Tokyo', 
      country: 'Japan', 
      region: 'asia',
      description: 'Modern metropolis with traditional charm',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop',
      rating: 4.9,
      price: '₹₹₹',
      type: 'cultural',
      activities: 203,
      bestTime: 'Mar-May, Oct-Nov'
    },
    { 
      id: 3,
      name: 'New York', 
      country: 'USA', 
      region: 'americas',
      description: 'The city that never sleeps',
      image: 'https://images.unsplash.com/photo-1496442226666-8274e0d47c5a?w=400&h=300&fit=crop',
      rating: 4.7,
      price: '₹₹₹',
      type: 'adventure',
      activities: 189,
      bestTime: 'Apr-Jun, Sep-Nov'
    },
    { 
      id: 4,
      name: 'London', 
      country: 'UK', 
      region: 'europe',
      description: 'Historic capital with modern attractions',
      image: 'https://images.unsplash.com/photo-1513635263979-8845079d7d5b?w=400&h=300&fit=crop',
      rating: 4.6,
      price: '₹₹₹',
      type: 'cultural',
      activities: 167,
      bestTime: 'May-Sep'
    },
    { 
      id: 5,
      name: 'Dubai', 
      country: 'UAE', 
      region: 'asia',
      description: 'Luxury shopping and ultramodern architecture',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop',
      rating: 4.5,
      price: '₹₹₹',
      type: 'luxury',
      activities: 98,
      bestTime: 'Nov-Mar'
    },
    { 
      id: 6,
      name: 'Singapore', 
      country: 'Singapore', 
      region: 'asia',
      description: 'Garden city with diverse culture',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ba96a5?w=400&h=300&fit=crop',
      rating: 4.7,
      price: '₹₹',
      type: 'family',
      activities: 134,
      bestTime: 'Feb-Apr'
    },
    { 
      id: 7,
      name: 'Bali', 
      country: 'Indonesia', 
      region: 'asia',
      description: 'Tropical paradise with stunning beaches',
      image: 'https://images.unsplash.com/photo-1537953764746-f6e532f4dbaf?w=400&h=300&fit=crop',
      rating: 4.9,
      price: '₹',
      type: 'beach',
      activities: 145,
      bestTime: 'Apr-Oct'
    },
    { 
      id: 8,
      name: 'Rome', 
      country: 'Italy', 
      region: 'europe',
      description: 'Eternal city of history and art',
      image: 'https://images.unsplash.com/photo-1515522637-2b1b22c9e0b2?w=400&h=300&fit=crop',
      rating: 4.8,
      price: '₹₹',
      type: 'cultural',
      activities: 178,
      bestTime: 'Apr-May, Sep-Oct'
    }
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const filtered = popularCities.filter(city => 
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const getFilteredCities = () => {
    let filtered = searchQuery ? searchResults : popularCities
    
    if (selectedRegion !== 'all') {
      filtered = filtered.filter(city => city.region === selectedRegion)
    }
    
    if (selectedType !== 'all') {
      filtered = filtered.filter(city => city.type === selectedType)
    }
    
    if (priceRange !== 'all') {
      filtered = filtered.filter(city => city.price === priceRange)
    }
    
    return filtered
  }

  const clearFilters = () => {
    setSelectedRegion('all')
    setSelectedType('all')
    setPriceRange('all')
    setSearchQuery('')
    setSearchResults([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Discover Your Next Destination</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore amazing cities around the world and find your perfect travel destination
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="mb-6">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cities, countries, or experiences..."
                  className="w-full pl-14 pr-32 py-4 text-lg text-gray-900 placeholder-gray-500 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue transition-all"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 flex items-center font-medium"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl hover:shadow-lg flex items-center font-semibold"
                  >
                    Search
                  </motion.button>
                </div>
              </div>
            </div>
          </form>

          {/* Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Filter Destinations</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowFilters(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Region</label>
                  <div className="relative">
                    <select
                      value={selectedRegion}
                      onChange={(e) => setSelectedRegion(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue appearance-none"
                    >
                      {regions.map(region => (
                        <option key={region.id} value={region.id}>{region.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Trip Type</label>
                  <div className="relative">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue appearance-none"
                    >
                      {tripTypes.map(type => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                  <div className="relative">
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue appearance-none"
                    >
                      {priceRanges.map(range => (
                        <option key={range.id} value={range.id}>{range.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-600">
                  {getFilteredCities().length} destinations found
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-4 py-2 text-sky-blue hover:text-sky-blue/80 font-medium"
                >
                  Clear all filters
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Active Filters */}
          {(selectedRegion !== 'all' || selectedType !== 'all' || priceRange !== 'all') && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedRegion !== 'all' && (
                <span className="px-3 py-1 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium">
                  {regions.find(r => r.id === selectedRegion)?.name}
                </span>
              )}
              {selectedType !== 'all' && (
                <span className="px-3 py-1 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium">
                  {tripTypes.find(t => t.id === selectedType)?.name}
                </span>
              )}
              {priceRange !== 'all' && (
                <span className="px-3 py-1 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium">
                  {priceRanges.find(r => r.id === priceRange)?.name}
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {getFilteredCities().map((city, index) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
              onClick={() => setSelectedCity(city)}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                <div className="relative h-48">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Like Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle like functionality
                    }}
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </motion.button>

                  {/* Rating */}
                  <div className="absolute top-4 left-4 flex items-center bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-white text-sm font-medium">{city.rating}</span>
                  </div>

                  {/* Price */}
                  <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">{city.price}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{city.name}</h3>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {city.country}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{city.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Camera className="w-4 h-4 mr-1" />
                      {city.activities} activities
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {city.bestTime}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center"
                  >
                    Explore City
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {getFilteredCities().length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No destinations found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center mx-auto"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* City Detail Modal */}
      {selectedCity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCity(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img
                src={selectedCity.image}
                alt={selectedCity.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedCity(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedCity.name}</h2>
                <div className="flex items-center text-white/90">
                  <MapPin className="w-5 h-5 mr-2" />
                  {selectedCity.country}
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Star className="w-6 h-6 text-yellow-400 fill-current mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedCity.rating}</p>
                  <p className="text-sm text-gray-600">Rating</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <Camera className="w-6 h-6 text-sky-blue mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedCity.activities}</p>
                  <p className="text-sm text-gray-600">Activities</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{selectedCity.price}</p>
                  <p className="text-sm text-gray-600">Avg. Cost</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6 text-lg">{selectedCity.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-medium">Best Time:</span>
                  <span className="ml-1">{selectedCity.bestTime}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  to={`/dashboard/create-trip?destination=${selectedCity.name}`}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center justify-center"
                >
                  <Plane className="w-5 h-5 mr-2" />
                  Plan Trip
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCity(null)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default CitySearch