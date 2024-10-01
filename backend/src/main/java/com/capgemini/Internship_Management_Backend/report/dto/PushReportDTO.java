package com.capgemini.Internship_Management_Backend.report.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Data
public class PushReportDTO {
  @NotNull
  private Integer internID;
  @NotEmpty
  private String summary;

  //the intern's name is used to create a folder
  // it is being automatically sent by the client and not from a form
  @NotEmpty
  private String fullName;

  @NotNull
  @DateTimeFormat
  private LocalDate date;

  @NotNull
  private MultipartFile file;

}
