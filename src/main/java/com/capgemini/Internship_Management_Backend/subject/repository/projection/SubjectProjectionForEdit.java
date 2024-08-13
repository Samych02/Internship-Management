package com.capgemini.Internship_Management_Backend.subject.repository.projection;

import com.capgemini.Internship_Management_Backend.subject.model.Competency;
import com.capgemini.Internship_Management_Backend.subject.model.InternType;
import com.capgemini.Internship_Management_Backend.subject.model.InternshipCategory;
import com.capgemini.Internship_Management_Backend.subject.model.InternshipType;

import java.util.List;

public interface SubjectProjectionForEdit {
  Integer getId();

  String getTitle();

  List<String> getTasks();

  InternType getInternType();

  List<String> getTargetSchools();

  List<String> getTargetSpecialities();

  List<Competency> getCompetenciesRequired();

  InternshipType getInternshipType();

  InternshipCategory getInternshipCategory();

  String getSupervisor();

  Integer getInternNumber();
}
