package com.capgemini.Internship_Management_Backend.candidate.controller;

import com.capgemini.Internship_Management_Backend.candidate.dto.PushCandidateDTO;
import com.capgemini.Internship_Management_Backend.candidate.service.CandidateService;
import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
public class CandidateController {
  private final CandidateService candidateService;

  @PostMapping
  public ResponseEntity<?> addCandidate(@RequestBody @Valid PushCandidateDTO pushCandidateDTO) {
    candidateService.addCandidate(pushCandidateDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Candidate added successfully", Collections.singletonMap("added", true)));
  }
}
