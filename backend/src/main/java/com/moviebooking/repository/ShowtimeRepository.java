package com.moviebooking.repository;

import com.moviebooking.entity.Showtime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    List<Showtime> findByMovieId(Integer movieId);
    
    @Query("SELECT s FROM Showtime s WHERE s.movie.id = :movieId AND DATE(s.startTime) = DATE(:date)")
    List<Showtime> findByMovieIdAndDate(@Param("movieId") Integer movieId, @Param("date") LocalDateTime date);
    
    List<Showtime> findByStartTimeAfter(LocalDateTime dateTime);
}
