# Movie Booking Platform - Backend

Production-grade Movie Ticket Reservation Platform built with Spring Boot 3.

## Tech Stack

- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security + JWT**
- **Spring Data JPA + Hibernate**
- **MySQL**
- **Lombok**
- **Maven**
- **Swagger OpenAPI**

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup Instructions

1. **Database Setup**
   - Create MySQL database: `movie_booking`
   - Update `application.properties` with your MySQL credentials

2. **Build & Run**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

3. **Access Application**
   - API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui.html

## Default Admin Credentials

- **Email**: admin@moviebooking.com
- **Password**: Admin@123

(Seeded automatically on startup)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Movies (User)
- `GET /api/movies` - Get all movies
- `GET /api/movies/{id}` - Get movie by ID

### Movies (Admin)
- `POST /api/movies` - Create movie
- `PUT /api/movies/{id}` - Update movie
- `DELETE /api/movies/{id}` - Delete movie

### Showtimes
- `GET /api/showtimes` - Get all upcoming showtimes
- `GET /api/showtimes/movie/{movieId}` - Get showtimes by movie
- `POST /api/showtimes` - Create showtime (Admin)

### Seats
- `GET /api/seats/showtime/{showtimeId}` - Get seats by showtime

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations/my-reservations` - Get user reservations
- `PUT /api/reservations/{id}/cancel` - Cancel reservation

### Admin Reports
- `GET /api/admin/reports` - Generate reports

## Docker

```bash
docker build -t movie-booking-backend .
docker run -p 8080:8080 movie-booking-backend
```
