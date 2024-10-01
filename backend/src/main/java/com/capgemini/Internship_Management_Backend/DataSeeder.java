package com.capgemini.Internship_Management_Backend;

import com.capgemini.Internship_Management_Backend.user.dto.RegisterDTO;
import com.capgemini.Internship_Management_Backend.user.model.UserRole;
import com.capgemini.Internship_Management_Backend.user.repository.UserRepository;
import com.capgemini.Internship_Management_Backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder {
  private final UserRepository userRepository;

  private final UserService userService;

  @EventListener(ApplicationReadyEvent.class)
  public void seed() {
    // Check if an admin user exists
    if (userRepository.countAllByUserRole(UserRole.ADMIN) == 0) {
      // Create a default admin user
      userService.register(
              RegisterDTO.builder()
                      .email("admin@capgemini.com")
                      .password("1234567890")
                      .firstName("admin")
                      .lastName("admin")
                      .userRole(UserRole.ADMIN)
                      .build()
      );

    }
  }
}
