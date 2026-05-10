import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  FileText,
  Calendar,
  Tag,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Image,
  Code,
  X,
  ChevronDown,
  Star,
  Clock,
  Archive,
  Pin
} from 'lucide-react'

const Notes = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Restaurant Recommendations',
      content: '<p><strong>Le Jules Verne</strong> - Eiffel Tower restaurant with amazing views</p><p><strong>L\'As du Fallafel</strong> - Best falafel in Marais district</p><p><strong>Bouillon Pigalle</strong> - Affordable French cuisine</p>',
      category: 'Food',
      date: '2024-03-10',
      trip: 'Paris Adventure 2024',
      isPinned: true,
      isFavorite: true
    },
    {
      id: 2,
      title: 'Packing Tips',
      content: '<ul><li>Bring comfortable walking shoes</li><li>Pack light layers for unpredictable weather</li><li>Don\'t forget universal power adapter</li><li>Keep important documents in carry-on</li></ul>',
      category: 'Travel Tips',
      date: '2024-03-08',
      trip: 'General',
      isPinned: false,
      isFavorite: false
    },
    {
      id: 3,
      title: 'Emergency Contacts',
      content: '<p><strong>Hotel:</strong> +33 1 42 72 72 72</p><p><strong>Emergency:</strong> 112 (EU universal)</p><p><strong>US Embassy:</strong> +33 1 43 12 22 22</p><p><strong>Travel Insurance:</strong> 1-800-555-0199</p>',
      category: 'Important',
      date: '2024-03-05',
      trip: 'Paris Adventure 2024',
      isPinned: true,
      isFavorite: false
    }
  ])

  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'General',
    trip: 'General',
    isPinned: false,
    isFavorite: false
  })

  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTrip, setSelectedTrip] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isList, setIsList] = useState(false)

  const categories = [
    { id: 'General', name: 'General', icon: FileText, color: 'from-gray-500 to-gray-600' },
    { id: 'Food', name: 'Food', icon: Star, color: 'from-orange-500 to-red-500' },
    { id: 'Travel Tips', name: 'Travel Tips', icon: Pin, color: 'from-blue-500 to-cyan-500' },
    { id: 'Important', name: 'Important', icon: Archive, color: 'from-red-500 to-pink-500' },
    { id: 'Accommodation', name: 'Accommodation', icon: Calendar, color: 'from-purple-500 to-indigo-500' },
    { id: 'Transportation', name: 'Transportation', icon: Clock, color: 'from-green-500 to-emerald-500' }
  ]

  const trips = [
    { id: 'all', name: 'All Trips' },
    { id: 'General', name: 'General Notes' },
    { id: 'Paris Adventure 2024', name: 'Paris Adventure 2024' },
    { id: 'Tokyo Explorer', name: 'Tokyo Explorer' },
    { id: 'NYC Weekend', name: 'NYC Weekend' }
  ]

  const createNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: Math.max(...notes.map(n => n.id)) + 1,
        ...newNote,
        date: new Date().toISOString().split('T')[0]
      }
      setNotes([note, ...notes])
      setNewNote({ title: '', content: '', category: 'General', trip: 'General', isPinned: false, isFavorite: false })
      setIsCreating(false)
    }
  }

  const updateNote = () => {
    if (editingNote && editingNote.title.trim() && editingNote.content.trim()) {
      setNotes(notes.map(note => 
        note.id === editingNote.id ? editingNote : note
      ))
      setEditingNote(null)
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const togglePin = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ))
  }

  const toggleFavorite = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
    ))
  }

  const getFilteredNotes = () => {
    let filtered = notes

    if (searchQuery) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(note => note.category === selectedCategory)
    }

    if (selectedTrip !== 'all') {
      filtered = filtered.filter(note => note.trip === selectedTrip)
    }

    return filtered.sort((a, b) => {
      // Pinned notes first
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      // Then by date
      return new Date(b.date) - new Date(a.date)
    })
  }

  const formatText = (text) => {
    let formatted = text
    if (isBold) formatted = `<strong>${formatted}</strong>`
    if (isItalic) formatted = `<em>${formatted}</em>`
    if (isUnderline) formatted = `<u>${formatted}</u>`
    return formatted
  }

  const insertText = (before, after) => {
    const textarea = document.getElementById('note-content')
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const text = textarea.value
      const beforeText = text.substring(0, start)
      const selectedText = text.substring(start, end)
      const afterText = text.substring(end)
      
      const newText = beforeText + before + selectedText + after + afterText
      setNewNote(prev => ({ ...prev, content: newText }))
      
      // Reset cursor position after React re-render
      setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length + selectedText.length, start + before.length + selectedText.length)
      }, 0)
    }
  }

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(cat => cat.id === category)
    return categoryObj ? categoryObj.icon : FileText
  }

  const getCategoryColor = (category) => {
    const categoryObj = categories.find(cat => cat.id === category)
    return categoryObj ? categoryObj.color : 'from-gray-500 to-gray-600'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">Travel Notes</h1>
            <p className="text-xl text-gray-600">Capture your travel memories and important information</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCreating(true)}
            className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Note
          </motion.button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
              />
            </div>
            
            <select
              value={selectedTrip}
              onChange={(e) => setSelectedTrip(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
            >
              {trips.map(trip => (
                <option key={trip.id} value={trip.id}>{trip.name}</option>
              ))}
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Create/Edit Note Modal */}
        {(isCreating || editingNote) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => {
              setIsCreating(false)
              setEditingNote(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {editingNote ? 'Edit Note' : 'Create New Note'}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsCreating(false)
                      setEditingNote(null)
                    }}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      placeholder="Note title"
                      value={editingNote ? editingNote.title : newNote.title}
                      onChange={(e) => editingNote 
                        ? setEditingNote(prev => ({ ...prev, title: e.target.value }))
                        : setNewNote(prev => ({ ...prev, title: e.target.value }))
                      }
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                    />
                    <select
                      value={editingNote ? editingNote.trip : newNote.trip}
                      onChange={(e) => editingNote
                        ? setEditingNote(prev => ({ ...prev, trip: e.target.value }))
                        : setNewNote(prev => ({ ...prev, trip: e.target.value }))
                      }
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                    >
                      {trips.map(trip => (
                        <option key={trip.id} value={trip.id}>{trip.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <select
                    value={editingNote ? editingNote.category : newNote.category}
                    onChange={(e) => editingNote
                      ? setEditingNote(prev => ({ ...prev, category: e.target.value }))
                      : setNewNote(prev => ({ ...prev, category: e.target.value }))
                    }
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>

                  {/* Rich Text Editor */}
                  <div className="border-2 border-gray-200 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-1 p-3 bg-gray-50 border-b border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsBold(!isBold)}
                        className={`p-2 rounded ${isBold ? 'bg-sky-blue text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                      >
                        <Bold className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsItalic(!isItalic)}
                        className={`p-2 rounded ${isItalic ? 'bg-sky-blue text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                      >
                        <Italic className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsUnderline(!isUnderline)}
                        className={`p-2 rounded ${isUnderline ? 'bg-sky-blue text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                      >
                        <Underline className="w-4 h-4" />
                      </motion.button>
                      <div className="w-px h-6 bg-gray-300" />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => insertText('<ul><li>', '</li></ul>')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      >
                        <List className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => insertText('<ol><li>', '</li></ol>')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      >
                        <ListOrdered className="w-4 h-4" />
                      </motion.button>
                      <div className="w-px h-6 bg-gray-300" />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => insertText('<a href="">', '</a>')}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      >
                        <Link className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      >
                        <Image className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-600 hover:bg-gray-200 rounded"
                      >
                        <Code className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <textarea
                      id="note-content"
                      placeholder="Write your note here..."
                      value={editingNote ? editingNote.content.replace(/<[^>]*>/g, '') : newNote.content}
                      onChange={(e) => editingNote
                        ? setEditingNote(prev => ({ ...prev, content: formatText(e.target.value) }))
                        : setNewNote(prev => ({ ...prev, content: formatText(e.target.value) }))
                      }
                      rows={8}
                      className="w-full px-4 py-3 focus:outline-none resize-none"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={editingNote ? updateNote : createNote}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg"
                    >
                      {editingNote ? 'Update Note' : 'Save Note'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsCreating(false)
                        setEditingNote(null)
                        setNewNote({ title: '', content: '', category: 'General', trip: 'General' })
                      }}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredNotes().map((note, index) => {
            const CategoryIcon = getCategoryIcon(note.category)
            const categoryColor = getCategoryColor(note.category)
            
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
              >
                <div className={`h-2 bg-gradient-to-r ${categoryColor}`} />
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      {note.isPinned && (
                        <Pin className="w-4 h-4 text-red-500 fill-current" />
                      )}
                      {note.isFavorite && (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditingNote(note)}
                        className="p-2 text-gray-600 hover:text-sky-blue hover:bg-sky-blue/10 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteNote(note.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{note.title}</h3>
                  
                  <div className="flex gap-2 mb-4">
                    <span className={`px-3 py-1 text-xs font-medium text-white bg-gradient-to-r ${categoryColor} rounded-full flex items-center`}>
                      <CategoryIcon className="w-3 h-3 mr-1" />
                      {note.category}
                    </span>
                    <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {note.date}
                    </span>
                    {note.trip !== 'General' && (
                      <span className="px-3 py-1 text-xs font-medium text-sky-blue bg-sky-blue/10 rounded-full">
                        {note.trip}
                      </span>
                    )}
                  </div>
                  
                  <div 
                    className="text-gray-600 text-sm line-clamp-4 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: note.content }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {getFilteredNotes().length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No notes found</h3>
            <p className="text-gray-600 mb-8">Start by creating your first travel note</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Note
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Notes