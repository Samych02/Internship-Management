package com.capgemini.Internship_Management_Backend.resume.repository;

import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import com.capgemini.Internship_Management_Backend.resume.repository.projection.ResumeProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Integer> {
  List<ResumeProjection> findAllProjectedByPosterOrderByCreatedAtDesc(User poster);

  List<ResumeProjection> findAllProjectedByOrderByCreatedAtDesc();
}
