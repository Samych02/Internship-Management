package com.capgemini.Internship_Management_Backend.course.dto;

import com.capgemini.Internship_Management_Backend.course.model.CourseStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PushCourseDTO {
  @NotNull
  private Integer internID;
  @NotEmpty
  private String title;
  @NotEmpty
  private String link;
  @NotEmpty
  private String organism;
  @NotNull
  private CourseStatus courseStatus;
}
