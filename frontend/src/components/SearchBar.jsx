import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, X, Filter, Calendar, MapPin } from 'lucide-react'

const SearchBar = ({ 
  placeholder = 'Search destinations, activities...', 
  onSearch,
  onFilter,
  showFilters = true,
  variant = 'default'
}) => {
  const [query, setQuery] = useState('')
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [filters, setFilters] = useState({
    dateRange: '',
    location: '',
    priceRange: '',
    category: ''
  })

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch?.(query, filters)
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter?.(newFilters)
  }

  const clearFilters = () => {
    setFilters({
      dateRange: '',
      location: '',
      priceRange: '',
      category: ''
    })
    onFilter?.({})
  }

  const searchBarVariants = {
    default: "bg-white rounded-2xl shadow-lg border border-gray-100",
    compact: "bg-white rounded-xl shadow-md border border-gray-100",
    minimal: "bg-gray-50 rounded-lg border border-gray-200"
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className={`${searchBarVariants[variant]} p-4`}>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 bg-transparent focus:outline-none"
              />
              {query && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </motion.button>
              )}
            </div>

            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-primary px-6 py-3 flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </motion.button>

            {/* Filter Toggle */}
            {showFilters && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className={`p-3 rounded-lg transition-colors ${
                  showFilterPanel || Object.values(filters).some(v => v)
                    ? 'bg-sky-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Filter className="w-5 h-5" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && showFilterPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>Location</span>
                  </label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    placeholder="Enter location"
                    className="input-modern"
                  />
                </div>

                {/* Date Range Filter */}
                <div>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>Date Range</span>
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange}
                    onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                    className="input-modern"
                  />
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    className="input-modern"
                  >
                    <option value="">Any price</option>
                    <option value="0-50">₹0 - ₹4,000</option>
                    <option value="50-100">₹4,000 - ₹8,300</option>
                    <option value="100-200">₹8,300 - ₹16,600</option>
                    <option value="200+">₹16,600+</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input-modern"
                  >
                    <option value="">All categories</option>
                    <option value="adventure">Adventure</option>
                    <option value="cultural">Cultural</option>
                    <option value="food">Food & Dining</option>
                    <option value="nature">Nature</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="shopping">Shopping</option>
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Clear Filters
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-primary px-6 py-2"
                >
                  Apply Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

export default SearchBar
