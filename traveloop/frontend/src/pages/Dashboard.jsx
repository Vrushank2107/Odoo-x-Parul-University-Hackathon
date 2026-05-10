import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalTrips: 0,
    upcomingTrips: 0,
    completedTrips: 0,
    totalBudget: 0
  });
  const [recentTrips, setRecentTrips] = useState([]);

  useEffect(() => {
    // TODO: Fetch user data and stats from API
    // For now, using mock data
    setUser({ name: 'John Doe', email: 'john@example.com' });
    setStats({
      totalTrips: 5,
      upcomingTrips: 2,
      completedTrips: 3,
      totalBudget: 2500
    });
    setRecentTrips([
      { id: 1, name: 'Paris Adventure', destination: 'Paris, France', startDate: '2024-06-15', status: 'upcoming' },
      { id: 2, name: 'Tokyo Explorer', destination: 'Tokyo, Japan', startDate: '2024-08-20', status: 'planning' },
      { id: 3, name: 'Bali Retreat', destination: 'Bali, Indonesia', startDate: '2024-03-10', status: 'completed' }
    ]);
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  const TripCard = ({ trip }) => (
    <div className="trip-card">
      <h4>{trip.name}</h4>
      <p className="destination">{trip.destination}</p>
      <p className="date">{new Date(trip.startDate).toLocaleDateString()}</p>
      <span className={`status ${trip.status}`}>{trip.status}</span>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Traveler'}!</h1>
        <p>Ready to plan your next adventure?</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Trips"
          value={stats.totalTrips}
          icon="🗺️"
          color="blue"
        />
        <StatCard
          title="Upcoming Trips"
          value={stats.upcomingTrips}
          icon="📅"
          color="green"
        />
        <StatCard
          title="Completed Trips"
          value={stats.completedTrips}
          icon="✅"
          color="purple"
        />
        <StatCard
          title="Total Budget"
          value={`$${stats.totalBudget}`}
          icon="💰"
          color="orange"
        />
      </div>

      <div className="dashboard-content">
        <div className="recent-trips">
          <div className="section-header">
            <h2>Recent Trips</h2>
            <Link to="/my-trips" className="view-all">View All</Link>
          </div>
          <div className="trips-grid">
            {recentTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/create-trip" className="action-card">
              <div className="action-icon">➕</div>
              <h3>Create New Trip</h3>
              <p>Plan your next adventure</p>
            </Link>
            <Link to="/city-search" className="action-card">
              <div className="action-icon">🔍</div>
              <h3>Explore Cities</h3>
              <p>Discover new destinations</p>
            </Link>
            <Link to="/activity-search" className="action-card">
              <div className="action-icon">🎯</div>
              <h3>Find Activities</h3>
              <p>Book experiences and tours</p>
            </Link>
            <Link to="/budget" className="action-card">
              <div className="action-icon">📊</div>
              <h3>Manage Budget</h3>
              <p>Track your travel expenses</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;