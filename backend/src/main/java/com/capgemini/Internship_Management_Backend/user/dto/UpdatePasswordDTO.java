package com.capgemini.Internship_Management_Backend.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdatePasswordDTO {
  @NotNull
  private Integer userID;

  @NotNull
  private String oldPassword;

  @NotNull
  private String newPassword;
}
