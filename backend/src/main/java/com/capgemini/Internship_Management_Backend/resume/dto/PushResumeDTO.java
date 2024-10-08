package com.capgemini.Internship_Management_Backend.resume.dto;

import com.capgemini.Internship_Management_Backend.subject.model.StudyField;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PushResumeDTO {
  @NotNull
  private Integer posterID;

  @NotEmpty
  private String internFirstName;

  @NotEmpty
  private String internLastName;

  @NotNull
  private StudyField studyField;

  @NotNull
  private MultipartFile file;
}
