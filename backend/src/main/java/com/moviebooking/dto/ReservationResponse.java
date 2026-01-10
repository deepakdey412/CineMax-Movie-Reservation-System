package com.moviebooking.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {
    private Integer id;
    private Integer userId;
    private String userName;
    private Integer showtimeId;
    private String movieTitle;
    private LocalDateTime showtimeStart;
    private LocalDateTime showtimeEnd;
    private List<String> seatNumbers;
    private LocalDateTime reservationDate;
    private Double totalPrice;
    private Boolean isCancelled;
}
