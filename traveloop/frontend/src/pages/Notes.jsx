import React, { useState } from 'react'

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Restaurant Recommendations',
      content: 'Le Jules Verne - Eiffel Tower restaurant with amazing views\nL\'As du Fallafel - Best falafel in Marais district\nBouillon Pigalle - Affordable French cuisine',
      category: 'Food',
      date: '2024-03-10',
      trip: 'Paris Adventure 2024'
    },
    {
      id: 2,
      title: 'Packing Tips',
      content: 'Bring comfortable walking shoes\nPack light layers for unpredictable weather\nDon\'t forget universal power adapter\nKeep important documents in carry-on',
      category: 'Travel Tips',
      date: '2024-03-08',
      trip: 'General'
    },
    {
      id: 3,
      title: 'Emergency Contacts',
      content: 'Hotel: +33 1 42 72 72 72\nEmergency: 112 (EU universal)\nUS Embassy: +33 1 43 12 22 22\nTravel Insurance: 1-800-555-0199',
      category: 'Important',
      date: '2024-03-05',
      trip: 'Paris Adventure 2024'
    }
  ])

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'General',
    trip: 'General'
  })

  const [isCreating, setIsCreating] = useState(false)

  const categories = ['General', 'Food', 'Travel Tips', 'Important', 'Accommodation', 'Transportation']
  const trips = ['General', 'Paris Adventure 2024', 'Tokyo Explorer', 'NYC Weekend']

  const createNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: Math.max(...notes.map(n => n.id)) + 1,
        ...newNote,
        date: new Date().toISOString().split('T')[0]
      }
      setNotes([note, ...notes])
      setNewNote({ title: '', content: '', category: 'General', trip: 'General' })
      setIsCreating(false)
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.trip]) {
      acc[note.trip] = []
    }
    acc[note.trip].push(note)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Travel Notes</h1>
          <button
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 flex items-center"
          >
            Add New Note
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        {isCreating && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Note</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Note title"
                  value={newNote.title}
                  onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select
                  value={newNote.trip}
                  onChange={(e) => setNewNote(prev => ({ ...prev, trip: e.target.value }))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {trips.map(trip => (
                    <option key={trip} value={trip}>{trip}</option>
                  ))}
                </select>
              </div>
              
              <select
                value={newNote.category}
                onChange={(e) => setNewNote(prev => ({ ...prev, category: e.target.value }))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <textarea
                placeholder="Write your note here..."
                value={newNote.content}
                onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <div className="flex gap-4">
                <button
                  onClick={createNote}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center"
                >
                  Save Note
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false)
                    setNewNote({ title: '', content: '', category: 'General', trip: 'General' })
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 flex items-center justify-center"
                >
                  Cancel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {Object.entries(groupedNotes).map(([trip, tripNotes]) => (
            <div key={trip}>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{trip}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripNotes.map(note => (
                  <div key={note.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <span className="px-2 py-1 text-xs font-medium text-blue-100 bg-blue-800 rounded-full">
                        {note.category}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium text-gray-100 bg-gray-600 rounded-full">
                        {note.date}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 whitespace-pre-line">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
            <p className="text-gray-500 mb-4">Start by creating your first travel note</p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              Create Note
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Notes