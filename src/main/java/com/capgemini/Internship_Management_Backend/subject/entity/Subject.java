package com.capgemini.Internship_Management_Backend.subject.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.subject.dto.PushSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.model.*;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.Year;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "subjects")
public class Subject extends BaseEntity {
  @ManyToOne
  @JoinColumn(nullable = false)
  private User poster;

  @Column(unique = true)
  private String title;

  @ElementCollection
  private List<String> tasks;

  @Enumerated(EnumType.STRING)
  private InternType internType;

  @Enumerated(EnumType.STRING)
  private StudyField studyField;

  @ElementCollection
  private List<String> targetSchools;

  @ElementCollection
  private List<String> targetSpecialities;

  @ElementCollection
  private List<Competency> competenciesRequired;

  private String supervisor;

  private Integer internNumber;

  private String path;

  @Enumerated(EnumType.STRING)
  private SubjectStatus subjectStatus = SubjectStatus.PENDING;

  @Enumerated(EnumType.STRING)
  private InternshipType internshipType;

  private int year = Year.now().getValue();

  private String specialistComment;

  public Subject(PushSubjectDTO pushSubjectDTO) {
    this.poster = new User(pushSubjectDTO.getPosterId());
    this.title = pushSubjectDTO.getTitle();
    this.tasks = pushSubjectDTO.getTasks();
    this.internType = pushSubjectDTO.getInternType();
    this.targetSchools = pushSubjectDTO.getTargetSchools();
    this.targetSpecialities = pushSubjectDTO.getTargetSpecialities();
    this.competenciesRequired = pushSubjectDTO.getCompetenciesRequired();
    this.internshipType = pushSubjectDTO.getInternshipType();
    this.supervisor = pushSubjectDTO.getSupervisor();
    this.internNumber = pushSubjectDTO.getInternNumber();
    this.studyField = pushSubjectDTO.getStudyField();
  }

  public Subject(Integer id) {
    this.id = id;
  }
}
