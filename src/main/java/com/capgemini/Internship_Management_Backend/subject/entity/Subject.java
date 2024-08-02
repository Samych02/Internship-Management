package com.capgemini.Internship_Management_Backend.subject.entity;

import com.capgemini.Internship_Management_Backend.User.entity.User;
import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.subject.dto.AddSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.model.Competency;
import com.capgemini.Internship_Management_Backend.subject.model.InternType;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
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

  @ManyToOne
  @JoinColumn()
  private User specialist;

  @Column(unique = true)
  private String title;

  @ElementCollection
  private List<String> tasks;

  @Enumerated(EnumType.STRING)
  private InternType internType;

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

  private int year = Year.now().getValue();

  private String specialistComment;

  public Subject(AddSubjectDTO addSubjectDTO) {
    this.poster = new User(addSubjectDTO.getId());
    this.title = addSubjectDTO.getTitle();
    this.tasks = addSubjectDTO.getTasks();
    this.internType = addSubjectDTO.getInternType();
    this.targetSchools = addSubjectDTO.getTargetSchools();
    this.targetSpecialities = addSubjectDTO.getTargetSpecialities();
    this.competenciesRequired = addSubjectDTO.getCompetenciesRequired();
    this.supervisor = addSubjectDTO.getSupervisor();
    this.internNumber = addSubjectDTO.getInternNumber();
  }

  @Override
  public String toString() {
    return "Subject{" +
            "specialistComment='" + specialistComment + '\'' +
            ", title='" + title + '\'' +
            ", tasks=" + tasks +
            ", internType=" + internType +
            ", targetSchools=" + targetSchools +
            ", targetSpecialities=" + targetSpecialities +
            ", competenciesRequired=" + competenciesRequired +
            ", supervisor='" + supervisor + '\'' +
            ", internNumber=" + internNumber +
            ", path='" + path + '\'' +
            ", subjectStatus=" + subjectStatus +
            ", year=" + year +
            ", id=" + id +
            ", createdAt=" + createdAt +
            ", updatedAt=" + updatedAt +
            '}';
  }
}
