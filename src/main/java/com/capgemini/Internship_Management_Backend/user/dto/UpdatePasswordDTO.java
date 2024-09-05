package com.capgemini.Internship_Management_Backend.user.dto;

import lombok.Data;

@Data
public class UpdatePasswordDTO {
  private Integer userID;
  private String oldPassword;
  private String newPassword;
}
