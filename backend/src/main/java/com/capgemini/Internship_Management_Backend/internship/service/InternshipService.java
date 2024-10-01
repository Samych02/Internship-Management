package com.capgemini.Internship_Management_Backend.internship.service;

import com.capgemini.Internship_Management_Backend.common.service.FileUtility;
import com.capgemini.Internship_Management_Backend.internship.dto.PushInternshipDTO;
import com.capgemini.Internship_Management_Backend.internship.entity.Internship;
import com.capgemini.Internship_Management_Backend.internship.repository.InternshipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InternshipService {
  private final InternshipRepository internshipRepository;
  private final FileUtility fileUtility;

  public void addInternship(PushInternshipDTO pushInternshipDTO) {
    Internship internship = new Internship(pushInternshipDTO);
    fileUtility.createFolder("/Stage/" + pushInternshipDTO.getYear() + "/" + pushInternshipDTO.getTitle());
    fileUtility.saveUploadFile(pushInternshipDTO.getReportFile(), internship.getReportPath());
    if (pushInternshipDTO.getPresentationFile() != null)
      fileUtility.saveUploadFile(pushInternshipDTO.getPresentationFile(), internship.getPresentationPath());
    internshipRepository.save(internship);
  }

  public List<Internship> getAllInternships() {
    return internshipRepository.findAllByOrderByYearDesc();
  }
}
