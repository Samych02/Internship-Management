package com.capgemini.Internship_Management_Backend.courses.service;

import com.capgemini.Internship_Management_Backend.courses.entity.ObligatoryCourses;
import com.capgemini.Internship_Management_Backend.courses.repository.ObligatoryCoursesRepository;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ObligatoryCourseService {
  private final ObligatoryCoursesRepository obligatoryCoursesRepository;

  public ObligatoryCourses getAllObligatoryCoursesOfIntern(Integer internID) {
    Optional<ObligatoryCourses> obligatoryCourses = obligatoryCoursesRepository.findByUser(new User(internID));
    return obligatoryCourses.orElseGet(() -> obligatoryCoursesRepository.save(new ObligatoryCourses(internID)));
  }

}
