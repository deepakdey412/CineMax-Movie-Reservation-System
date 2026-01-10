# Quick Start Guide - Movie Booking Platform

## 🚀 Setup Instructions

### Backend Setup (Spring Boot)

1. **Prerequisites**
   - Java 17 or higher
   - Maven 3.6+
   - MySQL 8.0+

2. **Database Setup**
   ```sql
   CREATE DATABASE movie_booking;
   ```

3. **Configure Database**
   - Edit `backend/src/main/resources/application.properties`
   - Update MySQL username and password:
     ```properties
     spring.datasource.username=your_username
     spring.datasource.password=your_password
     ```

4. **Build and Run Backend**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

5. **Verify Backend**
   - API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui.html

### Frontend Setup (React)

1. **Prerequisites**
   - Node.js 18+
   - npm or yarn

2. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Frontend**
   - URL: http://localhost:5173

## 🔐 Default Credentials

### Admin Account (Auto-seeded)
- **Email**: admin@moviebooking.com
- **Password**: Admin@123

## 📝 Getting Started

### As a Regular User

1. **Register/Login**
   - Go to http://localhost:5173
   - Click "Register" to create an account
   - Or login with your credentials

2. **Browse Movies**
   - Click "Movies" in the navigation
   - View all available movies

3. **Book Tickets**
   - Click on a movie to see details
   - Select a showtime
   - Choose seats
   - Confirm booking

4. **View Bookings**
   - Click "My Bookings" in navigation
   - View all your reservations
   - Cancel upcoming bookings if needed

### As an Admin

1. **Login as Admin**
   - Use credentials: admin@moviebooking.com / Admin@123
   - You'll see "Admin" link in navigation

2. **Manage Movies**
   - Go to Admin → Manage Movies
   - Add/Edit/Delete movies
   - Upload poster URLs

3. **Manage Showtimes**
   - Go to Admin → Manage Showtimes
   - Create showtimes for movies
   - Seats are auto-generated

4. **View Reports**
   - Go to Admin → View Reports
   - See revenue, occupancy, and booking statistics

## 🧪 Testing the Application

### Test User Flow

1. Register a new user
2. Browse movies
3. Select a movie and showtime
4. Book multiple seats
5. View booking confirmation
6. Cancel a booking (if upcoming)

### Test Admin Flow

1. Login as admin
2. Add a new movie
3. Create showtimes for the movie
4. View reports
5. Monitor reservations

## 🐛 Troubleshooting

### Backend Issues

- **Port 8080 already in use**: Change port in `application.properties`
- **Database connection failed**: Check MySQL is running and credentials are correct
- **Build fails**: Ensure Java 17+ is installed and `JAVA_HOME` is set

### Frontend Issues

- **Port 5173 already in use**: Vite will automatically use next available port
- **API connection failed**: Ensure backend is running on port 8080
- **Dependencies install fails**: Try `npm cache clean --force` then reinstall

## 📚 API Documentation

Access full API documentation at:
- **Swagger UI**: http://localhost:8080/swagger-ui.html

## 🔒 Security Features

- JWT-based authentication
- Role-based authorization (USER, ADMIN)
- BCrypt password encryption
- Transactional seat booking (prevents double booking)
- CORS configuration
- Protected routes

## 📦 Key Features

### Backend
- ✅ RESTful API
- ✅ JWT Authentication
- ✅ Role-based Access Control
- ✅ Transactional Seat Booking
- ✅ Auto-seed Admin User
- ✅ Swagger Documentation
- ✅ Exception Handling
- ✅ Validation

### Frontend
- ✅ User Registration/Login
- ✅ Movie Browsing
- ✅ Interactive Seat Selection
- ✅ Booking Management
- ✅ Admin Dashboard
- ✅ Movie Management
- ✅ Showtime Management
- ✅ Reports & Analytics

## 🎯 Next Steps

1. Start backend server
2. Start frontend server
3. Login as admin or register as user
4. Explore all features!

Happy Coding! 🎬
