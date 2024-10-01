package com.capgemini.Internship_Management_Backend.internship.repository;

import com.capgemini.Internship_Management_Backend.internship.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Integer> {
  List<Internship> findAllByOrderByYearDesc();
}
