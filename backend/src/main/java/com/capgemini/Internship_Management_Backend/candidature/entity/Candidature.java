package com.capgemini.Internship_Management_Backend.candidature.entity;

import com.capgemini.Internship_Management_Backend.candidature.dto.AddCandidatureDTO;
import com.capgemini.Internship_Management_Backend.candidature.dto.UpdateCandidatureDTO;
import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "candidatures")
public class Candidature extends BaseEntity {
  @ManyToOne
  @JoinColumn(nullable = false)
  private User supervisor;

  @ManyToOne
  @JoinColumn
  //for when finally accepted
  private User intern;

  @ManyToOne
  @JoinColumn(nullable = false)
  private Resume resume;

  @ManyToOne
  @JoinColumn(nullable = false)
  private Subject subject;

  private Boolean firstExchange = false;

  private Boolean technicalInterview = false;

  private LocalDate technicalInterviewDate;

  private Boolean chosen = false;

  private Boolean hrValidation = false;

  @Enumerated(EnumType.STRING)
  // why not reusing classes for other purposes? :p
  private SubjectStatus status = SubjectStatus.PENDING;

  private LocalDate integrationDate;

  private LocalDate materialRetrievalDate;

  private Boolean badgeRetrieval = false;

  private Boolean platformAccess = false;

  public Candidature(AddCandidatureDTO addCandidatureDTO) {
    this.supervisor = new User(addCandidatureDTO.getSupervisorID());
    this.resume = new Resume(addCandidatureDTO.getResumeID());
    this.subject = new Subject(addCandidatureDTO.getSubjectID());
  }

  public void update(UpdateCandidatureDTO updateCandidatureDTO) {
    if (updateCandidatureDTO.getFirstExchange() != null) this.setFirstExchange(updateCandidatureDTO.getFirstExchange());
    if (updateCandidatureDTO.getTechnicalInterview() != null)
      this.setTechnicalInterview(updateCandidatureDTO.getTechnicalInterview());
    if (updateCandidatureDTO.getTechnicalInterviewDate() != null)
      this.setTechnicalInterviewDate(updateCandidatureDTO.getTechnicalInterviewDate());
    if (updateCandidatureDTO.getChosen() != null) this.setChosen(updateCandidatureDTO.getChosen());
    if (updateCandidatureDTO.getHrValidation() != null) this.setHrValidation(updateCandidatureDTO.getHrValidation());
    if (updateCandidatureDTO.getStatus() != null) this.setStatus(updateCandidatureDTO.getStatus());
    if (updateCandidatureDTO.getIntegrationDate() != null)
      this.setIntegrationDate(updateCandidatureDTO.getIntegrationDate());
    if (updateCandidatureDTO.getMaterialRetrievalDate() != null)
      this.setMaterialRetrievalDate(updateCandidatureDTO.getMaterialRetrievalDate());
    if (updateCandidatureDTO.getBadgeRetrieval() != null)
      this.setBadgeRetrieval(updateCandidatureDTO.getBadgeRetrieval());
    if (updateCandidatureDTO.getPlatformAccess() != null)
      this.setPlatformAccess(updateCandidatureDTO.getPlatformAccess());
  }
}
