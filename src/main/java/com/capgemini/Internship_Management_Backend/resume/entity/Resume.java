package com.capgemini.Internship_Management_Backend.resume.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.resume.dto.PushResumeDTO;
import com.capgemini.Internship_Management_Backend.subject.model.StudyField;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "resumes")
public class Resume extends BaseEntity {
  private String internFullName;
  @Enumerated(EnumType.STRING)
  private StudyField studyField;
  private String path;

  public Resume(PushResumeDTO pushResumeDTO) {
    this.internFullName = pushResumeDTO.getInternFullName();
    this.studyField = pushResumeDTO.getStudyField();
    this.path = "\\CV\\" + pushResumeDTO.getInternFullName() + "\\CV.pdf";
  }
}
