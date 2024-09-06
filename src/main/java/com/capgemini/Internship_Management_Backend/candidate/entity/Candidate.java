package com.capgemini.Internship_Management_Backend.candidate.entity;

import com.capgemini.Internship_Management_Backend.candidate.dto.PushCandidateDTO;
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
  private Resume profile;

  @ManyToOne
  @JoinColumn(nullable = false)
  private Subject subject;

  private Boolean firstExchange = false;

  private Boolean technicalInterview = false;

  private LocalDate technicalInterviewDate;

  private Boolean chosen = false;

  private Boolean hrValidation = false;

  public Candidate(PushCandidateDTO pushCandidateDTO) {
    this.supervisor = new User(pushCandidateDTO.getSupervisorID());
    this.profile = new Resume(pushCandidateDTO.getResumeID());
    this.subject = new Subject(pushCandidateDTO.getSubjectID());
  }
}
