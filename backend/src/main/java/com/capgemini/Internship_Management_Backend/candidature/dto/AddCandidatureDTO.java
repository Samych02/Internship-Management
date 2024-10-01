package com.capgemini.Internship_Management_Backend.candidature.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddCandidatureDTO {
  @NotNull
  private Integer supervisorID;

  @NotNull
  private Integer resumeID;

  @NotNull
  private Integer subjectID;
}
