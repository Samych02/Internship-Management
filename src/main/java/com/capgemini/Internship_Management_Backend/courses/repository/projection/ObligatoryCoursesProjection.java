package com.capgemini.Internship_Management_Backend.courses.repository.projection;

import com.capgemini.Internship_Management_Backend.courses.model.Course;

import java.util.List;

public interface ObligatoryCoursesProjection {
  List<Course> getCourses();
}
