package com.capgemini.Internship_Management_Backend.subject.service;

import com.capgemini.Internship_Management_Backend.User.entity.User;
import com.capgemini.Internship_Management_Backend.subject.dto.AddSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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

  public List<Subject> getAllUserSubjects(Integer id) {
    User user = new User(id);
    return (subjectRepository.findAllByPoster(user));

  }
}
