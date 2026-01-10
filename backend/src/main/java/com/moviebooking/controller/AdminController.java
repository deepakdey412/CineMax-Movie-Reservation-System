package com.moviebooking.controller;

import com.moviebooking.dto.ApiResponse;
import com.moviebooking.dto.ReportResponse;
import com.moviebooking.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin management APIs")
public class AdminController {
    @Autowired
    ReportService reportService;

    @GetMapping("/reports")
    @Operation(summary = "Generate reports", description = "Get total reservations, revenue per movie, and seat occupancy per showtime", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> generateReports() {
        ReportResponse reports = reportService.generateReports();
        return ResponseEntity.ok(ApiResponse.success("Reports generated successfully", reports));
    }
}
