package com.capgemini.Internship_Management_Backend.subject.service;

import com.capgemini.Internship_Management_Backend.candidature.repository.CandidatureRepository;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.ProjectionForAssignableSubject;
import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import com.capgemini.Internship_Management_Backend.subject.dto.PushSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.subject.repository.SubjectRepository;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjection;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjectionForAssociation;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjectionForEdit;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService {
  private final SubjectRepository subjectRepository;
  private final SubjectWordGeneratorService subjectWordGeneratorService;
  private final CandidatureRepository candidatureRepository;

  public Boolean isTitleUsed(String title) {
    Subject subject = subjectRepository.findByTitleIgnoreCase(title);
    return subject != null;
  }

  public void saveSubject(PushSubjectDTO pushSubjectDTO) {
    Subject subject = new Subject(pushSubjectDTO);
    subject = subjectRepository.save(subject);
    subject.setPath(subjectWordGeneratorService.generateSubjectFile(subject));
    subjectRepository.save(subject);
  }

  public List<SubjectProjection> getAllSubjects(Integer posterID, SubjectStatus subjectStatus) {
    if (posterID == null && subjectStatus == null) return subjectRepository.findAllProjectedByOrderByCreatedAtDesc();
    if (posterID == null) return subjectRepository.findAllProjectedBySubjectStatusOrderByCreatedAtDesc(subjectStatus);
    if (subjectStatus == null)
      return subjectRepository.findAllProjectedByPosterOrderByCreatedAtDesc(new User(posterID));
    return subjectRepository.findAllProjectedBySubjectStatusAndPosterOrderByCreatedAtDesc(subjectStatus, new User(posterID));
  }

  public Integer countPendingSubjects() {
    return subjectRepository.countBySubjectStatus(SubjectStatus.PENDING);
  }

  public SubjectProjectionForEdit getSubjectByID(Integer subjectId) {
    return subjectRepository.findProjectedByID(subjectId);
  }

  public void updateSubject(Integer subjectID, PushSubjectDTO pushSubjectDTO) {
    Optional<Subject> subject = subjectRepository.findById(subjectID);
    subject.ifPresent(subject1 -> {
      subject1.setTasks(pushSubjectDTO.getTasks());
      subject1.setInternType(pushSubjectDTO.getInternType());
      subject1.setTargetSchools(pushSubjectDTO.targetSchools);
      subject1.setTargetSpecialities(pushSubjectDTO.targetSpecialities);
      subject1.setCompetenciesRequired(pushSubjectDTO.getCompetenciesRequired());
      subject1.setSupervisor(pushSubjectDTO.getSupervisor());
      subject1.setInternNumber(pushSubjectDTO.getInternNumber());
      subject1.setInternshipType(pushSubjectDTO.getInternshipType());
      subjectRepository.save(subject1);
      subjectWordGeneratorService.generateSubjectFile(subject1);
    });
  }

  public void updateSubjectStatus(Integer subjectID, SubjectStatus subjectStatus, String specialistComment) {
    Optional<Subject> subject = subjectRepository.findById(subjectID);
    subject.ifPresent(subject1 -> {
      subject1.setSubjectStatus(subjectStatus);
      if (specialistComment != null) subject1.setSpecialistComment(specialistComment);
      subjectRepository.save(subject1);
    });
  }

  public void deleteSubject(Integer subjectID) {
    subjectRepository.deleteById(subjectID);
  }

  public List<?> getAllSubjectsAssignableToResume(Integer resumeID) {
    // 1: get a list of all accepted subjects
    List<SubjectProjectionForAssociation> acceptedSubjectsList = subjectRepository.findAllProjectedBySubjectStatus(SubjectStatus.ACCEPTED);

    // 2: get a list of all associated subject
    List<ProjectionForAssignableSubject> associatedSubjectsList = candidatureRepository.findAllProjectedByResume(new Resume(resumeID));

    // return a final list of subjects that are only in the first list and whose remaining places are > 0
    return acceptedSubjectsList.stream()
            .filter(o -> associatedSubjectsList.stream().noneMatch(oo -> Objects.equals(oo.getSubject().getID(), o.getID())))
            .filter(o -> (o.getInternNumber() - candidatureRepository.countAllBySubjectAndStatus(new Subject(o.getID()), SubjectStatus.ACCEPTED)) > 0)
            .toList();
  }
}
