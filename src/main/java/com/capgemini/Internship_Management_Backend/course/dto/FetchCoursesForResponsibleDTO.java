package com.capgemini.Internship_Management_Backend.course.dto;

import com.capgemini.Internship_Management_Backend.course.repository.projection.CourseProjection;
import lombok.Data;

import java.util.List;

@Data
public class FetchCoursesForResponsibleDTO {
  List<CourseProjection> courseProjectionList;
  String internName;

}
