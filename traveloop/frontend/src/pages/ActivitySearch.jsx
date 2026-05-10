import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  MapPin, 
  Star,
  Heart,
  Filter,
  Calendar,
  Clock,
  Users,
  Camera,
  Utensils,
  Hotel,
  ShoppingBag,
  Plane,
  TrendingUp,
  X,
  ChevronDown
} from 'lucide-react'

const ActivitySearch = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [duration, setDuration] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [likedActivities, setLikedActivities] = useState(new Set())

  const categories = [
    { id: 'all', name: 'All Activities' },
    { id: 'sightseeing', name: 'Sightseeing', icon: Camera },
    { id: 'dining', name: 'Dining', icon: Utensils },
    { id: 'accommodation', name: 'Hotels', icon: Hotel },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
    { id: 'transport', name: 'Transport', icon: Plane },
    { id: 'adventure', name: 'Adventure', icon: TrendingUp }
  ]

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'free', name: 'Free' },
    { id: 'budget', name: 'Budget (₹0-4,000)' },
    { id: 'moderate', name: 'Moderate (₹4,000-12,500)' },
    { id: 'expensive', name: 'Expensive (₹12,500+)' }
  ]

  const durations = [
    { id: 'all', name: 'All Durations' },
    { id: 'short', name: 'Short (1-2 hours)' },
    { id: 'medium', name: 'Medium (3-5 hours)' },
    { id: 'long', name: 'Long (6+ hours)' }
  ]

  const activities = [
    {
      id: 1,
      name: 'Eiffel Tower Summit Access',
      category: 'sightseeing',
      description: 'Skip-the-line tickets to the Eiffel Tower summit with breathtaking views of Paris',
      location: 'Champ de Mars, Paris',
      price: 2915,
      duration: '2 hours',
      rating: 4.8,
      reviews: 2456,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop',
      highlights: ['Skip-the-line', 'Summit access', 'Panoramic views'],
      bestTime: 'Morning, Evening'
    },
    {
      id: 2,
      name: 'Seine River Dinner Cruise',
      category: 'dining',
      description: 'Romantic dinner cruise along the Seine with French cuisine and live music',
      location: 'Port de la Bourdonnais, Paris',
      price: 7080,
      duration: '3 hours',
      rating: 4.9,
      reviews: 1823,
      image: 'https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=400&h=250&fit=crop',
      highlights: ['Live music', 'French cuisine', 'City lights'],
      bestTime: 'Evening'
    },
    {
      id: 3,
      name: 'Louvre Museum Guided Tour',
      category: 'sightseeing',
      description: 'Expert-guided tour of the world\'s largest art museum including Mona Lisa',
      location: 'Louvre Museum, Paris',
      price: 4580,
      duration: '3 hours',
      rating: 4.7,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=250&fit=crop',
      highlights: ['Expert guide', 'Skip-the-line', 'Masterpieces'],
      bestTime: 'Morning, Afternoon'
    },
    {
      id: 4,
      name: 'Versailles Palace Day Trip',
      category: 'sightseeing',
      description: 'Full day trip to the magnificent Palace of Versailles and gardens',
      location: 'Versailles, France',
      price: 9996,
      duration: '8 hours',
      rating: 4.9,
      reviews: 1567,
      image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=250&fit=crop',
      highlights: ['Palace tour', 'Gardens', 'Transport included'],
      bestTime: 'Full day'
    },
    {
      id: 5,
      name: 'Montmartre Food Tour',
      category: 'dining',
      description: 'Culinary walking tour through Montmartre with local tastings',
      location: 'Montmartre, Paris',
      price: 6247,
      duration: '4 hours',
      rating: 4.8,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=250&fit=crop',
      highlights: ['Local foods', 'Wine tasting', 'Historic area'],
      bestTime: 'Afternoon, Evening'
    },
    {
      id: 6,
      name: 'Disneyland Paris 1-Day Pass',
      category: 'adventure',
      description: 'Full access to Disneyland Paris with fast pass options',
      location: 'Marne-la-Vallée, France',
      price: 12495,
      duration: 'Full day',
      rating: 4.6,
      reviews: 5234,
      image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=250&fit=crop',
      highlights: ['All parks access', 'Fast pass', 'Family friendly'],
      bestTime: 'Full day'
    },
    {
      id: 7,
      name: 'Bali Temple Tour',
      category: 'sightseeing',
      description: 'Visit ancient temples including Tanah Lot and Uluwatu with sunset views',
      location: 'Bali, Indonesia',
      price: 3500,
      duration: '8 hours',
      rating: 4.7,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=250&fit=crop',
      highlights: ['Temple visits', 'Sunset views', 'Cultural experience'],
      bestTime: 'Morning, Evening'
    },
    {
      id: 8,
      name: 'Tokyo Food Walking Tour',
      category: 'dining',
      description: 'Explore Tokyo\'s street food scene in Shibuya and Shinjuku districts',
      location: 'Tokyo, Japan',
      price: 5200,
      duration: '4 hours',
      rating: 4.8,
      reviews: 2156,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=250&fit=crop',
      highlights: ['Street food', 'Local markets', 'Cultural immersion'],
      bestTime: 'Evening'
    },
    {
      id: 9,
      name: 'New York Helicopter Tour',
      category: 'adventure',
      description: 'Breathtaking aerial views of Manhattan, Statue of Liberty, and Central Park',
      location: 'New York, USA',
      price: 15000,
      duration: '2 hours',
      rating: 4.9,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=250&fit=crop',
      highlights: ['Aerial views', 'Iconic landmarks', 'Photography'],
      bestTime: 'Morning, Evening'
    },
    {
      id: 10,
      name: 'London Eye & Thames Cruise',
      category: 'sightseeing',
      description: 'Combined ticket for London Eye observation wheel and Thames river cruise',
      location: 'London, UK',
      price: 4500,
      duration: '3 hours',
      rating: 4.6,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop',
      highlights: ['Panoramic views', 'River cruise', 'City landmarks'],
      bestTime: 'Morning, Afternoon'
    },
    {
      id: 11,
      name: 'Rome Colosseum Underground Tour',
      category: 'sightseeing',
      description: 'Exclusive access to Colosseum underground chambers and arena floor',
      location: 'Rome, Italy',
      price: 5800,
      duration: '3 hours',
      rating: 4.8,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop',
      highlights: ['Underground access', 'Expert guide', 'Skip-the-line'],
      bestTime: 'Morning'
    },
    {
      id: 12,
      name: 'Dubai Desert Safari',
      category: 'adventure',
      description: 'Evening desert safari with dune bashing, camel rides, and BBQ dinner',
      location: 'Dubai, UAE',
      price: 4200,
      duration: '6 hours',
      rating: 4.7,
      reviews: 2890,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop',
      highlights: ['Dune bashing', 'Camel ride', 'BBQ dinner'],
      bestTime: 'Evening'
    },
    {
      id: 13,
      name: 'Sydney Harbour Bridge Climb',
      category: 'adventure',
      description: 'Climb to the top of Sydney Harbour Bridge for stunning city views',
      location: 'Sydney, Australia',
      price: 12000,
      duration: '3 hours',
      rating: 4.9,
      reviews: 1234,
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&h=250&fit=crop',
      highlights: ['Panoramic views', 'Guided climb', 'Safety equipment'],
      bestTime: 'Morning, Evening'
    },
    {
      id: 14,
      name: 'Barcelona Sagrada Familia Tour',
      category: 'sightseeing',
      description: 'Skip-the-line access to Gaudi\'s masterpiece with audio guide',
      location: 'Barcelona, Spain',
      price: 3800,
      duration: '2 hours',
      rating: 4.8,
      reviews: 3456,
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop',
      highlights: ['Skip-the-line', 'Audio guide', 'Architecture'],
      bestTime: 'Morning, Afternoon'
    },
    {
      id: 15,
      name: 'Singapore Night Safari',
      category: 'adventure',
      description: 'World\'s first nocturnal wildlife park with tram ride and animal shows',
      location: 'Singapore',
      price: 4800,
      duration: '4 hours',
      rating: 4.7,
      reviews: 2134,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=250&fit=crop',
      highlights: ['Night wildlife', 'Tram ride', 'Animal shows'],
      bestTime: 'Evening'
    },
    {
      id: 16,
      name: 'Cape Town Table Mountain Hike',
      category: 'adventure',
      description: 'Guided hike up Table Mountain with panoramic views of Cape Town',
      location: 'Cape Town, South Africa',
      price: 2500,
      duration: '4 hours',
      rating: 4.6,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=250&fit=crop',
      highlights: ['Mountain views', 'Guided hike', 'Nature experience'],
      bestTime: 'Morning'
    },
    {
      id: 17,
      name: 'Bangkok Floating Market Tour',
      category: 'dining',
      description: 'Traditional boat ride through Damnoen Saduak floating market with local food',
      location: 'Bangkok, Thailand',
      price: 2200,
      duration: '5 hours',
      rating: 4.5,
      reviews: 1567,
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&h=250&fit=crop',
      highlights: ['Boat ride', 'Local food', 'Cultural experience'],
      bestTime: 'Morning'
    },
    {
      id: 18,
      name: 'Paris Cooking Class',
      category: 'dining',
      description: 'Learn to make French pastries and cuisine with a professional chef',
      location: 'Paris, France',
      price: 6500,
      duration: '4 hours',
      rating: 4.9,
      reviews: 876,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop',
      highlights: ['Hands-on cooking', 'Professional chef', 'Recipes included'],
      bestTime: 'Morning, Afternoon'
    }
  ]

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.id === category)
    return categoryObj ? categoryObj.icon : Camera
  }

  const getFilteredActivities = () => {
    let filtered = activities

    if (searchQuery) {
      filtered = filtered.filter(activity =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(activity => activity.category === selectedCategory)
    }

    if (priceRange !== 'all') {
      if (priceRange === 'free') {
        filtered = filtered.filter(activity => activity.price === 0)
      } else if (priceRange === 'budget') {
        filtered = filtered.filter(activity => activity.price > 0 && activity.price <= 4000)
      } else if (priceRange === 'moderate') {
        filtered = filtered.filter(activity => activity.price > 4000 && activity.price <= 12500)
      } else if (priceRange === 'expensive') {
        filtered = filtered.filter(activity => activity.price > 12500)
      }
    }

    if (duration !== 'all') {
      if (duration === 'short') {
        filtered = filtered.filter(activity => activity.duration.includes('1-2') || activity.duration.includes('2 hours'))
      } else if (duration === 'medium') {
        filtered = filtered.filter(activity => activity.duration.includes('3-5') || activity.duration.includes('3 hours') || activity.duration.includes('4 hours') || activity.duration.includes('5 hours'))
      } else if (duration === 'long') {
        filtered = filtered.filter(activity => activity.duration.includes('6+') || activity.duration.includes('Full day'))
      }
    }

    return filtered
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setPriceRange('all')
    setDuration('all')
    setSearchQuery('')
  }

  const toggleLike = (activityId) => {
    setLikedActivities(prev => {
      const newLiked = new Set(prev)
      if (newLiked.has(activityId)) {
        newLiked.delete(activityId)
      } else {
        newLiked.add(activityId)
      }
      return newLiked
    })
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Discover Amazing Activities</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect experiences and activities for your next adventure
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities, destinations, or experiences..."
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
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Filter Activities</h3>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue appearance-none"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue appearance-none"
                  >
                    {durations.map(dur => (
                      <option key={dur.id} value={dur.id}>{dur.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-gray-600">
                {getFilteredActivities().length} activities found
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
        {(selectedCategory !== 'all' || priceRange !== 'all' || duration !== 'all') && (
          <div className="flex flex-wrap gap-2 mb-8">
            {selectedCategory !== 'all' && (
              <span className="px-3 py-1 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium">
                {categories.find(c => c.id === selectedCategory)?.name}
              </span>
            )}
            {priceRange !== 'all' && (
              <span className="px-3 py-1 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium">
                {priceRanges.find(r => r.id === priceRange)?.name}
              </span>
            )}
            {duration !== 'all' && (
              <span className="px-3 py-1 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium">
                {durations.find(d => d.id === duration)?.name}
              </span>
            )}
          </div>
        )}

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFilteredActivities().map((activity, index) => {
            const Icon = getCategoryIcon(activity.category)
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedActivity(activity)}
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover">
                  <div className="relative h-48">
                    <img
                      src={activity.image}
                      alt={activity.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Like Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleLike(activity.id)
                      }}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                    >
                      <Heart className={`w-5 h-5 ${likedActivities.has(activity.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </motion.button>

                    {/* Price */}
                    <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-3 py-1">
                      <span className="text-white font-bold">₹{activity.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{activity.name}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="line-clamp-1">{activity.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{activity.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {activity.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                        <span className="font-medium">{activity.rating}</span>
                        <span className="ml-1">({activity.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {activity.highlights.map((highlight, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        Best: {activity.bestTime}
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center text-sm"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {getFilteredActivities().length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No activities found</h3>
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

        {/* Activity Detail Modal */}
        {selectedActivity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedActivity(null)}
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
                  src={selectedActivity.image}
                  alt={selectedActivity.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=600&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedActivity(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedActivity.name}</h2>
                  <div className="flex items-center text-white/90">
                    <MapPin className="w-5 h-5 mr-2" />
                    {selectedActivity.location}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">₹{selectedActivity.price}</p>
                    <p className="text-sm text-gray-600">Price</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Clock className="w-6 h-6 text-sky-blue mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{selectedActivity.duration}</p>
                    <p className="text-sm text-gray-600">Duration</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-400 fill-current mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{selectedActivity.rating}</p>
                    <p className="text-sm text-gray-600">Rating</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 text-lg">{selectedActivity.description}</p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedActivity.highlights.map((highlight, index) => (
                      <span key={index} className="px-3 py-1 bg-sky-blue/10 text-sky-blue rounded-lg text-sm font-medium">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    <span className="font-medium">Best Time:</span>
                    <span className="ml-1">{selectedActivity.bestTime}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-5 h-5 mr-2" />
                    <span className="font-medium">{selectedActivity.reviews}</span>
                    <span className="ml-1">reviews</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center justify-center"
                  >
                    Book Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedActivity(null)}
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
    </div>
  )
}

export default ActivitySearch