package com.capgemini.Internship_Management_Backend.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
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

  @NotEmpty(message = "User role is required.")
  private String userRole;
}
