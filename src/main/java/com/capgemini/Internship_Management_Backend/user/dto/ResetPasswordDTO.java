package com.capgemini.Internship_Management_Backend.user.dto;

import lombok.Data;

@Data
public class ResetPasswordDTO {
  private Integer userID;
  private String newPassword;
}
