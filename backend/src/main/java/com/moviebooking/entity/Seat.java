package com.moviebooking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seats", indexes = {
    @Index(name = "idx_showtime_id", columnList = "showtime_id"),
    @Index(name = "idx_showtime_seat_number", columnList = "showtime_id,seatNumber", unique = true)
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showtime_id", nullable = false)
    private Showtime showtime;

    @Column(nullable = false, length = 10)
    private String seatNumber;

    @Column(nullable = false)
    private Boolean isBooked = false;

    @Version
    private Long version;
}
