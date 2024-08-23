package com.capgemini.Internship_Management_Backend.course.repository.projection;

import com.capgemini.Internship_Management_Backend.course.model.CourseStatus;

public interface CourseProjection {
  Integer getId();

  String getTitle();

  String getOrganism();

  String getLink();

  CourseStatus getCourseStatus();
}
