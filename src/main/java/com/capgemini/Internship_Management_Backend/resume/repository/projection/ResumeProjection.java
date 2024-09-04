package com.capgemini.Internship_Management_Backend.resume.repository.projection;

import com.capgemini.Internship_Management_Backend.subject.model.StudyField;

public interface ResumeProjection {
  String getInternFullName();

  StudyField getStudyField();

  String getPath();

}
