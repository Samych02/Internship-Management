package com.capgemini.Internship_Management_Backend.candidate.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PushCandidateDTO {
  @NotNull
  private Integer supervisorID;

  @NotNull
  private Integer resumeID;

  @NotNull
  private Integer subjectID;
}
