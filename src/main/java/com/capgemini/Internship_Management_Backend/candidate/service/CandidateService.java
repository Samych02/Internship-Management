package com.capgemini.Internship_Management_Backend.candidate.service;

import com.capgemini.Internship_Management_Backend.candidate.dto.CreateCandidateDTO;
import com.capgemini.Internship_Management_Backend.candidate.dto.UpdateCandidateDTO;
import com.capgemini.Internship_Management_Backend.candidate.entity.Candidate;
import com.capgemini.Internship_Management_Backend.candidate.repository.CandidateRepository;
import com.capgemini.Internship_Management_Backend.candidate.repository.projection.CandidateProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CandidateService {
  private final CandidateRepository candidateRepository;

  public void addCandidate(CreateCandidateDTO createCandidateDTO) {
    Candidate candidate = new Candidate(createCandidateDTO);
    candidateRepository.save(candidate);
  }

  public List<CandidateProjection> getAllSupervisorCandidates(Integer supervisorID) {
    return candidateRepository.findAllBySupervisorOrderByCreatedAtDesc(new User(supervisorID));
  }

  public void updateCandidate(Integer candidateID, UpdateCandidateDTO updateCandidateDTO) {
    Optional<Candidate> candidate = candidateRepository.findById(candidateID);
    if (candidate.isPresent()) {
      candidate.get().update(updateCandidateDTO);
      candidateRepository.save(candidate.get());
    }
  }
}
