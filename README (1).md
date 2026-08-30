# Internship & Job Listing Portal

A full-stack MERN application where users can browse internship/job opportunities, search and filter by domain, view details, and submit applications with a resume. Admins can add, edit, and delete opportunities, and view submitted applications.

Built as part of a beginner-level Full Stack Development internship mini project.

## Tech Stack

| Layer       | Technology                      |
|-------------|----------------------------------|
| Frontend    | React.js (Vite) + React Router  |
| Backend     | Node.js + Express.js            |
| Database    | MongoDB (Mongoose ODM)          |
| Auth        | JWT (jsonwebtoken) + bcryptjs   |
| File Upload | Multer                          |
| HTTP Client | Axios                           |

## Features

**User Features**
- Register and log in (JWT-based authentication)
- View all opportunities
- Search opportunities by keyword (title, company, description)
- Filter opportunities by domain
- View full opportunity details
- Apply with an uploaded resume (PDF/Word) or a resume link — login required
- See a confirmation after successfully applying
- View a personal "My Applications" history

**Admin Features**
- Separate admin role, protected by login
- Add, edit, and delete opportunities
- View all submitted applications, with a download link for each uploaded resume

## Project Structure

```
job-portal/
├── client/                     # React frontend
│   └── src/
│       ├── components/         # Navbar, OpportunityCard, FilterBar, ProtectedRoute
│       ├── context/            # AuthContext.jsx — global auth state
│       ├── pages/              # Home, OpportunityDetails, AdminDashboard,
│       │                       # Login, Register, MyApplications
│       └── services/           # api.js — axios calls + auth token interceptor
└── server/                     # Express backend
    ├── models/                 # User.js, Opportunity.js, Application.js
    ├── controllers/            # Business logic for each route
    ├── routes/                 # authRoutes, opportunityRoutes, applicationRoutes
    ├── middleware/              # authMiddleware.js (JWT check), uploadMiddleware.js (multer)
    ├── utils/                   # generateToken.js
    ├── config/                  # db.js — MongoDB connection
    ├── uploads/resumes/         # Uploaded resume files (created automatically)
    ├── seed.js                  # Populates sample opportunities
    ├── seedAdmin.js              # Creates the initial admin account
    └── server.js                 # App entry point
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB running locally, or a MongoDB Atlas connection string

### 1. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/job-portal
JWT_SECRET=replace_this_with_a_long_random_string
```

Seed sample opportunities and the admin account:
```bash
npm run seed
npm run seed:admin
```
This prints the admin login (`admin@jobportal.com` / `admin123`) — log in with these, then change the password in the database if you plan to share this project publicly.

Start the server:
```bash
npm run dev
```
The API will run at `http://localhost:5000`.

### 2. Frontend Setup

In a new terminal:
```bash
cd client
npm install
npm run dev
```
The app will run at `http://localhost:5173`.

### 3. Try it out
1. Register a regular user account, or log in as admin
2. As a regular user: browse opportunities, open one, and apply with a resume upload
3. As admin: visit `/admin` to manage opportunities and view applications with resume downloads

## API Endpoints

| Method | Endpoint                   | Auth           | Description                          |
|--------|------------------------------|----------------|---------------------------------------|
| POST   | `/api/auth/register`         | Public         | Register a new user                  |
| POST   | `/api/auth/login`            | Public         | Log in, returns a JWT                |
| GET    | `/api/auth/me`                | Logged in      | Get current user's profile           |
| GET    | `/api/opportunities`          | Public         | Get all opportunities (`?search=`, `?domain=`) |
| GET    | `/api/opportunities/:id`      | Public         | Get a single opportunity             |
| POST   | `/api/opportunities`          | Admin          | Create a new opportunity             |
| PUT    | `/api/opportunities/:id`      | Admin          | Update an opportunity                |
| DELETE | `/api/opportunities/:id`      | Admin          | Delete an opportunity                |
| POST   | `/api/applications`           | Logged in      | Submit an application (multipart, field `resume`) |
| GET    | `/api/applications`           | Admin          | Get all applications                 |
| GET    | `/api/applications/my`        | Logged in      | Get the current user's applications  |

## Data Models

**User**
- name, email (unique), password (hashed), role (`user` | `admin`)

**Opportunity**
- title, company, domain, location, experience, description, applicationLink, createdAt

**Application**
- opportunity (ref), applicant (ref to User), applicantName, applicantEmail, resumeFile, resumeLink, createdAt

## How Auth Works

- Passwords are hashed with bcrypt before saving — plain text is never stored.
- On login/register, the server returns a JWT (30-day expiry) containing the user's id and role.
- The frontend stores this in `localStorage` and attaches it as a `Bearer` token on every API request via an axios interceptor.
- `authMiddleware.protect` verifies the token on protected routes; `authMiddleware.adminOnly` additionally checks `role === 'admin'`.
- Admin accounts aren't created through public registration — only via `npm run seed:admin` — so a regular user can never grant themselves admin access.

## Screenshots

_Add screenshots of the Home page, Opportunity Details page, Login/Register, and Admin Dashboard here before final submission._

## Future Enhancements

- Email notification on successful application
- Password reset flow
- Pagination for large opportunity lists

## Author

_Add your name, internship batch, and mentor name here._
