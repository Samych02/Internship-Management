package com.capgemini.Internship_Management_Backend.internship.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.internship.dto.PushInternshipDTO;
import com.capgemini.Internship_Management_Backend.internship.service.InternshipService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/internships")
@RequiredArgsConstructor
public class InternshipController {
  private final InternshipService internshipService;

  @PostMapping("")
  public ResponseEntity<?> addInternship(@ModelAttribute @Valid PushInternshipDTO pushInternshipDTO) {
    internshipService.addInternship(pushInternshipDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Internship added successfully", Collections.singletonMap("created", true)));
  }

  @GetMapping("")
  public ResponseEntity<?> getAllInternships() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Internships fetched successfully", internshipService.getAllInternships()));
  }
}
