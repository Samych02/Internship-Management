package com.capgemini.Internship_Management_Backend.course.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.course.dto.PushCourseDTO;
import com.capgemini.Internship_Management_Backend.course.model.CourseStatus;
import com.capgemini.Internship_Management_Backend.course.model.CourseType;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "courses")
public class Course extends BaseEntity {
  @ManyToOne
  @JoinColumn(nullable = false)
  private User user;

  private String title;

  private String organism;

  @Column(columnDefinition = "TEXT")
  private String link;

  @Enumerated(EnumType.STRING)
  private CourseStatus courseStatus;

  @Enumerated(EnumType.STRING)
  private CourseType courseType;


  public Course(PushCourseDTO pushCourseDTO) {
    this.user = new User(pushCourseDTO.getInternID());
    this.title = pushCourseDTO.getTitle();
    this.link = pushCourseDTO.getLink();
    this.organism = pushCourseDTO.getOrganism();
    this.courseStatus = pushCourseDTO.getCourseStatus();
    this.courseType = CourseType.PERSONAL;
  }
}
