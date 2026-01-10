package com.moviebooking.config;

import com.moviebooking.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private AuthService authService;

    @Override
    public void run(String... args) throws Exception {
        authService.seedAdmin();
        System.out.println("Admin user seeded successfully!");
    }
}
