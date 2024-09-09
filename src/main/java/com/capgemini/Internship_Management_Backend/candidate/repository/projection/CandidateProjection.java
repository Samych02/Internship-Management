package com.capgemini.Internship_Management_Backend.candidate.repository.projection;

import com.capgemini.Internship_Management_Backend.resume.repository.projection.ResumeFullNameProjection;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectTitleProjection;

import java.time.LocalDate;

public interface CandidateProjection {
  Integer getId();

  ResumeFullNameProjection getResume();

  SubjectTitleProjection getSubject();

  Boolean getFirstExchange();

  Boolean getTechnicalInterview();

  LocalDate getTechnicalInterviewDate();

  Boolean getChosen();

  Boolean getHrValidation();

  Boolean getIsFinallyAccepted();

}
