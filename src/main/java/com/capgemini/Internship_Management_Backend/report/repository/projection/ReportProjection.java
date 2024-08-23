package com.capgemini.Internship_Management_Backend.report.repository.projection;

import java.time.LocalDate;

public interface ReportProjection {
  String getSummary();

  LocalDate getDate();

  String getPath();
}
