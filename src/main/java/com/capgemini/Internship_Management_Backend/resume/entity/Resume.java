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

  private String internFullName;
  @Enumerated(EnumType.STRING)
  private StudyField studyField;
  private String path;

  public Resume(PushResumeDTO pushResumeDTO) {
    this.poster = new User(pushResumeDTO.getPosterID());
    this.internFullName = pushResumeDTO.getInternFullName();
    this.studyField = pushResumeDTO.getStudyField();
    this.path = "\\CV\\" + pushResumeDTO.getInternFullName() + "\\CV.pdf";
  }
}
