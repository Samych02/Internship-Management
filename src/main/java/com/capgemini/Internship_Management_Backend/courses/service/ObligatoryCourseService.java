package com.capgemini.Internship_Management_Backend.courses.service;

import com.capgemini.Internship_Management_Backend.courses.entity.ObligatoryCourses;
import com.capgemini.Internship_Management_Backend.courses.repository.ObligatoryCoursesRepository;
import com.capgemini.Internship_Management_Backend.courses.repository.projection.ObligatoryCoursesProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ObligatoryCourseService {
  private final ObligatoryCoursesRepository obligatoryCoursesRepository;

  public ObligatoryCoursesProjection getAllObligatoryCoursesOfIntern(Integer internID) {
    ObligatoryCoursesProjection obligatoryCourses = obligatoryCoursesRepository.findProjectedByUser(new User(internID));
    if (obligatoryCourses != null) return obligatoryCourses;
    obligatoryCoursesRepository.save(new ObligatoryCourses(internID));
    return obligatoryCoursesRepository.findProjectedByUser(new User(internID));
  }
}
