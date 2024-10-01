package com.capgemini.Internship_Management_Backend.report.repository.projection;

import com.capgemini.Internship_Management_Backend.user.repository.projection.UserFullNameProjection;

import java.time.LocalDate;

public interface ReportProjection {
  UserFullNameProjection getIntern();

  String getSummary();

  LocalDate getDate();

  String getPath();
}
