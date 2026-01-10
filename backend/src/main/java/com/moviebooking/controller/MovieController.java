package com.moviebooking.controller;

import com.moviebooking.dto.ApiResponse;
import com.moviebooking.dto.MovieRequest;
import com.moviebooking.dto.MovieResponse;
import com.moviebooking.service.MovieService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/movies")
@Tag(name = "Movies", description = "Movie management APIs")
public class MovieController {
    @Autowired
    MovieService movieService;

    @GetMapping
    @Operation(summary = "Get all movies", description = "Retrieve all movies with optional pagination")
    public ResponseEntity<ApiResponse> getAllMovies(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(required = false) Boolean paginated) {
        
        if (paginated != null && !paginated) {
            List<MovieResponse> movies = movieService.getAllMovies();
            return ResponseEntity.ok(ApiResponse.success("Movies retrieved successfully", movies));
        }
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy).descending());
        Page<MovieResponse> movies = movieService.getAllMovies(pageable);
        return ResponseEntity.ok(ApiResponse.success("Movies retrieved successfully", movies));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get movie by ID", description = "Retrieve a specific movie by its ID")
    public ResponseEntity<ApiResponse> getMovieById(@PathVariable Integer id) {
        MovieResponse movie = movieService.getMovieById(id);
        return ResponseEntity.ok(ApiResponse.success("Movie retrieved successfully", movie));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Create movie", description = "Create a new movie (Admin only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> createMovie(@Valid @RequestBody MovieRequest request) {
        MovieResponse movie = movieService.createMovie(request);
        return ResponseEntity.ok(ApiResponse.success("Movie created successfully", movie));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Update movie", description = "Update an existing movie (Admin only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> updateMovie(@PathVariable Integer id, @Valid @RequestBody MovieRequest request) {
        MovieResponse movie = movieService.updateMovie(id, request);
        return ResponseEntity.ok(ApiResponse.success("Movie updated successfully", movie));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Delete movie", description = "Delete a movie (Admin only)", security = @SecurityRequirement(name = "bearerAuth"))
    public ResponseEntity<ApiResponse> deleteMovie(@PathVariable Integer id) {
        movieService.deleteMovie(id);
        return ResponseEntity.ok(ApiResponse.success("Movie deleted successfully"));
    }
}
