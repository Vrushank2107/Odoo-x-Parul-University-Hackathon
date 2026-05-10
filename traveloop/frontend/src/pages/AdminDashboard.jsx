import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  TrendingUp, 
  Calendar,
  Settings,
  Shield,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  UserPlus,
  UserCheck,
  UserX,
  Globe,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  X,
  Bell,
  LogOut,
  Menu
} from 'lucide-react'

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')

  const periods = [
    { id: '24h', name: 'Last 24 hours' },
    { id: '7d', name: 'Last 7 days' },
    { id: '30d', name: 'Last 30 days' },
    { id: '90d', name: 'Last 90 days' }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'trips', name: 'Trips', icon: Globe },
    { id: 'analytics', name: 'Analytics', icon: PieChart },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  const stats = {
    overview: [
      {
        title: 'Total Users',
        value: '12,847',
        change: '+12.5%',
        trend: 'up',
        icon: Users,
        color: 'from-blue-500 to-cyan-500'
      },
      {
        title: 'Active Trips',
        value: '3,426',
        change: '+8.2%',
        trend: 'up',
        icon: Globe,
        color: 'from-green-500 to-emerald-500'
      },
      {
        title: 'Revenue',
        value: '₹2,36,04,536',
        change: '+23.1%',
        trend: 'up',
        icon: TrendingUp,
        color: 'from-purple-500 to-pink-500'
      },
      {
        title: 'Bookings Today',
        value: '142',
        change: '-5.3%',
        trend: 'down',
        icon: Calendar,
        color: 'from-orange-500 to-red-500'
      }
    ]
  }

  const recentUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', status: 'active', joinDate: '2024-03-15', lastActive: '2024-03-20' },
    { id: 2, name: 'Mike Chen', email: 'mike.chen@example.com', status: 'active', joinDate: '2024-03-14', lastActive: '2024-03-19' },
    { id: 3, name: 'Emma Wilson', email: 'emma.w@example.com', status: 'inactive', joinDate: '2024-03-10', lastActive: '2024-03-16' },
    { id: 4, name: 'Alex Kumar', email: 'alex.k@example.com', status: 'active', joinDate: '2024-03-12', lastActive: '2024-03-20' }
  ]

  const recentTrips = [
    { id: 1, title: 'Paris Adventure', user: 'Sarah Johnson', date: '2024-03-20', status: 'confirmed', budget: '₹4,16,500' },
    { id: 2, title: 'Tokyo Explorer', user: 'Mike Chen', date: '2024-03-19', status: 'pending', budget: '₹5,83,100' },
    { id: 3, title: 'Bali Retreat', user: 'Emma Wilson', date: '2024-03-18', status: 'confirmed', budget: '₹2,49,900' },
    { id: 4, title: 'NYC Weekend', user: 'Alex Kumar', date: '2024-03-17', status: 'cancelled', budget: '₹2,08,250' }
  ]

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Database backup failed', time: '2 hours ago', severity: 'medium' },
    { id: 2, type: 'error', message: 'Payment gateway timeout', time: '4 hours ago', severity: 'high' },
    { id: 3, type: 'info', message: 'System update completed', time: '6 hours ago', severity: 'low' },
    { id: 4, type: 'warning', message: 'High server load detected', time: '8 hours ago', severity: 'medium' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'confirmed': return 'text-blue-600 bg-blue-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return AlertTriangle
      case 'warning': return AlertTriangle
      case 'info': return CheckCircle
      default: return Bell
    }
  }

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-xl text-gray-600">Manage your travel platform efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white rounded-xl shadow hover:shadow-lg"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white rounded-xl shadow hover:shadow-lg"
              >
                <Bell className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-2 bg-white rounded-xl shadow p-2">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedTab === tab.id
                      ? 'bg-gradient-to-r from-sky-blue to-cyan text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.overview.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className={`flex items-center text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <TrendingUp className={`w-4 h-4 mr-1 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                        {stat.change}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                    <p className="text-gray-600">{stat.title}</p>
                  </motion.div>
                )
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Users */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sky-blue hover:text-sky-blue/80"
                  >
                    View All
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {recentUsers.map((user, index) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">Joined {user.joinDate}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Trips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Recent Trips</h2>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-sky-blue hover:text-sky-blue/80"
                  >
                    View All
                  </motion.button>
                </div>
                <div className="space-y-4">
                  {recentTrips.map((trip, index) => (
                    <motion.div
                      key={trip.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{trip.title}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Users className="w-3 h-3" />
                          <span>{trip.user}</span>
                          <Calendar className="w-3 h-3" />
                          <span>{trip.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(trip.status)}`}>
                          {trip.status}
                        </span>
                        <p className="text-sm text-gray-900 mt-1 font-medium">{trip.budget}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* System Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">System Alerts</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sky-blue hover:text-sky-blue/80"
                >
                  View All
                </motion.button>
              </div>
              <div className="space-y-4">
                {systemAlerts.map((alert, index) => {
                  const Icon = getAlertIcon(alert.type)
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 ${getAlertColor(alert.severity)}`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold">{alert.message}</p>
                        <p className="text-sm opacity-75">{alert.time}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 hover:bg-white/20 rounded-lg"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}

        {/* Users Tab */}
        {selectedTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add User
                </motion.button>
              </div>
            </div>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600 mb-6">Manage users, roles, and permissions</p>
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg"
                >
                  <UserCheck className="w-5 h-5 mr-2" />
                  Approve Users
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300"
                >
                  <UserX className="w-5 h-5 mr-2" />
                  Suspend Users
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Trips Tab */}
        {selectedTab === 'trips' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Trip Management</h2>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Create Trip
                </motion.button>
              </div>
            </div>
            <div className="text-center py-12">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Trip Management</h3>
              <p className="text-gray-600 mb-6">View and manage all trip bookings and itineraries</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-gray-900">3,426</p>
                  <p className="text-gray-600">Total Trips</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-green-600">2,891</p>
                  <p className="text-gray-600">Confirmed</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold text-yellow-600">387</p>
                  <p className="text-gray-600">Pending</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {selectedTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <div className="flex gap-3">
                <select className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-blue focus:border-sky-blue">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last year</option>
                </select>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 flex items-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </motion.button>
              </div>
            </div>
            <div className="text-center py-12">
              <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics & Reports</h3>
              <p className="text-gray-600 mb-6">View detailed analytics and generate reports</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <BarChart3 className="w-8 h-8 text-sky-blue mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">Revenue Analytics</h4>
                  <p className="text-gray-600">Track revenue trends and growth</p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <Activity className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h4 className="font-bold text-gray-900 mb-1">User Activity</h4>
                  <p className="text-gray-600">Monitor user engagement metrics</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {selectedTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-sky-blue to-cyan text-white rounded-xl font-semibold hover:shadow-lg flex items-center"
              >
                <Shield className="w-4 h-4 mr-2" />
                Save Settings
              </motion.button>
            </div>
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">System Configuration</h3>
              <p className="text-gray-600 mb-6">Configure system settings and preferences</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="text-left p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3">General Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Email Notifications</span>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Maintenance Mode</span>
                      <input type="checkbox" className="w-4 h-4" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Debug Mode</span>
                      <input type="checkbox" className="w-4 h-4" />
                    </label>
                  </div>
                </div>
                <div className="text-left p-6 bg-gray-50 rounded-xl">
                  <h4 className="font-bold text-gray-900 mb-3">Security Settings</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Two-Factor Auth</span>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Session Timeout</span>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">API Rate Limiting</span>
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard