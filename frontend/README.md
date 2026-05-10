# Traveloop

A comprehensive travel planning application built with a modern full-stack architecture. Traveloop helps users plan, organize, and share their travel experiences with powerful features for itinerary management, budget tracking, packing lists, and collaborative planning.

## 🚀 Features

### Core Functionality
- **Trip Planning**: Create, manage, and organize complete travel itineraries
- **Itinerary Management**: Add stops, activities, and timeline planning with drag-and-drop reordering
- **Budget Tracking**: Real-time budget calculations, expense tracking, and spending insights
- **Packing Checklists**: Smart packing suggestions with progress tracking
- **Trip Notes**: Rich text notes with sharing capabilities
- **Collaborative Planning**: Share trips with friends and family with permission controls
- **Search & Discovery**: Search cities, activities, and discover trending destinations
- **User Profiles**: Personalized travel experience with authentication

### Advanced Features
- **Admin Dashboard**: Complete admin interface with analytics and system monitoring
- **Trip Sharing**: Secure sharing with customizable permissions
- **File Uploads**: Secure handling for images and documents
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live budget calculations and itinerary updates

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Routing**: React Router DOM 6.15.0
- **Styling**: Tailwind CSS 3.3.3
- **Animations**: Framer Motion 10.16.4
- **Icons**: Lucide React 0.263.1
- **Charts**: Recharts 2.8.0
- **HTTP Client**: Axios 1.5.0
- **Date Utilities**: date-fns 2.30.0

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.18.2
- **Database**: PostgreSQL with Prisma ORM 5.2.0
- **Authentication**: JWT with bcryptjs
- **Validation**: Joi for request validation
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **Email**: Nodemailer for notifications

## 📁 Project Structure

```
traveloop/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.js               # Seed data
│   ├── src/
│   │   ├── config/               # Environment configuration
│   │   ├── controllers/          # API route handlers
│   │   ├── services/             # Business logic layer
│   │   ├── routes/               # API routes
│   │   ├── middleware/           # Custom middleware
│   │   ├── utils/                # Helper functions
│   │   ├── uploads/              # File upload directory
│   │   ├── app.js                # Express app setup
│   │   └── server.js             # Server entry point
│   ├── .env.example             # Environment variables template
│   ├── package.json
│   ├── Dockerfile
│   └── README.md                # Backend documentation
├── frontend/
│   ├── src/
│   │   ├── api/                 # API utilities and configurations
│   │   ├── components/          # Reusable UI components
│   │   ├── context/             # React context providers
│   │   ├── hooks/               # Custom React hooks
│   │   ├── layouts/             # Page layout components
│   │   ├── pages/               # Page components
│   │   ├── App.jsx              # Main application component
│   │   ├── main.jsx             # Application entry point
│   │   └── index.css            # Global styles
│   ├── .env                     # Frontend environment variables
│   ├── index.html               # HTML template
│   ├── package.json
│   └── README.md                # Frontend documentation
├── docker-compose.yml           # Docker orchestration
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd traveloop
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment setup**

   **Backend:**
   ```bash
   cd backend
   cp .env.example .env
   ```
   
   Configure `backend/.env`:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@hostname:5432/database_name?sslmode=require"
   
   # JWT Secrets
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_REFRESH_SECRET="your-super-secret-refresh-key"
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```
   
   **Frontend:**
   Configure `frontend/.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Database Setup

1. **Generate Prisma client**
   ```bash
   cd backend
   npm run db:generate
   ```

2. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

3. **Seed the database** (optional)
   ```bash
   npm run db:seed
   ```

### Running the Application

**Start Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Using Docker

For containerized deployment:

```bash
docker-compose up --build
```

This will start both frontend and backend services along with a PostgreSQL database.

## 📚 Documentation

- [Backend API Documentation](./backend/README.md) - Detailed API endpoints and documentation
- [Frontend Documentation](./frontend/README.md) - Frontend setup and component documentation

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

- **Users**: Authentication and user management
- **Trips**: Trip planning and management
- **Stops**: Itinerary stops with ordering
- **Activities**: Individual activities within stops
- **Budgets**: Budget tracking by category
- **ChecklistItems**: Packing list management
- **Notes**: Trip notes with sharing
- **SharedTrips**: Trip sharing with permissions
- **Cities**: Destination database

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Password Hashing**: bcryptjs for secure password storage
- **Rate Limiting**: Prevent API abuse
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Prisma ORM

## 🚀 Deployment

### Environment Variables

**Backend Production Variables:**
```env
DATABASE_URL="postgresql://username:password@hostname:5432/database_name?sslmode=require"
JWT_SECRET="your-production-jwt-secret"
JWT_REFRESH_SECRET="your-production-refresh-secret"
NODE_ENV="production"
FRONTEND_URL="https://your-frontend-url.com"
PORT=5000
```

**Frontend Production Variables:**
```env
VITE_API_URL="https://your-backend-url.com/api"
```

### Deployment Platforms

**Render:**
1. Connect GitHub repository to Render
2. Configure environment variables
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Deploy

**Railway:**
```bash
npm install -g @railway/cli
railway login
railway up
```

**Vercel (Frontend):**
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy

## 🧪 Development

### Backend Development

```bash
cd backend

# Run development server
npm run dev

# Database management
npm run db:generate    # Generate Prisma client
npm run db:migrate     # Run migrations
npm run db:seed        # Seed database
npm run db:studio      # Open Prisma Studio
```

### Frontend Development

```bash
cd frontend

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the [Backend API Documentation](./backend/README.md)
- Check the [Frontend Documentation](./frontend/README.md)

## 👥 Team

- **Traveloop Team** - Development and Design

---

**Built with ❤️ for the Traveloop travel planning community**
