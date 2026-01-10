package com.moviebooking.controller;

import com.moviebooking.dto.ApiResponse;
import com.moviebooking.dto.ShowtimeRequest;
import com.moviebooking.dto.ShowtimeResponse;
import com.moviebooking.service.ShowtimeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/showtimes")
@Tag(name = "Showtimes", description = "Showtime management APIs")
public class ShowtimeController {
    @Autowired
    ShowtimeService showtimeService;

    @GetMapping
    @Operation(summary = "Get all upcoming showtimes", description = "Retrieve all upcoming showtimes")
    public ResponseEntity<ApiResponse> getAllUpcomingShowtimes() {
        List<ShowtimeResponse> showtimes = showtimeService.getAllUpcomingShowtimes();
        return ResponseEntity.ok(ApiResponse.success("Showtimes retrieved successfully", showtimes));
    }

    @GetMapping("/movie/{movieId}")
    @Operation(summary = "Get showtimes by movie ID", description = "Retrieve all showtimes for a specific movie")
    public ResponseEntity<ApiResponse> getShowtimesByMovieId(@PathVariable Integer movieId) {
        List<ShowtimeResponse> showtimes = showtimeService.getShowtimesByMovieId(movieId);
        return ResponseEntity.ok(ApiResponse.success("Showtimes retrieved successfully", showtimes));
    }

    @GetMapping("/movie/{movieId}/date")
    @Operation(summary = "Get showtimes by movie ID and date", description = "Retrieve showtimes for a specific movie on a specific date")
    public ResponseEntity<ApiResponse> getShowtimesByMovieIdAndDate(
            @PathVariable Integer movieId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date) {
        List<ShowtimeResponse> showtimes = showtimeService.getShowtimesByMovieIdAndDate(movieId, date);
        return ResponseEntity.ok(ApiResponse.success("Showtimes retrieved successfully", showtimes));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get showtime by ID", description = "Retrieve a specific showtime by its ID")
    public ResponseEntity<ApiResponse> getShowtimeById(@PathVariable Integer id) {
        ShowtimeResponse showtime = showtimeService.getShowtimeById(id);
        return ResponseEntity.ok(ApiResponse.success("Showtime retrieved successfully", showtime));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create showtime", description = "Create a new showtime with auto-generated seats (Admin only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> createShowtime(@Valid @RequestBody ShowtimeRequest request) {
        ShowtimeResponse showtime = showtimeService.createShowtime(request);
        return ResponseEntity.ok(ApiResponse.success("Showtime created successfully", showtime));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update showtime", description = "Update an existing showtime (Admin only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> updateShowtime(@PathVariable Integer id, @Valid @RequestBody ShowtimeRequest request) {
        ShowtimeResponse showtime = showtimeService.updateShowtime(id, request);
        return ResponseEntity.ok(ApiResponse.success("Showtime updated successfully", showtime));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete showtime", description = "Delete a showtime (Admin only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> deleteShowtime(@PathVariable Integer id) {
        showtimeService.deleteShowtime(id);
        return ResponseEntity.ok(ApiResponse.success("Showtime deleted successfully"));
    }
}
