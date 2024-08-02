package com.capgemini.Internship_Management_Backend.subject.repository;

import com.capgemini.Internship_Management_Backend.User.entity.User;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer> {
  Subject findByTitleIgnoreCase(String title);

  List<Subject> findAllByPoster(User poster);
}
