package com.capgemini.Internship_Management_Backend.subject.service;

import com.capgemini.Internship_Management_Backend.subject.dto.AddSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubjectService {
  private final SubjectRepository subjectRepository;
  private final SubjectWordGeneratorService subjectWordGeneratorService;

  public void addSubject(AddSubjectDTO addSubjectDTO) {
    Subject subject = new Subject(addSubjectDTO);
    subject = subjectRepository.save(subject);
    subject.setPath(subjectWordGeneratorService.generateSubjectFile(subject));
    subjectRepository.save(subject);


  }
}
