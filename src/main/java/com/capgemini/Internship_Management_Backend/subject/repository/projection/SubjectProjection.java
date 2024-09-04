package com.capgemini.Internship_Management_Backend.subject.repository.projection;

import com.capgemini.Internship_Management_Backend.subject.model.InternshipType;
import com.capgemini.Internship_Management_Backend.subject.model.StudyField;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.user.repository.projection.UserFullNameProjection;

public interface SubjectProjection {
  Integer getId();

  UserFullNameProjection getPoster();

  String getTitle();

  SubjectStatus getSubjectStatus();

  String getSpecialistComment();

  String getPath();

  InternshipType getInternshipType();

  StudyField getStudyField();

}
