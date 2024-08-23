package com.capgemini.Internship_Management_Backend.course.dto;

import com.capgemini.Internship_Management_Backend.course.model.CourseStatus;
import lombok.Data;

@Data
public class PushCourseDTO {
  private Integer internID;
  private String title;
  private String link;
  private String organism;
  private CourseStatus courseStatus;
}
