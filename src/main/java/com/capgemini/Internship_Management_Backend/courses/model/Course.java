package com.capgemini.Internship_Management_Backend.courses.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Embeddable
public class Course {
  private String title;
  @Column(columnDefinition = "TEXT")
  private String link;

  @Enumerated(EnumType.STRING)
  private CourseStatus courseStatus;

  public Course(String title, String link, CourseStatus courseStatus) {
    this.title = title;
    this.link = link;
    this.courseStatus = courseStatus;
  }
}
