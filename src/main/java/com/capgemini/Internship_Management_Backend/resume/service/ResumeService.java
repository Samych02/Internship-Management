package com.capgemini.Internship_Management_Backend.resume.service;

import com.capgemini.Internship_Management_Backend.common.service.FileUtility;
import com.capgemini.Internship_Management_Backend.resume.dto.PushResumeDTO;
import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import com.capgemini.Internship_Management_Backend.resume.repository.ResumeRepository;
import com.capgemini.Internship_Management_Backend.resume.repository.projection.ResumeProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {
  private final ResumeRepository resumeRepository;
  private final FileUtility fileUtility;

  public List<ResumeProjection> getAllResume(Integer posterId) {
    if (posterId == null) return resumeRepository.findAllProjectedByOrderByCreatedAtDesc();
    return resumeRepository.findAllProjectedByPosterOrderByCreatedAtDesc(new User(posterId));
  }

  public void saveResume(PushResumeDTO pushResumeDTO) {
    Resume resume = new Resume(pushResumeDTO);
    fileUtility.createFolder("CV\\" + resume.getInternFullName());
    fileUtility.saveUploadFile(pushResumeDTO.getFile(), "CV\\" + resume.getInternFullName() + "\\cv.pdf");
    resumeRepository.save(resume);
  }

  public Boolean checkProfileExisting(String firstName, String lastName) {
    return resumeRepository.countByInternFirstNameIgnoreCaseAndInternLastNameIgnoreCase(firstName, lastName) > 0;
  }
}
