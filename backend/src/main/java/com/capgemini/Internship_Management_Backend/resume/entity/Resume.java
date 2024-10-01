package com.capgemini.Internship_Management_Backend.resume.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.resume.dto.PushResumeDTO;
import com.capgemini.Internship_Management_Backend.subject.model.StudyField;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "resumes")
public class Resume extends BaseEntity {
  @ManyToOne
  @JoinColumn(nullable = false)
  private User poster;

  private String internFirstName;

  private String internLastName;

  @Enumerated(EnumType.STRING)
  private StudyField studyField;

  private String path;

  private Boolean validated = false;

  public String getInternFullName() {
    return internFirstName + " " + internLastName;
  }

  public Resume(PushResumeDTO pushResumeDTO) {
    this.poster = new User(pushResumeDTO.getPosterID());
    this.internFirstName = pushResumeDTO.getInternFirstName().substring(0, 1).toUpperCase() + pushResumeDTO.getInternFirstName().substring(1).toLowerCase();
    this.internLastName = pushResumeDTO.getInternLastName().substring(0, 1).toUpperCase() + pushResumeDTO.getInternLastName().substring(1).toLowerCase();
    this.studyField = pushResumeDTO.getStudyField();
    this.path = "/CV/" + getInternFullName() + "/CV.pdf";
  }

  public Resume(Integer ID) {
    this.ID = ID;
  }
}
