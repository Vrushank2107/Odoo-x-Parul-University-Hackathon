import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  ShoppingCart,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Calendar,
  PieChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

const Budget = () => {
  const [selectedTrip, setSelectedTrip] = useState('paris')
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    date: ''
  })

  const trips = [
    { id: 'paris', name: 'Paris Adventure', total: 5000 },
    { id: 'tokyo', name: 'Tokyo Explorer', total: 7000 },
    { id: 'bali', name: 'Bali Retreat', total: 3000 }
  ]

  const budgetData = {
    paris: {
      total: 5000,
      spent: 3247,
      categories: [
        { 
          name: 'Transportation', 
          budget: 1500, 
          spent: 1245, 
          icon: Plane,
          color: 'from-blue-500 to-cyan-500',
          expenses: [
            { date: '2024-03-15', description: 'Flight to Paris', amount: 850 },
            { date: '2024-03-16', description: 'Metro Pass', amount: 75 },
            { date: '2024-03-17', description: 'Taxi to Versailles', amount: 120 },
            { date: '2024-03-18', description: 'Airport Transfer', amount: 200 }
          ]
        },
        { 
          name: 'Accommodation', 
          budget: 2000, 
          spent: 1200, 
          icon: Hotel,
          color: 'from-purple-500 to-pink-500',
          expenses: [
            { date: '2024-03-15', description: 'Hotel Le Marais', amount: 800 },
            { date: '2024-03-17', description: 'Versailles Hotel', amount: 400 }
          ]
        },
        { 
          name: 'Food & Dining', 
          budget: 1000, 
          spent: 567, 
          icon: Utensils,
          color: 'from-orange-500 to-red-500',
          expenses: [
            { date: '2024-03-15', description: 'Café de Flore', amount: 85 },
            { date: '2024-03-16', description: 'Eiffel Tower Restaurant', amount: 120 },
            { date: '2024-03-17', description: 'Local Bistro', amount: 65 },
            { date: '2024-03-18', description: 'Dinner Cruise', amount: 145 },
            { date: '2024-03-19', description: 'Montmartre Dining', amount: 152 }
          ]
        },
        { 
          name: 'Activities', 
          budget: 500, 
          spent: 235, 
          icon: Camera,
          color: 'from-green-500 to-emerald-500',
          expenses: [
            { date: '2024-03-16', description: 'Louvre Museum', amount: 95 },
            { date: '2024-03-17', description: 'Versailles Palace', amount: 140 }
          ]
        }
      ]
    },
    tokyo: {
      total: 7000,
      spent: 4250,
      categories: [
        { name: 'Transportation', budget: 2000, spent: 1800, icon: Plane, color: 'from-blue-500 to-cyan-500' },
        { name: 'Accommodation', budget: 2500, spent: 1500, icon: Hotel, color: 'from-purple-500 to-pink-500' },
        { name: 'Food & Dining', budget: 1500, spent: 650, icon: Utensils, color: 'from-orange-500 to-red-500' },
        { name: 'Activities', budget: 1000, spent: 300, icon: Camera, color: 'from-green-500 to-emerald-500' }
      ]
    },
    bali: {
      total: 3000,
      spent: 1850,
      categories: [
        { name: 'Transportation', budget: 800, spent: 750, icon: Plane, color: 'from-blue-500 to-cyan-500' },
        { name: 'Accommodation', budget: 1200, spent: 600, icon: Hotel, color: 'from-purple-500 to-pink-500' },
        { name: 'Food & Dining', budget: 600, spent: 350, icon: Utensils, color: 'from-orange-500 to-red-500' },
        { name: 'Activities', budget: 400, spent: 150, icon: Camera, color: 'from-green-500 to-emerald-500' }
      ]
    }
  }

  const currentBudget = budgetData[selectedTrip]
  const remaining = currentBudget.total - currentBudget.spent
  const spentPercentage = (currentBudget.spent / currentBudget.total) * 100

  const getCategoryIcon = (category) => {
    const categoryData = currentBudget.categories.find(cat => cat.name === category)
    return categoryData ? categoryData.icon : CreditCard
  }

  const addExpense = () => {
    if (newExpense.category && newExpense.amount && newExpense.description && newExpense.date) {
      // Add expense logic here
      console.log('Adding expense:', newExpense)
      setNewExpense({ category: '', amount: '', description: '', date: '' })
      setShowAddExpense(false)
    }
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Budget Tracker</h1>
          <p className="text-xl text-gray-600">Manage your travel expenses and stay within budget</p>
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
                {trip.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Budget Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-sky-blue to-cyan rounded-2xl p-6 text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8" />
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-lg">
                Total Budget
              </span>
            </div>
            <p className="text-3xl font-bold mb-2">₹{currentBudget.total}</p>
            <div className="flex items-center text-sm text-white/80">
              <Calendar className="w-4 h-4 mr-1" />
              7 days remaining
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingDown className="w-8 h-8 text-red-500" />
              <span className="text-sm font-medium bg-red-100 text-red-600 px-2 py-1 rounded-lg">
                Spent
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">${currentBudget.spent}</p>
            <div className="flex items-center text-sm text-gray-600">
              <ArrowUp className="w-4 h-4 mr-1 text-red-500" />
              +12% from last week
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-sm font-medium bg-green-100 text-green-600 px-2 py-1 rounded-lg">
                Remaining
              </span>
            </div>
            <p className={`text-3xl font-bold mb-2 ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remaining}
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <ArrowDown className="w-4 h-4 mr-1 text-green-500" />
              {remaining >= 0 ? 'On track' : 'Over budget'}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <PieChart className="w-8 h-8 text-purple-500" />
              <span className="text-sm font-medium bg-purple-100 text-purple-600 px-2 py-1 rounded-lg">
                Progress
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">{spentPercentage.toFixed(1)}%</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  spentPercentage > 90 ? 'bg-red-500' : 
                  spentPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(spentPercentage, 100)}%` }}
              ></div>
            </div>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {currentBudget.categories.map((category, index) => {
            const Icon = category.icon
            const categoryPercentage = (category.spent / category.budget) * 100
            const categoryRemaining = category.budget - category.spent
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-600">${category.spent} of ${category.budget}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      categoryRemaining >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${categoryRemaining}
                    </p>
                    <p className="text-sm text-gray-600">remaining</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-500">{categoryPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        categoryPercentage > 90 ? 'bg-red-500' : 
                        categoryPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(categoryPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {categoryPercentage > 80 && (
                  <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-800">
                      Almost at budget limit for {category.name}
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-2 bg-sky-blue text-white rounded-xl font-semibold hover:bg-sky-blue/90 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Expense
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl"
                  >
                    <Edit className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Recent Expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Expenses</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddExpense(true)}
              className="px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </motion.button>
          </div>

          <div className="space-y-4">
            {currentBudget.categories.flatMap(category => 
              category.expenses ? category.expenses.map(expense => ({
                ...expense,
                category: category.name,
                icon: category.icon,
                color: category.color
              })) : []
            ).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 8).map((expense, index) => {
              const Icon = expense.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-10 bg-gradient-to-r ${expense.color} rounded-lg flex items-center justify-center mr-4`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{expense.description}</p>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-3">{expense.category}</span>
                        <Calendar className="w-3 h-3 mr-1" />
                        {expense.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">${expense.amount}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddExpense(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Expense</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                  >
                    <option value="">Select category</option>
                    {currentBudget.categories.map((cat, idx) => (
                      <option key={idx} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount ($)</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="0.00"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="What was this expense for?"
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addExpense}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg"
                >
                  Add Expense
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Budget