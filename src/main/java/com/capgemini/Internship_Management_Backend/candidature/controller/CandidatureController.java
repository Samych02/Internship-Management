package com.capgemini.Internship_Management_Backend.candidature.controller;

import com.capgemini.Internship_Management_Backend.candidature.dto.AddCandidatureDTO;
import com.capgemini.Internship_Management_Backend.candidature.dto.UpdateCandidatureDTO;
import com.capgemini.Internship_Management_Backend.candidature.service.CandidateService;
import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/candidatures")
@RequiredArgsConstructor
public class CandidatureController {
  private final CandidateService candidateService;

  @PostMapping
  public ResponseEntity<?> addCandidature(@RequestBody @Valid AddCandidatureDTO addCandidatureDTO) {
    candidateService.addCandidate(addCandidatureDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Candidate added successfully", Collections.singletonMap("added", true)));
  }

  @GetMapping
  public ResponseEntity<?> getAllSupervisorCandidatures(@RequestParam @Valid @NotNull Integer supervisorID) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Candidates fetched successfully", candidateService.getAllSupervisorCandidates(supervisorID)));
  }

  @PatchMapping("{candidateID}")
  public ResponseEntity<?> updateCandidature(@PathVariable Integer candidateID, @RequestBody @Valid UpdateCandidatureDTO updateCandidatureDTO) {
    candidateService.updateCandidate(candidateID, updateCandidatureDTO);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Candidate updated successfully", Collections.singletonMap("updated", true)));
  }
}
