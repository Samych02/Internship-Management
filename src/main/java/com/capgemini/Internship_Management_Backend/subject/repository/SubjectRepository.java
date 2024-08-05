package com.capgemini.Internship_Management_Backend.subject.repository;

import com.capgemini.Internship_Management_Backend.User.entity.User;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer>, JpaSpecificationExecutor<Subject> {
  Subject findByTitleIgnoreCase(String title);

  Page<SubjectProjection> findAllByPosterOrderByCreatedAtDesc(User poster, Pageable pageable);

  Page<SubjectProjection> findAllByPosterAndTitleContainingOrderByCreatedAtDesc(User poster, String title, Pageable pageable);
}
