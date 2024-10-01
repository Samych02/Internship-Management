package com.capgemini.Internship_Management_Backend.user.dto;

import com.capgemini.Internship_Management_Backend.user.model.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class EditRoleDTO {
  @NotNull
  private Integer userID;
  @NotNull
  private UserRole newUserRole;
}
