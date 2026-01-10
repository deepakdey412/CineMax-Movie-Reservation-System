package com.moviebooking.repository;

import com.moviebooking.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByUserId(Integer userId);
    
    List<Reservation> findByUserIdAndIsCancelledFalse(Integer userId);
    
    @Query("SELECT r FROM Reservation r WHERE r.user.id = :userId AND r.showtime.startTime > :now AND r.isCancelled = false")
    List<Reservation> findUpcomingReservationsByUserId(@Param("userId") Integer userId, @Param("now") LocalDateTime now);
    
    Optional<Reservation> findByIdAndUserId(Integer id, Integer userId);
    
    @Query("SELECT r FROM Reservation r WHERE r.isCancelled = false")
    List<Reservation> findAllActiveReservations();
    
    @Query("SELECT r FROM Reservation r WHERE r.showtime.movie.id = :movieId AND r.isCancelled = false")
    List<Reservation> findByMovieId(@Param("movieId") Integer movieId);
    
    @Query("SELECT r FROM Reservation r WHERE r.showtime.id = :showtimeId AND r.isCancelled = false")
    List<Reservation> findByShowtimeId(@Param("showtimeId") Integer showtimeId);
}
