package com.capgemini.Internship_Management_Backend.candidate.repository;

import com.capgemini.Internship_Management_Backend.candidate.entity.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Integer> {
}
