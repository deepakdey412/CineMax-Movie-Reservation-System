package com.moviebooking.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class MovieRequest {
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Genre is required")
    @Size(max = 50, message = "Genre must not exceed 50 characters")
    private String genre;

    @NotBlank(message = "Poster URL is required")
    @Size(max = 500, message = "Poster URL must not exceed 500 characters")
    private String posterUrl;
}
