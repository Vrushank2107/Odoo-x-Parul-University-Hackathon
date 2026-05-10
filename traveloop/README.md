# Traveloop

Travel planning app for the **Odoo × Parul University Hackathon** — plan trips, itineraries, budgets, packing, and collaboration in one place.

> In this repository, all application code lives under the `traveloop/` folder. Clone the repo, then `cd traveloop` for setup and run commands below.

## Overview

Traveloop is a full-stack travel planner: React + Vite on the frontend and a Python API on the backend, with an AI layer (e.g. Gemini integration and trip/recommendation helpers under `backend/app/ai/`).

## Tech stack

| Layer | Technologies |
|--------|----------------|
| Frontend | React, Vite, JavaScript/JSX, CSS |
| Backend | Python, Flask-style app package under `backend/app/` |
| Data & services | Models, services, and route modules per feature area |
| AI | `app/ai/` — client, memory, recommendation engine, trip agent, website context |
| Ops | `Dockerfile` and `docker-compose.yml` (fill in when you wire container builds) |

## Repository layout

```
traveloop/
├── frontend/                 # React (Vite) SPA
├── backend/
│   ├── app/
│   │   ├── ai/               # LLM / trip intelligence
│   │   ├── config/           # Settings
│   │   ├── middleware/       # Auth & role middleware
│   │   ├── models/           # Domain models
│   │   ├── routes/           # HTTP API routes
│   │   ├── schemas/          # Request/response schemas
│   │   ├── services/         # Business logic
│   │   └── utils/            # Helpers, logging, mail, errors
│   ├── requirements.txt
│   ├── run.py                # Backend entry
│   └── .env                  # Local secrets (do not commit real keys)
├── Dockerfile
├── docker-compose.yml
└── README.md
```

### Frontend (`frontend/src/`)

```
src/
├── api/                 # HTTP client (e.g. axios setup)
├── components/        # UI pieces (Navbar, Sidebar, cards, charts, Loader)
│   └── Chatbot/       # ChatButton, ChatPopup
├── context/           # AuthContext, TripContext
├── hooks/             # useAuth, useTrip
├── layouts/           # MainLayout, DashboardLayout
├── pages/             # Feature screens (Home, Dashboard, trips, budget, etc.)
├── routes/            # ProtectedRoutes
├── utils/             # auth, budget helpers
├── App.jsx
├── main.jsx
└── index.css
```

### Backend (`backend/app/`)

- **Routes**: `auth`, `trip`, `itinerary`, `activity`, `city`, `budget`, `notes`, `packing`, `share`, `admin`, `ai`
- **Services**: auth, trip, itinerary, budget, AI, recommendations
- **Models**: user, trip, itinerary, activity, city, budget, notes, packing, shared trip

## Features (by area)

- **Auth**: Login, Signup; protected routes on the frontend
- **Trips**: Create, list (“My Trips”), shared trips, itinerary builder and view
- **Planning**: Activity search, city search, budget, notes, packing checklist
- **Account**: Profile; **Admin**: Admin dashboard
- **UI**: Navbar, sidebar, trip/activity cards, budget chart, chatbot entry points

## Prerequisites

- Node.js and npm (for the frontend)
- Python 3.x and pip (for the backend)
- Optional: Docker and Docker Compose when your `Dockerfile` / compose file are populated

## Local development

From the **repository root**:

```bash
cd traveloop
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
```

Configure environment variables in `backend/.env` (API URLs, database, and any AI keys your `settings` module expects). Then start the app:

```bash
python run.py
```

Run backend and frontend in two terminals. Point the frontend API client at your backend base URL if it is not the default.

### Docker

When `Dockerfile` and `docker-compose.yml` are configured, you can use:

```bash
docker compose up
```

(from `traveloop/`, depending on your Compose file version and service names).

## Typical user flow

1. Sign up or log in  
2. Open the dashboard and create or open a trip  
3. Build an itinerary, search cities/activities, and track budget, notes, and packing  
4. Use sharing and admin features as roles allow  

## Contributing / hackathon notes

Keep secrets out of git: use `backend/.env` locally and document any new variables in this README or in a template `.env.example` if you add one.

---

*Odoo × Parul University Hackathon — Traveloop*
