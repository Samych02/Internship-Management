package com.capgemini.Internship_Management_Backend.subject.service;

import com.capgemini.Internship_Management_Backend.User.entity.User;
import com.capgemini.Internship_Management_Backend.subject.dto.AddSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.repository.SubjectRepository;
import com.capgemini.Internship_Management_Backend.subject.repository.projection.SubjectProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectService {
  private final SubjectRepository subjectRepository;
  private final SubjectWordGeneratorService subjectWordGeneratorService;

  public Boolean isTitleUsed(String title) {
    Subject subject = subjectRepository.findByTitleIgnoreCase(title);
    return subject != null;
  }

  public void saveSubject(AddSubjectDTO addSubjectDTO) {
    Subject subject = new Subject(addSubjectDTO);
    subject = subjectRepository.save(subject);
    subject.setPath(subjectWordGeneratorService.generateSubjectFile(subject));
    subjectRepository.save(subject);
  }

  public Page<SubjectProjection> getAllUserSubjects(Integer id, String title, int page, int size) {
    User user = new User(id);
    Pageable pageable = PageRequest.of(page, size);
    if (title == null || title.isEmpty()) {
      return (subjectRepository.findAllByPosterOrderByCreatedAtDesc(user, pageable));
    }
    return subjectRepository.findAllByPosterAndTitleContainingOrderByCreatedAtDesc(user, title, pageable);
  }
}
