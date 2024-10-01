package com.capgemini.Internship_Management_Backend.internship.dto;

import com.capgemini.Internship_Management_Backend.subject.model.InternshipType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PushInternshipDTO {
  @NotNull
  private String title;
  private String team;
  private String managerFullName;
  @NotNull
  private Integer year;
  private String internFullName;
  private String schoolName;
  private String supervisorFullName;
  @NotNull
  private InternshipType internshipType;
  @NotNull
  private MultipartFile reportFile;
  private MultipartFile presentationFile;
}
