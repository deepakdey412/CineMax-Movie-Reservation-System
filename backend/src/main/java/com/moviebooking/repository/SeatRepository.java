package com.moviebooking.repository;

import com.moviebooking.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    List<Seat> findByShowtimeId(Integer showtimeId);
    
    @Query("SELECT s FROM Seat s WHERE s.showtime.id = :showtimeId AND s.seatNumber IN :seatNumbers")
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    List<Seat> findByShowtimeIdAndSeatNumbersForUpdate(
        @Param("showtimeId") Integer showtimeId, 
        @Param("seatNumbers") List<String> seatNumbers
    );
    
    Optional<Seat> findByShowtimeIdAndSeatNumber(Integer showtimeId, String seatNumber);
}
