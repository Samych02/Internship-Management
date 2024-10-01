package com.capgemini.Internship_Management_Backend.course.repository;

import com.capgemini.Internship_Management_Backend.course.entity.Course;
import com.capgemini.Internship_Management_Backend.course.model.CourseType;
import com.capgemini.Internship_Management_Backend.course.repository.projection.CourseProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
  List<CourseProjection> findAllProjectedByUserAndCourseTypeOrderByCourseStatusDesc(User user, CourseType courseType);
}
