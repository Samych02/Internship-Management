package com.capgemini.Internship_Management_Backend.subject.repository;

import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjection;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjectionForEdit;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Integer>, JpaSpecificationExecutor<Subject> {
  Subject findByTitleIgnoreCase(String title);

  List<SubjectProjection> findAllProjectedByOrderByCreatedAtDesc();

  List<SubjectProjection> findAllProjectedBySubjectStatusOrderByCreatedAtDesc(SubjectStatus subjectStatus);

  List<SubjectProjection> findAllProjectedByPosterOrderByCreatedAtDesc(User poster);

  List<SubjectProjection> findAllProjectedBySubjectStatusAndPosterOrderByCreatedAtDesc(SubjectStatus subjectStatus, User poster);

  Integer countBySubjectStatus(SubjectStatus subjectStatus);

  SubjectProjectionForEdit findProjectedById(Integer Id);
}
