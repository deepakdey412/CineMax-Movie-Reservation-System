package com.moviebooking.controller;

import com.moviebooking.dto.ApiResponse;
import com.moviebooking.dto.ReservationRequest;
import com.moviebooking.dto.ReservationResponse;
import com.moviebooking.security.JwtUtils;
import com.moviebooking.service.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/reservations")
@Tag(name = "Reservations", description = "Reservation management APIs")
public class ReservationController {
    @Autowired
    ReservationService reservationService;

    @Autowired
    JwtUtils jwtUtils;

    private Integer getUserIdFromRequest(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            return jwtUtils.getUserIdFromJwtToken(token);
        }
        throw new RuntimeException("Unauthorized");
    }

    @PostMapping
    @Operation(summary = "Create reservation", description = "Create a new reservation with multiple seats (transactional)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> createReservation(@Valid @RequestBody ReservationRequest request, HttpServletRequest httpRequest) {
        Integer userId = getUserIdFromRequest(httpRequest);
        ReservationResponse reservation = reservationService.createReservation(userId, request);
        return ResponseEntity.ok(ApiResponse.success("Reservation created successfully", reservation));
    }

    @GetMapping("/my-reservations")
    @Operation(summary = "Get user reservations", description = "Retrieve all reservations for the authenticated user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> getUserReservations(HttpServletRequest httpRequest) {
        Integer userId = getUserIdFromRequest(httpRequest);
        List<ReservationResponse> reservations = reservationService.getUserReservations(userId);
        return ResponseEntity.ok(ApiResponse.success("Reservations retrieved successfully", reservations));
    }

    @GetMapping("/my-upcoming-reservations")
    @Operation(summary = "Get user upcoming reservations", description = "Retrieve all upcoming reservations for the authenticated user", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> getUserUpcomingReservations(HttpServletRequest httpRequest) {
        Integer userId = getUserIdFromRequest(httpRequest);
        List<ReservationResponse> reservations = reservationService.getUserUpcomingReservations(userId);
        return ResponseEntity.ok(ApiResponse.success("Upcoming reservations retrieved successfully", reservations));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get reservation by ID", description = "Retrieve a specific reservation by its ID", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> getReservationById(@PathVariable Integer id, HttpServletRequest httpRequest) {
        Integer userId = getUserIdFromRequest(httpRequest);
        ReservationResponse reservation = reservationService.getReservationById(id, userId);
        return ResponseEntity.ok(ApiResponse.success("Reservation retrieved successfully", reservation));
    }

    @PutMapping("/{id}/cancel")
    @Operation(summary = "Cancel reservation", description = "Cancel an upcoming reservation (only owner can cancel)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> cancelReservation(@PathVariable Integer id, HttpServletRequest httpRequest) {
        Integer userId = getUserIdFromRequest(httpRequest);
        ReservationResponse reservation = reservationService.cancelReservation(id, userId);
        return ResponseEntity.ok(ApiResponse.success("Reservation cancelled successfully", reservation));
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Get all reservations", description = "Retrieve all active reservations (Admin only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> getAllReservations() {
        List<ReservationResponse> reservations = reservationService.getAllReservations();
        return ResponseEntity.ok(ApiResponse.success("Reservations retrieved successfully", reservations));
    }
}
