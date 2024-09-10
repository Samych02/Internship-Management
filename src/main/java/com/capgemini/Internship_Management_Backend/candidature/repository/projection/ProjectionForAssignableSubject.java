package com.capgemini.Internship_Management_Backend.candidature.repository.projection;

import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjectionForAssociation;

public interface ProjectionForAssignableSubject {
  SubjectProjectionForAssociation getSubject();

}
