package com.capgemini.Internship_Management_Backend.resume.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.resume.dto.PushResumeDTO;
import com.capgemini.Internship_Management_Backend.resume.service.ResumeService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/resumes")
@RequiredArgsConstructor
public class ResumeController {
  private final ResumeService resumeService;

  @PostMapping
  public ResponseEntity<?> addResume(@ModelAttribute @Valid PushResumeDTO pushResumeDTO) {
    resumeService.saveResume(pushResumeDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Resume added successfully", Collections.singletonMap("created", true)));
  }

  @GetMapping
  public ResponseEntity<?> getAllResumes(@RequestParam(required = false) Integer posterID) {
    return ResponseEntity.status(HttpStatus.OK)
            .body(ResponseUtil.successResponse("Resumes fetched successfully", resumeService.getAllResume(posterID)));
  }

  @GetMapping("check-profile-existing")
  public ResponseEntity<?> checkProfilExisting(@RequestParam @Valid @NotNull String firstName,
                                               @RequestParam @Valid @NotNull String lastName) {
    Boolean isProfileExisting = resumeService.checkProfileExisting(firstName, lastName);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse((isProfileExisting ? "Profile exists" : "Profile does not exist"), Collections.singletonMap("isProfileExisting", isProfileExisting)));
  }
}
