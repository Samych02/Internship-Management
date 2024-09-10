package com.capgemini.Internship_Management_Backend.candidature.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AcceptCandidatureDTO {
  @NotNull
  private Integer candidatureId;

  @NotNull
  private String email;

  @NotNull
  private String password;
}
