package com.capgemini.Internship_Management_Backend.courses.repository;

import com.capgemini.Internship_Management_Backend.courses.entity.ObligatoryCourses;
import com.capgemini.Internship_Management_Backend.courses.repository.projection.ObligatoryCoursesProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObligatoryCoursesRepository extends JpaRepository<ObligatoryCourses, Integer> {
  ObligatoryCoursesProjection findProjectedByUser(User user);
}
