package com.capgemini.Internship_Management_Backend.candidature.repository.projection;

import com.capgemini.Internship_Management_Backend.resume.repository.projection.ResumeFullNameProjection;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectTitleProjection;

import java.time.LocalDate;

public interface CandidatureProjectionForResponsible {
  Integer getID();

  ResumeFullNameProjection getResume();

  SubjectTitleProjection getSubject();

  LocalDate getIntegrationDate();

  LocalDate getMaterialRetrievalDate();

  Boolean getBadgeRetrieval();

  Boolean getPlatformAccess();


}
