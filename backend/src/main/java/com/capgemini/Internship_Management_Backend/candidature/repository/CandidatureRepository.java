package com.capgemini.Internship_Management_Backend.candidature.repository;

import com.capgemini.Internship_Management_Backend.candidature.entity.Candidature;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.CandidatureProjectionForResponsible;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.CandidatureProjectionForSupervisor;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.ProjectionForAssignableSubject;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.ProjectionForSupervisorInterns;
import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CandidatureRepository extends JpaRepository<Candidature, Integer> {
  List<CandidatureProjectionForSupervisor> findAllBySupervisorOrderByCreatedAtDesc(User supervisor);

  Integer countAllBySubjectAndStatus(Subject subject, SubjectStatus status);

  List<ProjectionForAssignableSubject> findAllProjectedByResume(Resume resume);

  List<Candidature> findAllBySubject(Subject subject);

  List<Candidature> findAllByResume(Resume resume);

  List<ProjectionForSupervisorInterns> findAllProjectedBySupervisorAndStatus(User supervisor, SubjectStatus status);

  List<CandidatureProjectionForResponsible> findAllProjectedByStatusOrderByCreatedAtDesc(SubjectStatus status);
}
