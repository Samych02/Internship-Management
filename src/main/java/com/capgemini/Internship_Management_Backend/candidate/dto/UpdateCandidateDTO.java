package com.capgemini.Internship_Management_Backend.candidate.dto;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class UpdateCandidateDTO {
  private Boolean firstExchange;
  private Boolean technicalInterview;
  @DateTimeFormat
  private LocalDate technicalInterviewDate;
  private Boolean chosen;
  private Boolean hrValidation;
  private Boolean isFinallyAccepted;
}
