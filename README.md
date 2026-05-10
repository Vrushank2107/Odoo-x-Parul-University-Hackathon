# Odoo x Parul University Hackathon

## Project: Traveloop

A comprehensive travel planning application built for the Odoo x Parul University Hackathon.

## Team BlackOps

### Team Members
- **Vrushank Solanki**
- **Yaksh Rana**
- **Jay Mehta**
- **Pransu Patel**

## About the Project

Traveloop is a modern full-stack travel planning application that helps users plan, organize, and share their travel experiences. The application features powerful tools for itinerary management, budget tracking, packing lists, and collaborative planning.

## Live Demo

- **Frontend**: [https://traveloop-tau.vercel.app/](https://traveloop-tau.vercel.app/)

## Tech Stack

### Frontend
- React 18.2.0
- Vite 4.4.5
- Tailwind CSS 3.3.3
- React Router DOM 6.15.0
- Framer Motion 10.16.4
- Lucide React 0.263.1
- Recharts 2.8.0
- Axios 1.5.0

### Backend
- Node.js 18+
- Express.js 4.18.2
- PostgreSQL with Prisma ORM 5.2.0
- JWT Authentication
- Nodemailer for email services

## Key Features

- Trip Planning & Itinerary Management
- Budget Tracking & Expense Management
- Packing Checklists with Smart Suggestions
- Trip Notes & Collaborative Planning
- City & Activity Search
- Admin Dashboard with Analytics
- Secure Trip Sharing with Permissions
- Responsive Design for All Devices

## Getting Started

For detailed setup instructions, please refer to the project documentation:

```bash
cd traveloop
```

See the [Traveloop README](./traveloop/README.md) for complete installation and deployment guides.

## 🚀 Deployment

### Deployment Architecture

This project uses a hybrid deployment strategy optimized for each component:

- **Frontend**: Deployed on Vercel (optimized for React/Vite static sites)
- **Backend**: Deployed on Render or Railway (optimized for Node.js/Express with PostgreSQL)
- **Database**: PostgreSQL (managed by the backend hosting platform)

### Quick Deployment Guide

#### 1. Deploy Backend (First)

Choose one of the following platforms:

**Option A: Render**
- Push code to GitHub
- Connect repository to Render
- Set root directory to `traveloop/backend`
- Configure environment variables (see backend README)
- Deploy

**Option B: Railway**
- Install Railway CLI: `npm install -g @railway/cli`
- Login: `railway login`
- Navigate to backend: `cd traveloop/backend`
- Deploy: `railway up`

#### 2. Deploy Frontend to Vercel

**Using Vercel CLI:**
```bash
cd traveloop/frontend
npm install -g vercel
vercel
```

**Using Vercel Dashboard:**
- Push code to GitHub
- Import project in Vercel
- Set root directory to `traveloop/frontend`
- Configure environment variables:
  - `VITE_API_URL`: Your deployed backend URL (e.g., `https://your-backend.onrender.com/api`)
  - `VITE_NODE_ENV`: `production`
- Deploy

#### 3. Update Backend CORS

After deploying both frontend and backend, update the `FRONTEND_URL` environment variable in your backend deployment to point to your Vercel frontend URL.

### Environment Variables Summary

**Backend Required Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT secret key
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `NODE_ENV` - Set to `production`
- `FRONTEND_URL` - Your Vercel frontend URL
- `PORT` - Server port (default: 5000)

**Frontend Required Variables:**
- `VITE_API_URL` - Your backend API URL
- `VITE_NODE_ENV` - Set to `production`

### Detailed Documentation

- [Frontend Deployment Guide](./traveloop/frontend/README.md#-deployment)
- [Backend Deployment Guide](./traveloop/backend/README.md#-deployment)

## Project Structure

```
Odoo-x-Parul-University-Hackathon/
└── traveloop/
    ├── backend/          # Node.js/Express API
    ├── frontend/         # React/Vite frontend
    └── docker-compose.yml
```

## Hackathon Submission

This project was developed for the **Odoo x Parul University Hackathon** by Team BlackOps.

---

**Built with ❤️ by Team BlackOps**
