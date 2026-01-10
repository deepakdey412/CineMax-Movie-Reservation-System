package com.moviebooking.service;

import com.moviebooking.dto.ReservationRequest;
import com.moviebooking.dto.ReservationResponse;
import com.moviebooking.entity.Reservation;
import com.moviebooking.entity.Seat;
import com.moviebooking.entity.Showtime;
import com.moviebooking.entity.User;
import com.moviebooking.exception.BadRequestException;
import com.moviebooking.exception.ResourceNotFoundException;
import com.moviebooking.exception.UnauthorizedException;
import com.moviebooking.repository.ReservationRepository;
import com.moviebooking.repository.SeatRepository;
import com.moviebooking.repository.ShowtimeRepository;
import com.moviebooking.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private ShowtimeRepository showtimeRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private UserRepository userRepository;

    private static final double SEAT_PRICE = 250.0;

    @Transactional
    public ReservationResponse createReservation(Integer userId, ReservationRequest request) {
        Showtime showtime = showtimeRepository.findById(request.getShowtimeId())
                .orElseThrow(() -> new ResourceNotFoundException("Showtime not found with id: " + request.getShowtimeId()));

        if (showtime.getStartTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Cannot book seats for past showtimes");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // Use pessimistic locking to prevent double booking
        List<Seat> seats = seatRepository.findByShowtimeIdAndSeatNumbersForUpdate(
                request.getShowtimeId(), request.getSeatNumbers());

        if (seats.size() != request.getSeatNumbers().size()) {
            throw new BadRequestException("One or more seats not found");
        }

        // Check if any seat is already booked
        for (Seat seat : seats) {
            if (seat.getIsBooked()) {
                throw new BadRequestException("Seat " + seat.getSeatNumber() + " is already booked");
            }
        }

        // Mark seats as booked
        seats.forEach(seat -> seat.setIsBooked(true));
        seatRepository.saveAll(seats);

        // Create reservation
        Reservation reservation = new Reservation();
        reservation.setUser(user);
        reservation.setShowtime(showtime);
        reservation.setSeats(seats);
        reservation.setReservationDate(LocalDateTime.now());
        reservation.setTotalPrice(SEAT_PRICE * seats.size());
        reservation.setIsCancelled(false);

        Reservation savedReservation = reservationRepository.save(reservation);
        return mapToResponse(savedReservation);
    }

    @Transactional
    public ReservationResponse cancelReservation(Integer reservationId, Integer userId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + reservationId));

        if (!reservation.getUser().getId().equals(userId)) {
            throw new UnauthorizedException("You can only cancel your own reservations");
        }

        if (reservation.getIsCancelled()) {
            throw new BadRequestException("Reservation is already cancelled");
        }

        if (reservation.getShowtime().getStartTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("Cannot cancel past reservations");
        }

        reservation.setIsCancelled(true);

        // Release seats
        reservation.getSeats().forEach(seat -> seat.setIsBooked(false));
        seatRepository.saveAll(reservation.getSeats());

        Reservation cancelledReservation = reservationRepository.save(reservation);
        return mapToResponse(cancelledReservation);
    }

    public List<ReservationResponse> getUserReservations(Integer userId) {
        return reservationRepository.findByUserIdAndIsCancelledFalse(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ReservationResponse> getUserUpcomingReservations(Integer userId) {
        return reservationRepository.findUpcomingReservationsByUserId(userId, LocalDateTime.now()).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public ReservationResponse getReservationById(Integer reservationId, Integer userId) {
        Reservation reservation = reservationRepository.findByIdAndUserId(reservationId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id: " + reservationId));
        return mapToResponse(reservation);
    }

    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.findAllActiveReservations().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ReservationResponse mapToResponse(Reservation reservation) {
        List<String> seatNumbers = reservation.getSeats().stream()
                .map(Seat::getSeatNumber)
                .collect(Collectors.toList());

        return new ReservationResponse(
                reservation.getId(),
                reservation.getUser().getId(),
                reservation.getUser().getName(),
                reservation.getShowtime().getId(),
                reservation.getShowtime().getMovie().getTitle(),
                reservation.getShowtime().getStartTime(),
                reservation.getShowtime().getEndTime(),
                seatNumbers,
                reservation.getReservationDate(),
                reservation.getTotalPrice(),
                reservation.getIsCancelled()
        );
    }
}
