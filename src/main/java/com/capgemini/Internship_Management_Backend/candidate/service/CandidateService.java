package com.capgemini.Internship_Management_Backend.candidate.service;

import com.capgemini.Internship_Management_Backend.candidate.dto.PushCandidateDTO;
import com.capgemini.Internship_Management_Backend.candidate.entity.Candidate;
import com.capgemini.Internship_Management_Backend.candidate.repository.CandidateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CandidateService {
  private final CandidateRepository candidateRepository;

  public void addCandidate(PushCandidateDTO pushCandidateDTO) {
    Candidate candidate = new Candidate(pushCandidateDTO);
    candidateRepository.save(candidate);
  }

}
