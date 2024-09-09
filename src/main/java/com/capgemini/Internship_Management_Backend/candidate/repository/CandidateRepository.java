package com.capgemini.Internship_Management_Backend.candidate.repository;

import com.capgemini.Internship_Management_Backend.candidate.entity.Candidate;
import com.capgemini.Internship_Management_Backend.candidate.repository.projection.CandidateProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
  List<CandidateProjection> findAllBySupervisorOrderByCreatedAtDesc(User supervisor);
}
