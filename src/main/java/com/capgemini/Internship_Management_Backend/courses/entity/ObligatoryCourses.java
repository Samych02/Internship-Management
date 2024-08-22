package com.capgemini.Internship_Management_Backend.courses.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.courses.dto.PushCourseDTO;
import com.capgemini.Internship_Management_Backend.courses.model.Course;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.core.io.ClassPathResource;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "obligatory_courses")
public class ObligatoryCourses extends BaseEntity {
  @ManyToOne
  @JoinColumn(nullable = false)
  private User user;

  @ElementCollection
  private List<Course> courses;

  public ObligatoryCourses(PushCourseDTO pushCourseDTO) {
    this.user = new User(pushCourseDTO.getInternID());
    this.courses = pushCourseDTO.getCourseList();
  }

  @SneakyThrows
  public ObligatoryCourses(Integer internID) {
    this.user = new User(internID);
    ClassPathResource resource = new ClassPathResource("obligatoryCourses.json");
    ObjectMapper objectMapper = new ObjectMapper();
    courses = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Course>>() {
    });
  }

}
