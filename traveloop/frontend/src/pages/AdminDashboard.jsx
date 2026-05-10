import React from 'react'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
            <p className="text-gray-600">Manage users, roles, and permissions</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Trip Analytics</h2>
            <p className="text-gray-600">View trip statistics and analytics</p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">System Settings</h2>
            <p className="text-gray-600">Configure system settings and preferences</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard