# Traveloop - Travel Planning Application

## Overview
Traveloop is a comprehensive travel planning application built with a modern web stack. The application provides a user-friendly interface for planning, organizing, and managing travel experiences.

## Technology Stack

### Frontend
- **Framework**: React
- **Build Tool**: Vite
- **Styling**: CSS
- **Language**: JavaScript/JSX

### Backend
- **Framework**: Python
- **Package Management**: pip (requirements.txt)

### DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose

## Application Structure

### Frontend Architecture (`/frontend`)
```
frontend/src/
├── components/          # Reusable UI components
│   ├── ActivityCard.jsx
│   ├── BudgetChart.jsx
│   ├── Chatbot/         # Chatbot functionality
│   ├── Loader.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── TripCard.jsx
├── pages/              # Application pages/routes
│   ├── ActivitySearch.jsx
│   ├── AdminDashboard.jsx
│   ├── Budget.jsx
│   ├── CitySearch.jsx
│   ├── CreateTrip.jsx
│   ├── Dashboard.jsx
│   ├── Home.jsx
│   ├── ItineraryBuilder.jsx
│   ├── ItineraryView.jsx
│   ├── Login.jsx
│   ├── MyTrips.jsx
│   ├── Notes.jsx
│   ├── PackingChecklist.jsx
│   ├── Profile.jsx
│   ├── SharedTrip.jsx
│   └── Signup.jsx
├── layouts/            # Layout components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── api/                # API integration layer
├── routes/             # Route definitions
├── utils/              # Utility functions
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

### Backend Architecture (`/backend`)
```
backend/
├── app/                # Main application logic
├── .env                # Environment variables
├── requirements.txt    # Python dependencies
└── run.py             # Application entry point
```

## Key Features & Pages

### User Authentication
- **Login Page** (`Login.jsx`) - User authentication
- **Signup Page** (`Signup.jsx`) - New user registration

### Main Navigation
- **Home Page** (`Home.jsx`) - Landing page and main navigation
- **Dashboard** (`Dashboard.jsx`) - User dashboard with overview

### Trip Management
- **Create Trip** (`CreateTrip.jsx`) - Create new travel plans
- **My Trips** (`MyTrips.jsx`) - View and manage personal trips
- **Shared Trip** (`SharedTrip.jsx`) - Collaborative trip planning
- **Itinerary Builder** (`ItineraryBuilder.jsx`) - Build detailed itineraries
- **Itinerary View** (`ItineraryView.jsx`) - View trip itineraries

### Planning Tools
- **Activity Search** (`ActivitySearch.jsx`) - Search for activities
- **City Search** (`CitySearch.jsx`) - Explore destinations
- **Budget** (`Budget.jsx`) - Budget planning and tracking
- **Notes** (`Notes.jsx`) - Travel notes and documentation
- **Packing Checklist** (`PackingChecklist.jsx`) - Packing organization

### User Features
- **Profile** (`Profile.jsx`) - User profile management
- **Admin Dashboard** (`AdminDashboard.jsx`) - Administrative interface

### UI Components
- **Navbar** - Navigation header
- **Sidebar** - Side navigation menu
- **Trip Cards** - Trip display cards
- **Activity Cards** - Activity display cards
- **Budget Charts** - Financial visualization
- **Chatbot** - Interactive assistance
- **Loader** - Loading states

## Development Setup

### Prerequisites
- Node.js and npm
- Python and pip
- Docker and Docker Compose

### Installation
1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### Running the Application

#### Development Mode
1. Start the backend server:
   ```bash
   cd backend
   python run.py
   ```
2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

#### Docker Mode
```bash
docker-compose up
```

## Application Flow
1. Users authenticate through Login/Signup pages
2. Navigate to Dashboard for overview
3. Create and manage trips through trip management pages
4. Use planning tools for detailed trip organization
5. Access profile and administrative features as needed

## Containerization
The application is fully containerized with:
- **Dockerfile** - Container configuration
- **docker-compose.yml** - Multi-container orchestration

## File Structure Summary
- **Frontend**: React-based single-page application
- **Backend**: Python API server
- **Components**: Modular, reusable UI elements
- **Pages**: Feature-specific application screens
- **Utilities**: Helper functions and shared logic