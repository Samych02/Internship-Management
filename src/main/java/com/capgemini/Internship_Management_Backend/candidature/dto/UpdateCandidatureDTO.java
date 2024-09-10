package com.capgemini.Internship_Management_Backend.candidature.dto;

import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
public class UpdateCandidatureDTO {
  private Boolean firstExchange;
  private Boolean technicalInterview;
  @DateTimeFormat
  private LocalDate technicalInterviewDate;
  private Boolean chosen;
  private Boolean hrValidation;
  private SubjectStatus status;
}
