package com.capgemini.Internship_Management_Backend.subject.repository.projection;

import com.capgemini.Internship_Management_Backend.subject.model.InternshipCategory;
import com.capgemini.Internship_Management_Backend.subject.model.InternshipType;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;

public interface SubjectProjection {
  Integer getId();

  String getTitle();

  SubjectStatus getSubjectStatus();

  String getSpecialistComment();

  String getPath();

  InternshipType getInternshipType();

  InternshipCategory getInternshipCategory();

}
