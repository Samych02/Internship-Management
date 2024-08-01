package com.capgemini.Internship_Management_Backend.subject.repository;

import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
}
