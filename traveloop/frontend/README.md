# Traveloop Frontend

A modern, responsive travel planning application built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Trip Planning**: Create, manage, and organize travel itineraries
- **City & Activity Search**: Discover destinations and activities
- **Budget Management**: Track and manage travel expenses
- **Packing Checklists**: Organize travel essentials
- **Collaborative Planning**: Share trips with others
- **User Profiles**: Personalized travel experience
- **Admin Dashboard**: Administrative controls and analytics
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Routing**: React Router DOM 6.15.0
- **Styling**: Tailwind CSS 3.3.3
- **Animations**: Framer Motion 10.16.4
- **Icons**: Lucide React 0.263.1
- **Charts**: Recharts 2.8.0
- **HTTP Client**: Axios 1.5.0
- **Date Utilities**: date-fns 2.30.0

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── api/               # API utilities and configurations
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layout components
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CreateTrip.jsx
│   │   ├── MyTrips.jsx
│   │   ├── ItineraryBuilder.jsx
│   │   ├── ItineraryView.jsx
│   │   ├── CitySearch.jsx
│   │   ├── ActivitySearch.jsx
│   │   ├── Budget.jsx
│   │   ├── PackingChecklist.jsx
│   │   ├── SharedTrip.jsx
│   │   ├── Profile.jsx
│   │   ├── Notes.jsx
│   │   └── AdminDashboard.jsx
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd traveloop/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check for code issues

## 🚀 Deployment

### Vercel Deployment (Recommended for Frontend)

The frontend is optimized for deployment on Vercel:

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy from CLI**:
   ```bash
   cd traveloop/frontend
   vercel
   ```

3. **Deploy from Vercel Dashboard**:
   - Push your code to GitHub
   - Import the project in Vercel dashboard
   - Set root directory to `traveloop/frontend`
   - Configure environment variables:
     - `VITE_API_URL`: Your backend API URL (e.g., `https://your-backend.onrender.com/api`)
     - `VITE_NODE_ENV`: `production`
   - Click Deploy

4. **Environment Variables**:
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add `VITE_API_URL` with your backend URL
   - Add `VITE_NODE_ENV` set to `production`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to any static hosting service (Netlify, GitHub Pages, etc.)

### Backend Deployment

The backend should be deployed separately on a platform that supports Node.js and PostgreSQL:
- **Render**: Already configured with `render.yaml`
- **Railway**: Already configured with `railway.json`

See the [backend README](../backend/README.md) for detailed backend deployment instructions.

## 🎨 Design System

The application uses Tailwind CSS for styling with a modern, clean design aesthetic:

- **Color Scheme**: Blue and cyan gradient backgrounds
- **Typography**: Clean, readable fonts
- **Components**: Consistent, reusable UI components
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions using Framer Motion

## 🔧 Configuration

### Tailwind CSS

Configuration is available in `tailwind.config.js` for customizing themes, colors, and utilities.

### Vite

Build configuration is in `vite.config.js` for plugins, aliases, and optimization settings.

## 🌐 API Integration

The frontend communicates with a backend API through Axios. API configurations and utilities are located in the `src/api/` directory.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

This project is part of the Traveloop application. Please refer to the main project license.

## 🆘 Support

For issues and questions related to the frontend, please create an issue in the project repository.
