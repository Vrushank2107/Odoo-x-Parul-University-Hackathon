import React, { useState } from 'react'

const PackingChecklist = () => {
  const [checklist, setChecklist] = useState([
    { id: 1, item: 'Passport', checked: true, category: 'Documents' },
    { id: 2, item: 'Visa (if required)', checked: false, category: 'Documents' },
    { id: 3, item: 'Travel insurance', checked: true, category: 'Documents' },
    { id: 4, item: 'Flight tickets', checked: true, category: 'Documents' },
    { id: 5, item: 'Hotel reservations', checked: true, category: 'Documents' },
    { id: 6, item: 'Clothing (7 days)', checked: false, category: 'Clothing' },
    { id: 7, item: 'Underwear', checked: false, category: 'Clothing' },
    { id: 8, item: 'Shoes (2 pairs)', checked: false, category: 'Clothing' },
    { id: 9, item: 'Jacket', checked: true, category: 'Clothing' },
    { id: 10, item: 'Toothbrush', checked: false, category: 'Toiletries' },
    { id: 11, item: 'Toothpaste', checked: false, category: 'Toiletries' },
    { id: 12, item: 'Shampoo', checked: false, category: 'Toiletries' },
    { id: 13, item: 'Sunscreen', checked: true, category: 'Toiletries' },
    { id: 14, item: 'Phone charger', checked: false, category: 'Electronics' },
    { id: 15, item: 'Power bank', checked: false, category: 'Electronics' },
    { id: 16, item: 'Camera', checked: true, category: 'Electronics' },
    { id: 17, item: 'Headphones', checked: false, category: 'Electronics' }
  ])

  const [newItem, setNewItem] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Documents')

  const categories = ['Documents', 'Clothing', 'Toiletries', 'Electronics', 'Medications', 'Other']

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
        category: selectedCategory
      }])
      setNewItem('')
    }
  }

  const deleteItem = (id) => {
    setChecklist(prev => prev.filter(item => item.id !== id))
  }

  const groupedItems = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  const completionPercentage = Math.round((checklist.filter(item => item.checked).length / checklist.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Packing Checklist</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Progress</h2>
            <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {checklist.filter(item => item.checked).length} of {checklist.length} items packed
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Item</h3>
          <div className="flex gap-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              onClick={addItem}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Item
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{category}</h3>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(item.id)}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className={`font-medium ${item.checked ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                        {item.item}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PackingChecklist