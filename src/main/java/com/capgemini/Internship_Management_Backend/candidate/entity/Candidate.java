package com.capgemini.Internship_Management_Backend.candidate.entity;

import com.capgemini.Internship_Management_Backend.candidate.dto.CreateCandidateDTO;
import com.capgemini.Internship_Management_Backend.candidate.dto.UpdateCandidateDTO;
import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "candidate")
public class Candidate extends BaseEntity {
  @ManyToOne
  @JoinColumn(nullable = false)
  private User supervisor;

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

  private Boolean isFinallyAccepted = false;

  public Candidate(CreateCandidateDTO createCandidateDTO) {
    this.supervisor = new User(createCandidateDTO.getSupervisorID());
    this.resume = new Resume(createCandidateDTO.getResumeID());
    this.subject = new Subject(createCandidateDTO.getSubjectID());
  }

  public void update(UpdateCandidateDTO updateCandidateDTO) {
    if (updateCandidateDTO.getFirstExchange() != null) this.setFirstExchange(updateCandidateDTO.getFirstExchange());
    if (updateCandidateDTO.getTechnicalInterview() != null)
      this.setTechnicalInterview(updateCandidateDTO.getTechnicalInterview());
    if (updateCandidateDTO.getTechnicalInterviewDate() != null)
      this.setTechnicalInterviewDate(updateCandidateDTO.getTechnicalInterviewDate());
    if (updateCandidateDTO.getChosen() != null) this.setChosen(updateCandidateDTO.getChosen());
    if (updateCandidateDTO.getHrValidation() != null) this.setHrValidation(updateCandidateDTO.getHrValidation());
    if (updateCandidateDTO.getIsFinallyAccepted() != null)
      this.setIsFinallyAccepted(updateCandidateDTO.getIsFinallyAccepted());
  }
}
