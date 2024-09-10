package com.capgemini.Internship_Management_Backend.candidature.service;

import com.capgemini.Internship_Management_Backend.candidature.dto.AddCandidatureDTO;
import com.capgemini.Internship_Management_Backend.candidature.dto.UpdateCandidatureDTO;
import com.capgemini.Internship_Management_Backend.candidature.entity.Candidature;
import com.capgemini.Internship_Management_Backend.candidature.repository.CandidatureRepository;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.CandidatureProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CandidateService {
  private final CandidatureRepository candidatureRepository;

  public void addCandidate(AddCandidatureDTO addCandidatureDTO) {
    Candidature candidature = new Candidature(addCandidatureDTO);
    candidatureRepository.save(candidature);
  }

  public List<CandidatureProjection> getAllSupervisorCandidates(Integer supervisorID) {
    return candidatureRepository.findAllBySupervisorOrderByCreatedAtDesc(new User(supervisorID));
  }

  public void updateCandidate(Integer candidateID, UpdateCandidatureDTO updateCandidatureDTO) {
    Optional<Candidature> candidate = candidatureRepository.findById(candidateID);
    if (candidate.isPresent()) {
      candidate.get().update(updateCandidatureDTO);
      candidatureRepository.save(candidate.get());
    }
  }
}
