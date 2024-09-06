package com.capgemini.Internship_Management_Backend.resume.repository.projection;

import com.capgemini.Internship_Management_Backend.subject.model.StudyField;
import com.capgemini.Internship_Management_Backend.user.repository.projection.UserFullNameProjection;

public interface ResumeProjection {
  Integer getId();

  UserFullNameProjection getPoster();

  String getInternFirstName();

  String getInternLastName();

  StudyField getStudyField();

  String getPath();

}
