package com.moviebooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportResponse {
    private Long totalReservations;
    private Double totalRevenue;
    private List<MovieRevenueResponse> movieRevenues;
    private List<ShowtimeOccupancyResponse> showtimeOccupancies;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MovieRevenueResponse {
        private Integer movieId;
        private String movieTitle;
        private Long reservationCount;
        private Double revenue;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ShowtimeOccupancyResponse {
        private Integer showtimeId;
        private String movieTitle;
        private Integer totalSeats;
        private Integer bookedSeats;
        private Double occupancyPercentage;
    }
}
