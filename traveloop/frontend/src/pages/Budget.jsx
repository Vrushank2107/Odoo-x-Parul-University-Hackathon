import React, { useState } from 'react'

const Budget = () => {
  const [budget, setBudget] = useState({
    total: 5000,
    spent: 1200,
    categories: [
      { name: 'Transportation', budget: 1500, spent: 800 },
      { name: 'Accommodation', budget: 2000, spent: 300 },
      { name: 'Food', budget: 1000, spent: 100 },
      { name: 'Activities', budget: 500, spent: 0 }
    ]
  })

  const remaining = budget.total - budget.spent

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Trip Budget</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Total Budget</h3>
            <p className="text-2xl font-bold text-gray-900">${budget.total}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Spent</h3>
            <p className="text-2xl font-bold text-red-600">${budget.spent}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500">Remaining</h3>
            <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${remaining}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Budget by Category</h2>
            
            <div className="space-y-4">
              {budget.categories.map((category, index) => {
                const percentage = (category.spent / category.budget) * 100
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      <span className="text-sm text-gray-500">
                        ${category.spent} / ${category.budget}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          percentage > 90 ? 'bg-red-600' : 
                          percentage > 70 ? 'bg-yellow-600' : 'bg-green-600'
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Budget