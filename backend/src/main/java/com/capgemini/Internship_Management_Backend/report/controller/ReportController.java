package com.capgemini.Internship_Management_Backend.report.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.report.dto.PushReportDTO;
import com.capgemini.Internship_Management_Backend.report.service.ReportService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {
  private final ReportService reportService;

  @PostMapping("")
  public ResponseEntity<?> addResume(@ModelAttribute @Valid PushReportDTO pushReportDTO) {
    reportService.saveReport(pushReportDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Report added successfully", Collections.singletonMap("created", true)));
  }

  @GetMapping
  public ResponseEntity<?> getAllReports(
          @RequestParam(required = false) Integer internID,
          @RequestParam(required = false) Integer supervisorID
  ) {
    return ResponseEntity.status(HttpStatus.OK)
            .body(ResponseUtil.successResponse("Reports fetched successfully", reportService.getAllReports(internID, supervisorID)));
  }
}
