import React from 'react'
import { motion } from 'framer-motion'
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts'
import { TrendingUp, TrendingDown } from 'lucide-react'

const BudgetChart = ({ 
  data, 
  type = 'pie', 
  title, 
  total, 
  spent, 
  remaining 
}) => {
  const COLORS = [
    '#0ea5e9', // sky-blue
    '#06b6d4', // cyan
    '#6366f1', // indigo
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#f43f5e', // red
    '#f97316', // orange
    '#eab308', // yellow
  ]

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const pieChartData = data?.map(item => ({
    name: item.category,
    value: item.amount
  })) || []

  const barChartData = data?.map(item => ({
    name: item.category,
    budget: item.budget,
    spent: item.spent
  })) || []

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          tick={{ fill: '#6b7280', fontSize: 12 }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar dataKey="budget" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
        <Bar dataKey="spent" fill="#06b6d4" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )

  const getPercentageSpent = () => {
    if (!total || !spent) return 0
    return Math.round((spent / total) * 100)
  }

  const isOverBudget = () => {
    return spent > total
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{title}</h3>
          {total && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">Total Budget</span>
              </div>
              <span className="text-lg font-bold text-gray-900">₹{total}</span>
            </div>
          )}
        </div>
        
        {spent && total && (
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
            isOverBudget() 
              ? 'bg-red-100 text-red-700' 
              : 'bg-green-100 text-green-700'
          }`}>
            {isOverBudget() ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-semibold">
              {getPercentageSpent()}% spent
            </span>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="mb-6">
        {type === 'pie' ? renderPieChart() : renderBarChart()}
      </div>

      {/* Summary */}
      {total && (
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Spent</p>
            <p className="text-xl font-bold text-sky-blue">${spent || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Remaining</p>
            <p className="text-xl font-bold text-green-600">
              ${Math.max(0, (total - spent) || 0)}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default BudgetChart