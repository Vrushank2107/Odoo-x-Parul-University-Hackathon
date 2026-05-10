# Traveloop Backend API

A complete backend API for the Traveloop travel planning application built with Node.js, Express, Prisma, and PostgreSQL.

## 🚀 Features

- **Authentication**: JWT-based auth with refresh tokens
- **Trip Management**: Full CRUD operations for trips
- **Itinerary Management**: Stops and activities with drag-and-drop reordering
- **Budget Tracking**: Real-time budget calculations and insights
- **Packing Lists**: Smart packing suggestions and progress tracking
- **Notes**: Rich text notes with sharing capabilities
- **Search**: Advanced search for cities, activities, and trips
- **Trip Sharing**: Secure trip sharing with permission controls
- **Admin Dashboard**: Complete admin interface with analytics
- **File Uploads**: Secure file handling for images and documents

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcryptjs
- **Validation**: Joi for request validation
- **Security**: Helmet, CORS, Rate Limiting
- **File Upload**: Multer
- **Deployment**: Ready for Render/Railway

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.js               # Seed data
├── src/
│   ├── config/
│   │   ├── env.js             # Environment configuration
│   │   └── prisma.js          # Prisma client setup
│   ├── controllers/            # API route handlers
│   ├── services/              # Business logic layer
│   ├── routes/                # API routes
│   ├── middleware/            # Custom middleware
│   ├── utils/                 # Helper functions
│   ├── uploads/               # File upload directory
│   ├── app.js                 # Express app setup
│   └── server.js              # Server entry point
├── .env.example              # Environment variables template
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd traveloop/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@hostname:5432/database_name?sslmode=require"

   # JWT Secrets
   JWT_SECRET="your-super-secret-jwt-key"
   JWT_REFRESH_SECRET="your-super-secret-refresh-key"

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=https://traveloop-tau.vercel.app
   ```

### Database Setup

1. **Install Prisma CLI**
   ```bash
   npm install -g prisma
   ```

2. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

3. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

4. **Seed the database** (optional)
   ```bash
   npm run db:seed
   ```

### Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-app-url.com/api`

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/auth/signup` | Register new user |
| POST | `/auth/login` | User login |
| GET | `/auth/me` | Get current user |
| PUT | `/auth/profile` | Update profile |
| PUT | `/auth/change-password` | Change password |
| POST | `/auth/logout` | Logout user |
| DELETE | `/auth/account` | Delete account |

### Trip Management Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/trips` | Get user trips |
| POST | `/trips` | Create new trip |
| GET | `/trips/:id` | Get trip details |
| PUT | `/trips/:id` | Update trip |
| DELETE | `/trips/:id` | Delete trip |
| GET | `/trips/stats` | Get trip statistics |
| GET | `/trips/upcoming` | Get upcoming trips |
| GET | `/trips/recent` | Get recent trips |
| GET | `/trips/search` | Search trips |
| POST | `/trips/:id/duplicate` | Duplicate trip |

### Itinerary Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/itinerary/trips/:tripId/stops` | Create stop |
| GET | `/itinerary/trips/:tripId/stops` | Get trip stops |
| PUT | `/itinerary/stops/:id` | Update stop |
| DELETE | `/itinerary/stops/:id` | Delete stop |
| PUT | `/itinerary/trips/:tripId/stops/reorder` | Reorder stops |
| POST | `/itinerary/stops/:stopId/activities` | Create activity |
| GET | `/itinerary/stops/:stopId/activities` | Get stop activities |
| PUT | `/itinerary/activities/:id` | Update activity |
| DELETE | `/itinerary/activities/:id` | Delete activity |
| PATCH | `/itinerary/activities/:id/toggle` | Toggle completion |

### Budget Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/budget/trips/:tripId/budgets` | Create budget |
| GET | `/budget/trips/:tripId/budgets` | Get trip budgets |
| GET | `/budget/trips/:tripId/budgets/summary` | Get budget summary |
| GET | `/budget/trips/:tripId/budgets/insights` | Get budget insights |
| GET | `/budget/trips/:tripId/budgets/trends` | Get spending trends |
| PUT | `/budget/budgets/:id` | Update budget |
| DELETE | `/budget/budgets/:id` | Delete budget |
| POST | `/budget/budgets/:id/expense` | Add expense |

### Packing Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/packing/trips/:tripId/checklist` | Create checklist item |
| GET | `/packing/trips/:tripId/checklist` | Get trip checklist |
| GET | `/packing/trips/:tripId/checklist/stats` | Get packing stats |
| GET | `/packing/trips/:tripId/checklist/suggestions` | Get suggestions |
| PUT | `/packing/checklist/:id` | Update checklist item |
| DELETE | `/packing/checklist/:id` | Delete checklist item |
| PATCH | `/packing/checklist/:id/toggle` | Toggle packed status |
| PUT | `/packing/trips/:tripId/checklist/bulk` | Bulk update |
| POST | `/packing/trips/:fromTripId/checklist/duplicate/:toTripId` | Duplicate checklist |

### Notes Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/notes/trips/:tripId/notes` | Create note |
| GET | `/notes/trips/:tripId/notes` | Get trip notes |
| GET | `/notes/notes/:id` | Get note |
| PUT | `/notes/notes/:id` | Update note |
| DELETE | `/notes/notes/:id` | Delete note |
| GET | `/notes/trips/:tripId/notes/search` | Search notes |
| GET | `/notes/user/notes` | Get user notes |
| PATCH | `/notes/notes/:id/toggle-visibility` | Toggle visibility |
| GET | `/notes/trips/:tripId/notes/stats` | Get note stats |

### Search Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/search/cities` | Search cities |
| GET | `/search/cities/popular` | Get popular cities |
| GET | `/search/cities/:id` | Get city details |
| GET | `/search/countries/:country/destinations` | Get destinations by country |
| GET | `/search/countries` | Get all countries |
| GET | `/search/activities` | Search activities |
| GET | `/search/activities/suggestions` | Get activity suggestions |
| GET | `/search/trips` | Search trips |
| GET | `/search/destinations/trending` | Get trending destinations |

### Sharing Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| POST | `/trips/:tripId/share` | Create share link |
| GET | `/shared/:shareCode` | Get shared trip |
| GET | `/user/shared-trips` | Get user's shared trips |
| PUT | `/share/:shareCode` | Update permissions |
| DELETE | `/share/:shareCode` | Revoke access |
| POST | `/shared/:shareCode/duplicate` | Duplicate from shared |
| GET | `/trips/:tripId/share/stats` | Get share stats |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/admin/dashboard/stats` | Get dashboard stats |
| GET | `/admin/system/health` | Get system health |
| GET | `/admin/system/database` | Get database stats |
| GET | `/admin/users` | Get all users |
| GET | `/admin/users/:id` | Get user details |
| PUT | `/admin/users/:id/role` | Update user role |
| DELETE | `/admin/users/:id` | Delete user |
| GET | `/admin/trips` | Get all trips |
| GET | `/admin/logs` | Get activity logs |

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

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Rate Limiting**: Prevent API abuse
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers
- **Input Validation**: Joi schema validation
- **SQL Injection Protection**: Prisma ORM

## 🚀 Deployment

### Environment Variables

Required environment variables for production:

```env
DATABASE_URL="postgresql://username:password@hostname:5432/database_name?sslmode=require"
JWT_SECRET="your-production-jwt-secret"
JWT_REFRESH_SECRET="your-production-refresh-secret"
NODE_ENV="production"
FRONTEND_URL="https://traveloop-tau.vercel.app"
PORT=5000
```

### Render Deployment

1. **Connect GitHub repository** to Render
2. **Configure environment variables** in Render dashboard
3. **Set build command**: `npm install`
4. **Set start command**: `npm start`
5. **Deploy**

### Railway Deployment

1. **Install Railway CLI**: `npm install -g @railway/cli`
2. **Login**: `railway login`
3. **Deploy**: `railway up`

## 🧪 Development

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage
```

### Database Management

```bash
# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Reset database
npm run db:reset

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### API Testing

The API includes comprehensive error handling and response formatting. All responses follow this structure:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

## 📝 Logging

The application uses structured logging for:
- API requests/responses
- Database operations
- Authentication events
- Error tracking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the database schema

---

**Built with ❤️ for the Traveloop travel planning community**
