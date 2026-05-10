# Deployment Guide

This guide will help you deploy Traveloop to production using Vercel for the frontend and Render/Railway for the backend.

## Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Vercel        │         │   Render/       │         │   PostgreSQL    │
│   (Frontend)    │◄────────┤   Railway       │◄────────┤   (Database)    │
│   React/Vite    │  API    │   (Backend)     │  Query  │                 │
└─────────────────┘         └─────────────────┘         └─────────────────┘
```

- **Frontend**: Vercel (optimized for static React/Vite builds)
- **Backend**: Render or Railway (optimized for Node.js/Express with PostgreSQL)
- **Database**: PostgreSQL (managed by backend hosting platform)

## Prerequisites

- GitHub account with the repository pushed
- Vercel account (free tier available)
- Render or Railway account (free tier available)
- Node.js 18+ installed locally

## Step 1: Deploy Backend

### Option A: Deploy to Render

1. **Prepare the repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create a new web service on Render**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `traveloop-backend` (or your preferred name)
     - **Root Directory**: `traveloop/backend`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   - Click "Create Web Service"

3. **Add environment variables** in Render dashboard:
   - Go to your service → Settings → Environment Variables
   - Add the following variables:
     ```
     DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require
     JWT_SECRET=your-super-secret-jwt-key
     JWT_REFRESH_SECRET=your-super-secret-refresh-key
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend.vercel.app
     PORT=5000
     ```
   - For `DATABASE_URL`, you can:
     - Use Render's built-in PostgreSQL (recommended)
     - Or use an external PostgreSQL service

4. **Deploy and wait** for the build to complete
5. **Copy your backend URL** (e.g., `https://traveloop-backend.onrender.com`)

### Option B: Deploy to Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Navigate to backend directory**
   ```bash
   cd traveloop/backend
   ```

4. **Initialize and deploy**
   ```bash
   railway init
   railway up
   ```

5. **Add environment variables** in Railway dashboard:
   - Go to your project → Variables
   - Add the same variables as listed in Render option above

6. **Copy your backend URL** from Railway dashboard

## Step 2: Deploy Frontend to Vercel

### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend directory**
   ```bash
   cd traveloop/frontend
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set the project name
   - Link to existing project (or create new)
   - Override settings? No

5. **Add environment variables**:
   ```bash
   vercel env add VITE_API_URL production
   # Enter your backend URL: https://your-backend.onrender.com/api
   
   vercel env add VITE_NODE_ENV production
   # Enter value: production
   ```

6. **Redeploy to apply environment variables**
   ```bash
   vercel --prod
   ```

7. **Copy your frontend URL** from the output

### Option B: Deploy via Vercel Dashboard

1. **Push code to GitHub** (if not already done)

2. **Import project in Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Framework Preset**: Vite
     - **Root Directory**: `traveloop/frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Add environment variables**:
   - Go to Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend.onrender.com/api
     VITE_NODE_ENV=production
     ```

4. **Click Deploy**

5. **Copy your frontend URL** from the deployment dashboard

## Step 3: Update Backend CORS

After both deployments are complete:

1. Go to your backend deployment (Render or Railway)
2. Update the `FRONTEND_URL` environment variable to your Vercel frontend URL
3. Redeploy the backend to apply the change

## Step 4: Verify Deployment

1. **Test the frontend**:
   - Open your Vercel frontend URL
   - Try to sign up/login
   - Create a trip
   - Verify all features work

2. **Test the backend**:
   - Check backend logs for any errors
   - Verify database connections are working

3. **Test API connectivity**:
   - Open browser DevTools → Network tab
   - Check that API calls are successful
   - Verify CORS is configured correctly

## Environment Variables Reference

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db?sslmode=require` |
| `JWT_SECRET` | JWT secret key | `your-super-secret-jwt-key` |
| `JWT_REFRESH_SECRET` | JWT refresh token secret | `your-super-secret-refresh-key` |
| `NODE_ENV` | Environment | `production` |
| `FRONTEND_URL` | Frontend URL for CORS | `https://your-app.vercel.app` |
| `PORT` | Server port | `5000` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://your-backend.onrender.com/api` |
| `VITE_NODE_ENV` | Environment | `production` |

## Troubleshooting

### Common Issues

**Issue: CORS errors in browser**
- Solution: Ensure `FRONTEND_URL` in backend environment variables matches your Vercel URL exactly
- Redeploy backend after updating

**Issue: API calls failing**
- Solution: Check that `VITE_API_URL` in frontend is correct and includes `/api` suffix
- Verify backend is running and accessible

**Issue: Database connection errors**
- Solution: Check `DATABASE_URL` is correct
- Ensure PostgreSQL database is running
- Verify SSL mode is set correctly in connection string

**Issue: Build failures on Vercel**
- Solution: Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility

### Getting Help

- Check deployment logs in Vercel, Render, or Railway dashboards
- Review environment variables are set correctly
- Ensure all required dependencies are installed
- Check backend and frontend README files for additional details

## Cost Estimate

### Free Tiers

- **Vercel**: Free tier includes:
  - 100GB bandwidth per month
  - Unlimited deployments
  - SSL certificates
  - Custom domains

- **Render**: Free tier includes:
  - 750 hours/month of web service
  - 90-day sleep period for inactive services
  - Free PostgreSQL database

- **Railway**: Free tier includes:
  - $5 credit per month
  - 512MB RAM
  - Shared CPU

### Estimated Monthly Costs (if free tier exceeded)

- Frontend (Vercel): $0-$20 (depending on traffic)
- Backend (Render/Railway): $7-$25 (depending on usage)
- Database: $0-$15 (depending on size)

Total: ~$7-$60/month for production usage

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured correctly
- [ ] CORS settings updated
- [ ] Database migrations run successfully
- [ ] User authentication working
- [ ] All core features tested
- [ ] SSL certificates active (automatic on Vercel/Render/Railway)
- [ ] Custom domain configured (optional)
- [ ] Monitoring/logging set up (optional)

## Custom Domain Setup (Optional)

### Frontend (Vercel)

1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

### Backend (Render/Railway)

Follow similar steps in Render/Railway dashboard to add custom domain.

## Monitoring and Maintenance

- Regularly check deployment logs
- Monitor database usage
- Update dependencies periodically
- Backup database regularly
- Review security settings

---

For more detailed information, refer to:
- [Frontend README](./traveloop/frontend/README.md)
- [Backend README](./traveloop/backend/README.md)
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
