package com.capgemini.Internship_Management_Backend.candidate.controller;

import com.capgemini.Internship_Management_Backend.candidate.dto.CreateCandidateDTO;
import com.capgemini.Internship_Management_Backend.candidate.dto.UpdateCandidateDTO;
import com.capgemini.Internship_Management_Backend.candidate.service.CandidateService;
import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/candidates")
@RequiredArgsConstructor
public class CandidateController {
  private final CandidateService candidateService;

  @PostMapping
  public ResponseEntity<?> addCandidate(@RequestBody @Valid CreateCandidateDTO createCandidateDTO) {
    candidateService.addCandidate(createCandidateDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Candidate added successfully", Collections.singletonMap("added", true)));
  }

  @GetMapping
  public ResponseEntity<?> getAllSupervisorCandidates(@RequestParam @Valid @NotNull Integer supervisorID) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Candidates fetched successfully", candidateService.getAllSupervisorCandidates(supervisorID)));
  }

  @PatchMapping("{candidateID}")
  public ResponseEntity<?> updateCandidate(@PathVariable Integer candidateID, @RequestBody @Valid UpdateCandidateDTO updateCandidateDTO) {
    candidateService.updateCandidate(candidateID, updateCandidateDTO);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Candidate updated successfully", Collections.singletonMap("updated", true)));
  }
}
