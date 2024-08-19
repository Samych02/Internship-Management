package com.capgemini.Internship_Management_Backend.resume.service;

import com.capgemini.Internship_Management_Backend.common.service.FileUtility;
import com.capgemini.Internship_Management_Backend.resume.dto.PushResumeDTO;
import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import com.capgemini.Internship_Management_Backend.resume.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {
  private final ResumeRepository resumeRepository;
  private final FileUtility fileUtility;

  public List<Resume> getAllResume() {
    return resumeRepository.findAll();
  }

  public void saveResume(PushResumeDTO pushResumeDTO) {
    Resume resume = new Resume(pushResumeDTO);
    fileUtility.createFolder("CV\\" + pushResumeDTO.getInternFullName());
    fileUtility.saveUploadFile(pushResumeDTO.getFile(), "CV\\" + pushResumeDTO.getInternFullName() + "\\cv.pdf");
    resumeRepository.save(resume);
  }
}
