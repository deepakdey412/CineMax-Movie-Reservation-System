package com.moviebooking.service;

import com.moviebooking.dto.SeatResponse;
import com.moviebooking.entity.Showtime;
import com.moviebooking.exception.ResourceNotFoundException;
import com.moviebooking.repository.SeatRepository;
import com.moviebooking.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    public List<SeatResponse> getSeatsByShowtimeId(Integer showtimeId) {
        Showtime showtime = showtimeRepository.findById(showtimeId)
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + showtimeId));

        return seatRepository.findByShowtimeId(showtimeId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private SeatResponse mapToResponse(com.moviebooking.entity.Seat seat) {
        return new SeatResponse(
                seat.getId(),
                seat.getSeatNumber(),
                seat.getIsBooked()
        );
    }
}
