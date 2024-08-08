package com.capgemini.Internship_Management_Backend.subject.service;

import com.capgemini.Internship_Management_Backend.User.entity.User;
import com.capgemini.Internship_Management_Backend.subject.dto.PushSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.subject.repository.SubjectRepository;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjection;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjectionForEdit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubjectService {
  private final SubjectRepository subjectRepository;
  private final SubjectWordGeneratorService subjectWordGeneratorService;

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

  public List<SubjectProjection> getAllSubjects(Integer posterId, SubjectStatus subjectStatus) {
    if (posterId == null && subjectStatus == null) return subjectRepository.findAllProjectedByOrderByCreatedAtDesc();
    if (posterId == null) return subjectRepository.findAllProjectedBySubjectStatusOrderByCreatedAtDesc(subjectStatus);
    if (subjectStatus == null)
      return subjectRepository.findAllProjectedByPosterOrderByCreatedAtDesc(new User(posterId));
    return subjectRepository.findAllProjectedBySubjectStatusAndPosterOrderByCreatedAtDesc(subjectStatus, new User(posterId));
  }

  public Integer countPendingSubjects() {
    return subjectRepository.countBySubjectStatus(SubjectStatus.PENDING);
  }

  public SubjectProjectionForEdit getSubjectById(Integer subjectId) {
    return subjectRepository.findProjectedById(subjectId);
  }

  public void updateSubject(Integer subjectId, PushSubjectDTO pushSubjectDTO) {
    Optional<Subject> subject = subjectRepository.findById(subjectId);
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
}
