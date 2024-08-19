package com.capgemini.Internship_Management_Backend.user.dto;

import com.capgemini.Internship_Management_Backend.user.entity.User;
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
    private Integer id;

    private String email;

    private String userRole;

    private String name;

    private String image;

    public response(User user) {
      this.id = user.getId();
      this.email = user.getEmail();
      this.userRole = user.getUserRole();
      this.image = user.getImage();
      this.name = user.getFullName();
    }

  }
}
