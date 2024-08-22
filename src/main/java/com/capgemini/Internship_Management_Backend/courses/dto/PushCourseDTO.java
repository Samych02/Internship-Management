package com.capgemini.Internship_Management_Backend.courses.dto;

import com.capgemini.Internship_Management_Backend.courses.model.Course;
import lombok.Data;

import java.util.List;

@Data
public class PushCourseDTO {
  private Integer internID;
  private List<Course> courseList;
}
