import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  Circle, 
  Plus,
  Trash2,
  Edit,
  Search,
  Filter,
  Luggage,
  FileText,
  Shirt,
  Droplets,
  Smartphone,
  Pill,
  Package,
  ChevronDown,
  Check,
  X,
  TrendingUp,
  Calendar,
  AlertCircle
} from 'lucide-react'

const PackingChecklist = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, item: 'Passport', checked: true, category: 'Documents', priority: 'high' },
    { id: 2, item: 'Visa (if required)', checked: false, category: 'Documents', priority: 'high' },
    { id: 3, item: 'Travel insurance', checked: true, category: 'Documents', priority: 'high' },
    { id: 4, item: 'Flight tickets', checked: true, category: 'Documents', priority: 'high' },
    { id: 5, item: 'Hotel reservations', checked: true, category: 'Documents', priority: 'medium' },
    { id: 6, item: 'Clothing (7 days)', checked: false, category: 'Clothing', priority: 'high' },
    { id: 7, item: 'Underwear', checked: false, category: 'Clothing', priority: 'high' },
    { id: 8, item: 'Shoes (2 pairs)', checked: false, category: 'Clothing', priority: 'medium' },
    { id: 9, item: 'Jacket', checked: true, category: 'Clothing', priority: 'medium' },
    { id: 10, item: 'Toothbrush', checked: false, category: 'Toiletries', priority: 'high' },
    { id: 11, item: 'Toothpaste', checked: false, category: 'Toiletries', priority: 'high' },
    { id: 12, item: 'Shampoo', checked: false, category: 'Toiletries', priority: 'medium' },
    { id: 13, item: 'Sunscreen', checked: true, category: 'Toiletries', priority: 'high' },
    { id: 14, item: 'Phone charger', checked: false, category: 'Electronics', priority: 'high' },
    { id: 15, item: 'Power bank', checked: false, category: 'Electronics', priority: 'medium' },
    { id: 16, item: 'Camera', checked: true, category: 'Electronics', priority: 'low' },
    { id: 17, item: 'Headphones', checked: false, category: 'Electronics', priority: 'low' }
  ])

  const [newItem, setNewItem] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Documents')
  const [selectedPriority, setSelectedPriority] = useState('medium')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTrip, setSelectedTrip] = useState('paris')

  const trips = [
    { id: 'paris', name: 'Paris Adventure', date: '2024-03-15' },
    { id: 'tokyo', name: 'Tokyo Explorer', date: '2024-05-20' },
    { id: 'bali', name: 'Bali Retreat', date: '2024-07-10' }
  ]

  const categories = [
    { id: 'Documents', name: 'Documents', icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { id: 'Clothing', name: 'Clothing', icon: Shirt, color: 'from-purple-500 to-pink-500' },
    { id: 'Toiletries', name: 'Toiletries', icon: Droplets, color: 'from-green-500 to-emerald-500' },
    { id: 'Electronics', name: 'Electronics', icon: Smartphone, color: 'from-orange-500 to-red-500' },
    { id: 'Medications', name: 'Medications', icon: Pill, color: 'from-indigo-500 to-purple-500' },
    { id: 'Other', name: 'Other', icon: Package, color: 'from-gray-500 to-gray-600' }
  ]

  const priorities = [
    { id: 'high', name: 'High', color: 'text-red-600 bg-red-50' },
    { id: 'medium', name: 'Medium', color: 'text-yellow-600 bg-yellow-50' },
    { id: 'low', name: 'Low', color: 'text-green-600 bg-green-50' }
  ]

  const toggleItem = (id) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const addItem = () => {
    if (newItem.trim()) {
      const newId = Math.max(...checklist.map(item => item.id)) + 1
      setChecklist(prev => [...prev, {
        id: newId,
        item: newItem,
        checked: false,
        category: selectedCategory,
        priority: selectedPriority
      }])
      setNewItem('')
    }
  }

  const deleteItem = (id) => {
    setChecklist(prev => prev.filter(item => item.id !== id))
  }

  const getFilteredItems = () => {
    let filtered = checklist
    
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return filtered
  }

  const groupedItems = getFilteredItems().reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  const completionPercentage = Math.round((checklist.filter(item => item.checked).length / checklist.length) * 100)
  const packedItems = checklist.filter(item => item.checked).length
  const totalItems = checklist.length

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.id === category)
    return categoryObj ? categoryObj.icon : Package
  }

  const getCategoryColor = (category) => {
    const categoryObj = categories.find(cat => cat.id === category)
    return categoryObj ? categoryObj.color : 'from-gray-500 to-gray-600'
  }

  const getPriorityColor = (priority) => {
    const priorityObj = priorities.find(p => p.id === priority)
    return priorityObj ? priorityObj.color : 'text-gray-600 bg-gray-50'
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Packing Checklist</h1>
          <p className="text-xl text-gray-600">Organize and track everything you need for your trip</p>
        </motion.div>

        {/* Trip Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            {trips.map((trip) => (
              <motion.button
                key={trip.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTrip(trip.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  selectedTrip === trip.id
                    ? 'bg-gradient-to-r from-sky-blue to-cyan text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {trip.name}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-sky-blue to-cyan rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <Luggage className="w-8 h-8" />
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-lg">
                Progress
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">{completionPercentage}%</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <span className="text-sm font-medium bg-green-100 text-green-600 px-2 py-1 rounded-lg">
                Packed
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{packedItems}</p>
            <div className="flex items-center text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              Items ready
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Circle className="w-8 h-8 text-orange-500" />
              <span className="text-sm font-medium bg-orange-100 text-orange-600 px-2 py-1 rounded-lg">
                Remaining
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{totalItems - packedItems}</p>
            <div className="flex items-center text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              To pack
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-purple-500" />
              <span className="text-sm font-medium bg-purple-100 text-purple-600 px-2 py-1 rounded-lg">
                Total
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{totalItems}</p>
            <div className="flex items-center text-sm text-gray-600">
              <Luggage className="w-4 h-4 mr-1" />
              All items
            </div>
          </motion.div>
        </div>

        {/* Search and Add Item */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
              />
            </div>

            {/* Add Item */}
            <div className="flex gap-3">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add new item..."
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
              >
                {priorities.map(priority => (
                  <option key={priority.id} value={priority.id}>{priority.name}</option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addItem}
                className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(groupedItems).map(([category, items], categoryIndex) => {
            const CategoryIcon = getCategoryIcon(category)
            const categoryColor = getCategoryColor(category)
            const categoryCompletion = Math.round((items.filter(item => item.checked).length / items.length) * 100)
            
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${categoryColor} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CategoryIcon className="w-8 h-8 mr-3" />
                      <h3 className="text-2xl font-bold">{category}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{categoryCompletion}%</p>
                      <p className="text-sm text-white/80">Complete</p>
                    </div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${categoryCompletion}%` }}
                    ></div>
                  </div>
                </div>

                {/* Items List */}
                <div className="p-6">
                  <div className="space-y-3">
                    {items.map((item, itemIndex) => {
                      const priorityColor = getPriorityColor(item.priority)
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 + itemIndex * 0.05 }}
                          className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                            item.checked 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              onClick={() => toggleItem(item.id)}
                              className="flex-shrink-0"
                            >
                              {item.checked ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              ) : (
                                <Circle className="w-6 h-6 text-gray-400" />
                              )}
                            </motion.button>
                            <div>
                              <span className={`font-semibold text-lg ${
                                item.checked ? 'text-gray-400 line-through' : 'text-gray-900'
                              }`}>
                                {item.item}
                              </span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${priorityColor}`}>
                                  {item.priority}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteItem(item.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {items.length === 0 && (
                    <div className="text-center py-8">
                      <CategoryIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No items in this category yet</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {getFilteredItems().length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Luggage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No items found</h3>
            <p className="text-gray-600 mb-8">Try adjusting your search or add new items</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center mx-auto"
            >
              Clear Search
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default PackingChecklist