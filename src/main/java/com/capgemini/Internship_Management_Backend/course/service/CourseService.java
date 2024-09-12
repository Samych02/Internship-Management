package com.capgemini.Internship_Management_Backend.course.service;

import com.capgemini.Internship_Management_Backend.course.dto.FetchCoursesForResponsibleDTO;
import com.capgemini.Internship_Management_Backend.course.dto.PushCourseDTO;
import com.capgemini.Internship_Management_Backend.course.entity.Course;
import com.capgemini.Internship_Management_Backend.course.model.CourseStatus;
import com.capgemini.Internship_Management_Backend.course.model.CourseType;
import com.capgemini.Internship_Management_Backend.course.repository.CourseRepository;
import com.capgemini.Internship_Management_Backend.course.repository.projection.CourseProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import com.capgemini.Internship_Management_Backend.user.model.UserRole;
import com.capgemini.Internship_Management_Backend.user.repository.UserRepository;
import com.capgemini.Internship_Management_Backend.user.repository.projection.IDProjection;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CourseService {
  private final CourseRepository courseRepository;
  private final UserRepository userRepository;

  public void addCourse(PushCourseDTO pushCourseDTO) {
    Course course = new Course(pushCourseDTO);
    courseRepository.save(course);
  }

  public List<CourseProjection> getAllPersonalCoursesOfIntern(Integer internID) {
    return courseRepository.findAllProjectedByUserAndCourseTypeOrderByCourseStatusDesc(new User(internID), CourseType.PERSONAL);
  }

  @SneakyThrows
  public List<CourseProjection> getAllObligatoryCoursesOfIntern(Integer internID) {
    // check if obligatory courses are existing for a given user
    List<CourseProjection> obligatoryCoursesList = courseRepository.findAllProjectedByUserAndCourseTypeOrderByCourseStatusDesc(new User(internID), CourseType.OBLIGATORY);
    if (!obligatoryCoursesList.isEmpty()) return obligatoryCoursesList;
    // Otherwise create them
    // the bellow code get called once for every new intern when he visits the obligatory course page for the very first time only
    // We could implement this logic on the account creation, but it is better to do it this way imo
    ClassPathResource resource = new ClassPathResource("obligatoryCourses.json");
    ObjectMapper objectMapper = new ObjectMapper();
    List<Course> obligatoryCourseListInit = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Course>>() {
    });
    for (Course c : obligatoryCourseListInit) {
      c.setCourseStatus(CourseStatus.NOT_STARTED);
      c.setCourseType(CourseType.OBLIGATORY);
      c.setOrganism("Capgemini");
      c.setUser(new User(internID));
      courseRepository.save(c);
    }
    return courseRepository.findAllProjectedByUserAndCourseTypeOrderByCourseStatusDesc(new User(internID), CourseType.OBLIGATORY);
  }

  public List<FetchCoursesForResponsibleDTO> trackCourses() {
    List<IDProjection> internList = userRepository.findAllProjectedByUserRole(UserRole.INTERN);
    List<FetchCoursesForResponsibleDTO> fetchCoursesForResponsibleDTOList = new ArrayList<>();
    FetchCoursesForResponsibleDTO fetchCoursesForResponsibleDTO = new FetchCoursesForResponsibleDTO();
    for (IDProjection intern : internList) {
      fetchCoursesForResponsibleDTO.setCourseProjectionList(getAllObligatoryCoursesOfIntern(intern.getID()));
      fetchCoursesForResponsibleDTO.setInternName(intern.getFirstName() + " " + intern.getLastName());
      fetchCoursesForResponsibleDTOList.add(fetchCoursesForResponsibleDTO);
    }
    return fetchCoursesForResponsibleDTOList;

  }

  public void updateCourseStatus(Integer courseID, CourseStatus courseStatus) {
    Optional<Course> course = courseRepository.findById(courseID);
    if (course.isPresent()) {
      course.get().setCourseStatus(courseStatus);
      courseRepository.save(course.get());
    }
  }
}
