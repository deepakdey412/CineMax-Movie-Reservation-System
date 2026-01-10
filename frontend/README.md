# Movie Booking Platform - Frontend

Production-grade Movie Ticket Reservation Platform frontend built with React 18 and Vite.

## Tech Stack

- **React 18**
- **Vite**
- **React Router DOM**
- **Axios**
- **Tailwind CSS**
- **Context API**
- **React Hot Toast**
- **Headless UI**

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:8080/api
```

## Features

### User Features
- User registration and login
- Browse movies
- View movie details and showtimes
- Interactive seat selection
- Book multiple seats
- View and cancel bookings

### Admin Features
- Admin dashboard
- Manage movies (CRUD)
- Manage showtimes (CRUD)
- View reports:
  - Total reservations
  - Revenue per movie
  - Seat occupancy per showtime

## Default Admin Credentials

- **Email**: admin@moviebooking.com
- **Password**: Admin@123

## Project Structure

```
src/
 ├── api/          # API service functions
 ├── auth/         # Authentication utilities
 ├── components/   # Reusable components
 ├── pages/        # Page components
 ├── context/      # React Context (Auth)
 ├── routes/       # Route components
 ├── utils/        # Utility functions
```
