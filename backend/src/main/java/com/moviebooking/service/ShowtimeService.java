package com.moviebooking.service;

import com.moviebooking.dto.ShowtimeRequest;
import com.moviebooking.dto.ShowtimeResponse;
import com.moviebooking.entity.Movie;
import com.moviebooking.entity.Seat;
import com.moviebooking.entity.Showtime;
import com.moviebooking.exception.BadRequestException;
import com.moviebooking.exception.ResourceNotFoundException;
import com.moviebooking.repository.MovieRepository;
import com.moviebooking.repository.SeatRepository;
import com.moviebooking.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShowtimeService {
    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Transactional
    public ShowtimeResponse createShowtime(ShowtimeRequest request) {
        if (request.getStartTime().isAfter(request.getEndTime())) {
            throw new BadRequestException("Start time must be before end time");
        }

        if (request.getStartTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Start time must be in the future");
        }

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + request.getMovieId()));

        Showtime showtime = new Showtime();
        showtime.setMovie(movie);
        showtime.setStartTime(request.getStartTime());
        showtime.setEndTime(request.getEndTime());
        showtime.setTotalSeats(request.getTotalSeats());

        Showtime savedShowtime = showtimeRepository.save(showtime);

        // Auto-generate seats
        generateSeats(savedShowtime);

        return mapToResponse(savedShowtime);
    }

    @Transactional
    public ShowtimeResponse updateShowtime(Integer id, ShowtimeRequest request) {
        if (request.getStartTime().isAfter(request.getEndTime())) {
            throw new BadRequestException("Start time must be before end time");
        }

        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + id));

        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with id: " + request.getMovieId()));

        showtime.setMovie(movie);
        showtime.setStartTime(request.getStartTime());
        showtime.setEndTime(request.getEndTime());

        if (!showtime.getTotalSeats().equals(request.getTotalSeats())) {
            showtime.setTotalSeats(request.getTotalSeats());
            // Regenerate seats if total seats changed
            seatRepository.deleteAll(showtime.getSeats());
            generateSeats(showtime);
        }

        Showtime updatedShowtime = showtimeRepository.save(showtime);
        return mapToResponse(updatedShowtime);
    }

    @Transactional
    public void deleteShowtime(Integer id) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + id));
        showtimeRepository.delete(showtime);
    }

    public ShowtimeResponse getShowtimeById(Integer id) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + id));
        return mapToResponse(showtime);
    }

    public List<ShowtimeResponse> getShowtimesByMovieId(Integer movieId) {
        return showtimeRepository.findByMovieId(movieId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ShowtimeResponse> getShowtimesByMovieIdAndDate(Integer movieId, LocalDateTime date) {
        return showtimeRepository.findByMovieIdAndDate(movieId, date).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ShowtimeResponse> getAllUpcomingShowtimes() {
        return showtimeRepository.findByStartTimeAfter(LocalDateTime.now()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private void generateSeats(Showtime showtime) {
        List<Seat> seats = new ArrayList<>();
        int totalSeats = showtime.getTotalSeats();
        int rows = (int) Math.ceil(Math.sqrt(totalSeats));
        int seatsPerRow = (int) Math.ceil((double) totalSeats / rows);

        int seatNumber = 1;
        for (int row = 0; row < rows && seatNumber <= totalSeats; row++) {
            char rowLetter = (char) ('A' + row);
            for (int col = 1; col <= seatsPerRow && seatNumber <= totalSeats; col++) {
                Seat seat = new Seat();
                seat.setShowtime(showtime);
                seat.setSeatNumber(rowLetter + String.valueOf(col));
                seat.setIsBooked(false);
                seats.add(seat);
                seatNumber++;
            }
        }

        seatRepository.saveAll(seats);
    }

    private ShowtimeResponse mapToResponse(Showtime showtime) {
        long availableSeats = showtime.getSeats().stream()
                .filter(seat -> !seat.getIsBooked())
                .count();

        return new ShowtimeResponse(
                showtime.getId(),
                showtime.getMovie().getId(),
                showtime.getMovie().getTitle(),
                showtime.getStartTime(),
                showtime.getEndTime(),
                showtime.getTotalSeats(),
                (int) availableSeats
        );
    }
}
