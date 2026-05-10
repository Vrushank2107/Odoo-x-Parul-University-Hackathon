import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'

// Layouts
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './layouts/DashboardLayout'

// Pages
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CreateTrip from './pages/CreateTrip'
import MyTrips from './pages/MyTrips'
import ItineraryBuilder from './pages/ItineraryBuilder'
import ItineraryView from './pages/ItineraryView'
import CitySearch from './pages/CitySearch'
import ActivitySearch from './pages/ActivitySearch'
import Budget from './pages/Budget'
import PackingChecklist from './pages/PackingChecklist'
import SharedTrip from './pages/SharedTrip'
import Profile from './pages/Profile'
import Notes from './pages/Notes'
import AdminDashboard from './pages/AdminDashboard'

// Components
import Loader from './components/Loader'

function App() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50"
    >
      <Routes>
        {/* All Routes - No Authentication Required */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="shared/:tripId" element={<SharedTrip />} />
        </Route>

        {/* Dashboard Routes - Now Public */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="create-trip" element={<CreateTrip />} />
          <Route path="my-trips" element={<MyTrips />} />
          <Route path="itinerary-builder/:tripId" element={<ItineraryBuilder />} />
          <Route path="itinerary-view/:tripId" element={<ItineraryView />} />
          <Route path="city-search" element={<CitySearch />} />
          <Route path="activity-search" element={<ActivitySearch />} />
          <Route path="budget/:tripId" element={<Budget />} />
          <Route path="packing/:tripId" element={<PackingChecklist />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notes/:tripId" element={<Notes />} />
          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </motion.div>
  )
}

export default App