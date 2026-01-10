# Movie Booking Platform

A complete, production-grade Movie Ticket Reservation Platform built with Spring Boot and React.

## 🎯 Features

### Backend (Spring Boot 3)
- ✅ JWT Authentication & Authorization
- ✅ Role-based access control (USER, ADMIN)
- ✅ Movie Management (Admin)
- ✅ Showtime & Seat Management (Admin)
- ✅ Reservation System with Transactional Locking
- ✅ Reporting & Analytics (Admin)
- ✅ Swagger API Documentation
- ✅ MySQL Database with proper indexing

### Frontend (React 18)
- ✅ Modern UI with Tailwind CSS
- ✅ User Registration & Login
- ✅ Movie Browsing
- ✅ Interactive Seat Booking
- ✅ My Bookings Management
- ✅ Admin Dashboard
- ✅ Admin Movie & Showtime Management
- ✅ Reports & Analytics

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- MySQL 8.0+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Configure MySQL**
   - Create database: `movie_booking`
   - Update `src/main/resources/application.properties` with your MySQL credentials

3. **Build and Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. **Access Backend**
   - API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui.html

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Frontend**
   - URL: http://localhost:5173

## 🔐 Default Credentials

### Admin Account
- **Email**: admin@moviebooking.com
- **Password**: Admin@123

(Seeded automatically on backend startup)

## 📁 Project Structure

```
.
├── backend/          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/moviebooking/
│   │   │   │   ├── config/        # Configuration
│   │   │   │   ├── controller/    # REST Controllers
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── entity/        # JPA Entities
│   │   │   │   ├── exception/     # Exception Handling
│   │   │   │   ├── repository/    # Data Repositories
│   │   │   │   ├── security/      # Security Config
│   │   │   │   └── service/       # Business Logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/         # React Frontend
    ├── src/
    │   ├── api/      # API Services
    │   ├── components/  # Reusable Components
    │   ├── context/  # React Context
    │   ├── pages/    # Page Components
    │   ├── routes/   # Route Components
    │   └── utils/    # Utilities
    ├── package.json
    └── vite.config.js
```

## 🗄️ Database Schema

- **users** - User accounts
- **roles** - User roles (USER, ADMIN)
- **movies** - Movie information
- **showtimes** - Movie showtimes
- **seats** - Seats for each showtime
- **reservations** - User reservations
- **reservation_seats** - Reservation-Seat mapping
- **user_roles** - User-Role mapping

## 🔒 Security Features

- JWT-based authentication
- BCrypt password encryption
- Role-based authorization
- Protected API endpoints
- CORS configuration
- Transactional seat booking (prevents double booking)

## 📝 API Documentation

Access Swagger UI at: http://localhost:8080/swagger-ui.html

## 🐳 Docker (Optional)

### Backend Dockerfile
```bash
cd backend
docker build -t movie-booking-backend .
docker run -p 8080:8080 movie-booking-backend
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

## 📦 Technologies Used

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Security + JWT
- Spring Data JPA
- MySQL
- Lombok
- Swagger OpenAPI

### Frontend
- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Headless UI

## 🎨 Features Highlight

1. **Transactional Seat Booking**: Uses pessimistic locking to prevent double booking
2. **Auto Seat Generation**: Automatically generates seats when creating showtimes
3. **Real-time Availability**: Shows available seats in real-time
4. **Comprehensive Reports**: Revenue, occupancy, and booking analytics
5. **Role-Based Access**: Separate interfaces for users and admins

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a production-ready full-stack application demonstrating enterprise-level architecture and best practices.
