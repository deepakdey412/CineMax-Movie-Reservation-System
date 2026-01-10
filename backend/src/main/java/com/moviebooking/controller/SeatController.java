package com.moviebooking.controller;

import com.moviebooking.dto.ApiResponse;
import com.moviebooking.dto.SeatResponse;
import com.moviebooking.service.SeatService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/seats")
@Tag(name = "Seats", description = "Seat management APIs")
public class SeatController {
    @Autowired
    SeatService seatService;

    @GetMapping("/showtime/{showtimeId}")
    @Operation(summary = "Get seats by showtime ID", description = "Retrieve all seats for a specific showtime with booking status")
    public ResponseEntity<ApiResponse> getSeatsByShowtimeId(@PathVariable Integer showtimeId) {
        List<SeatResponse> seats = seatService.getSeatsByShowtimeId(showtimeId);
        return ResponseEntity.ok(ApiResponse.success("Seats retrieved successfully", seats));
    }
}
