package com.capgemini.Internship_Management_Backend.report.service;

import com.capgemini.Internship_Management_Backend.common.service.FileUtility;
import com.capgemini.Internship_Management_Backend.report.dto.PushReportDTO;
import com.capgemini.Internship_Management_Backend.report.entity.Report;
import com.capgemini.Internship_Management_Backend.report.repository.ReportRepository;
import com.capgemini.Internship_Management_Backend.report.repository.projection.ReportProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
  private final ReportRepository reportRepository;
  private final FileUtility fileUtility;

  public List<ReportProjection> getAllReports(Integer internID) {
    if (internID != null) return reportRepository.findAllProjectedByInternOrderByDateDesc(new User(internID));
    return reportRepository.findAllProjectedByOrderByDateDesc();
  }

  public void saveReport(PushReportDTO pushReportDTO) {
    Report report = new Report(pushReportDTO);
    fileUtility.createFolder("\\CR\\" + pushReportDTO.getFullName() + "\\" + pushReportDTO.getDate());
    fileUtility.saveUploadFile(pushReportDTO.getFile(), "\\CR\\" + pushReportDTO.getFullName() + "\\" + pushReportDTO.getDate() + "\\CR.pdf");
    reportRepository.save(report);
  }
}
