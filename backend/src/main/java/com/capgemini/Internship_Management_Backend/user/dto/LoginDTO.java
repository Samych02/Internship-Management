package com.capgemini.Internship_Management_Backend.user.dto;

import com.capgemini.Internship_Management_Backend.user.entity.User;
import com.capgemini.Internship_Management_Backend.user.model.UserRole;
import jakarta.validation.constraints.NotEmpty;
import lombok.Builder;
import lombok.Data;

public class LoginDTO {
  @Data
  @Builder
  public static class request {
    @NotEmpty(message = "Email is required.")
    private String email;

    @NotEmpty(message = "Password is required.")
    private String password;
  }

  @Data
  public static class response {
    private Integer ID;

    private String email;

    private UserRole userRole;

    private String name;

    private String image;

    public response(User user) {
      this.ID = user.getID();
      this.email = user.getEmail();
      this.userRole = user.getUserRole();
      this.image = user.getImage();
      this.name = user.getFullName();
    }

  }
}
