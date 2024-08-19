package com.capgemini.Internship_Management_Backend.resume.repository;

import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Integer> {
}
