package com.moviebooking.service;

import com.moviebooking.dto.ReportResponse;
import com.moviebooking.entity.Reservation;
import com.moviebooking.repository.ReservationRepository;
import com.moviebooking.repository.ShowtimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReportService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    public ReportResponse generateReports() {
        List<Reservation> allReservations = reservationRepository.findAllActiveReservations();

        // Total reservations
        long totalReservations = allReservations.size();

        // Total revenue
        double totalRevenue = allReservations.stream()
                .mapToDouble(Reservation::getTotalPrice)
                .sum();

        // Revenue per movie
        Map<Integer, List<Reservation>> reservationsByMovie = allReservations.stream()
                .collect(Collectors.groupingBy(r -> r.getShowtime().getMovie().getId()));

        List<ReportResponse.MovieRevenueResponse> movieRevenues = reservationsByMovie.entrySet().stream()
                .map(entry -> {
                    List<Reservation> movieReservations = entry.getValue();
                    double revenue = movieReservations.stream()
                            .mapToDouble(Reservation::getTotalPrice)
                            .sum();
                    String movieTitle = movieReservations.get(0).getShowtime().getMovie().getTitle();

                    return new ReportResponse.MovieRevenueResponse(
                            entry.getKey(),
                            movieTitle,
                            (long) movieReservations.size(),
                            revenue
                    );
                })
                .collect(Collectors.toList());

        // Occupancy per showtime
        List<ReportResponse.ShowtimeOccupancyResponse> showtimeOccupancies = showtimeRepository.findAll().stream()
                .map(showtime -> {
                    List<Reservation> showtimeReservations = allReservations.stream()
                            .filter(r -> r.getShowtime().getId().equals(showtime.getId()))
                            .collect(Collectors.toList());

                    long bookedSeats = showtimeReservations.stream()
                            .mapToLong(r -> r.getSeats().size())
                            .sum();

                    double occupancyPercentage = showtime.getTotalSeats() > 0
                            ? (bookedSeats * 100.0) / showtime.getTotalSeats()
                            : 0.0;

                    return new ReportResponse.ShowtimeOccupancyResponse(
                            showtime.getId(),
                            showtime.getMovie().getTitle(),
                            showtime.getTotalSeats(),
                            (int) bookedSeats,
                            occupancyPercentage
                    );
                })
                .collect(Collectors.toList());

        return new ReportResponse(totalReservations, totalRevenue, movieRevenues, showtimeOccupancies);
    }
}
