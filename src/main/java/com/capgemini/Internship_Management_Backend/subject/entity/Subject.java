package com.capgemini.Internship_Management_Backend.subject.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.subject.dto.AddSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.model.InternType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "subjects")
public class Subject extends BaseEntity {
  private String title;

  @ElementCollection
  private List<String> tasks;

  @Enumerated(EnumType.STRING)
  private InternType internType;

  private String targetSchools;

  private String targetSpecialities;

  @ElementCollection
  private List<String> competenciesRequired;

  private Integer internNumber;

  public Subject(AddSubjectDTO addSubjectDTO) {
    this.title = addSubjectDTO.getTitle();
    this.tasks = addSubjectDTO.getTasks();
    this.internType = addSubjectDTO.getInternType();
    this.targetSchools = addSubjectDTO.getTargetSchools();
    this.targetSpecialities = addSubjectDTO.getTargetSpecialities();
    this.competenciesRequired = addSubjectDTO.getCompetenciesRequired();
    this.internNumber = addSubjectDTO.getInternNumber();
  }
}
