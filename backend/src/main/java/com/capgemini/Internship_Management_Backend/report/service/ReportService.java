package com.capgemini.Internship_Management_Backend.report.service;

import com.capgemini.Internship_Management_Backend.candidature.repository.CandidatureRepository;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.ProjectionForSupervisorInterns;
import com.capgemini.Internship_Management_Backend.common.service.FileUtility;
import com.capgemini.Internship_Management_Backend.report.dto.PushReportDTO;
import com.capgemini.Internship_Management_Backend.report.entity.Report;
import com.capgemini.Internship_Management_Backend.report.repository.ReportRepository;
import com.capgemini.Internship_Management_Backend.report.repository.projection.ReportProjection;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
  private final ReportRepository reportRepository;
  private final FileUtility fileUtility;
  private final CandidatureRepository candidatureRepository;

  public List<ReportProjection> getAllReports(Integer internID, Integer supervisorID) {
    if (internID != null) return reportRepository.findAllProjectedByInternOrderByDateDesc(new User(internID));
    if (supervisorID != null) return getReportsForSupervisor(supervisorID);
    return reportRepository.findAllProjectedByOrderByDateDesc();
  }

  public void saveReport(PushReportDTO pushReportDTO) {
    Report report = new Report(pushReportDTO);
    fileUtility.createFolder("/CR/" + pushReportDTO.getFullName() + "/" + pushReportDTO.getDate());
    fileUtility.saveUploadFile(pushReportDTO.getFile(), "/CR/" + pushReportDTO.getFullName() + "/" + pushReportDTO.getDate() + "/CR.pdf");
    reportRepository.save(report);
  }

  public List<ReportProjection> getReportsForSupervisor(Integer supervisorID) {
    List<ProjectionForSupervisorInterns> list = candidatureRepository.findAllProjectedBySupervisorAndStatus(new User(supervisorID), SubjectStatus.ACCEPTED);
    return list.stream()
            .flatMap(c -> reportRepository.findAllProjectedByInternOrderByDateDesc(new User(c.getIntern().getID())).stream())
            .toList();
  }
}
