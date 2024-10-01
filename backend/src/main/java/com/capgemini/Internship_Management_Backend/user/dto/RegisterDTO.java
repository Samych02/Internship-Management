package com.capgemini.Internship_Management_Backend.user.dto;

import com.capgemini.Internship_Management_Backend.user.model.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterDTO {
  @NotEmpty(message = "Email is required.")
  @Email
  private String email;

  @NotEmpty(message = "Password is required.")
  private String password;

  @NotEmpty(message = "First Name is required.")
  private String firstName;

  @NotEmpty(message = "Last Name is required.")
  private String lastName;

  @NotNull(message = "User role is required.")
  private UserRole userRole;
}
