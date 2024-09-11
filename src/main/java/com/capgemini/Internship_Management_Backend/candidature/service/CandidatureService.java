package com.capgemini.Internship_Management_Backend.candidature.service;

import com.capgemini.Internship_Management_Backend.candidature.dto.AcceptCandidatureDTO;
import com.capgemini.Internship_Management_Backend.candidature.dto.AddCandidatureDTO;
import com.capgemini.Internship_Management_Backend.candidature.dto.UpdateCandidatureDTO;
import com.capgemini.Internship_Management_Backend.candidature.entity.Candidature;
import com.capgemini.Internship_Management_Backend.candidature.repository.CandidatureRepository;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.CandidatureProjectionForResponsible;
import com.capgemini.Internship_Management_Backend.candidature.repository.projection.CandidatureProjectionForSupervisor;
import com.capgemini.Internship_Management_Backend.resume.entity.Resume;
import com.capgemini.Internship_Management_Backend.resume.repository.ResumeRepository;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.subject.repository.SubjectRepository;
import com.capgemini.Internship_Management_Backend.user.dto.RegisterDTO;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import com.capgemini.Internship_Management_Backend.user.model.UserRole;
import com.capgemini.Internship_Management_Backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CandidatureService {
  private final CandidatureRepository candidatureRepository;
  private final ResumeRepository resumeRepository;
  private final UserService userService;
  private final SubjectRepository subjectRepository;

  public void addCandidate(AddCandidatureDTO addCandidatureDTO) {
    Candidature candidature = new Candidature(addCandidatureDTO);
    candidatureRepository.save(candidature);
  }

  public List<CandidatureProjectionForSupervisor> getAllSupervisorCandidates(Integer supervisorID) {
    return candidatureRepository.findAllBySupervisorOrderByCreatedAtDesc(new User(supervisorID));
  }

  public List<CandidatureProjectionForResponsible> getAllResponsibleCandidates() {
    return candidatureRepository.findAllProjectedByStatusOrderByCreatedAtDesc(SubjectStatus.ACCEPTED);
  }

  public void updateCandidate(Integer candidateID, UpdateCandidatureDTO updateCandidatureDTO) {
    Optional<Candidature> candidate = candidatureRepository.findById(candidateID);
    if (candidate.isPresent()) {
      candidate.get().update(updateCandidatureDTO);
      candidatureRepository.save(candidate.get());
    }
  }

  public void acceptCandidature(AcceptCandidatureDTO acceptCandidatureDTO) {
    Candidature candidature = candidatureRepository.findById(acceptCandidatureDTO.getCandidatureId()).get();
    // reject all other candidates if the number of intern of a subject is reached
    // the - 1 added because we still didnt update the database yet
    if (
            (candidature.getSubject().getInternNumber()
                    - candidatureRepository.countAllBySubjectAndStatus(new Subject(candidature.getSubject().getID()), SubjectStatus.ACCEPTED))
                    - 1
                    <= 0) {
      List<Candidature> l = candidatureRepository.findAllBySubject(new Subject(candidature.getSubject().getID()));
      for (Candidature c : l) {
        c.setStatus(SubjectStatus.REJECTED);
        candidatureRepository.save(c);
      }
    }

    // reject all other candidature of same resume
    List<Candidature> l = candidatureRepository.findAllByResume(new Resume(candidature.getResume().getID()));
    for (Candidature c : l) {
      c.setStatus(SubjectStatus.REJECTED);
      candidatureRepository.save(c);
    }

    candidature = candidatureRepository.findById(acceptCandidatureDTO.getCandidatureId()).get();
    Resume resume = resumeRepository.findById(candidature.getResume().getID()).get();
    resume.setValidated(true);
    resumeRepository.save(resume);

    Subject subject = subjectRepository.findById(candidature.getSubject().getID()).get();
    subject.setSubjectStatus(SubjectStatus.IN_PROGRESS);
    subjectRepository.save(subject);

    // create intern account
    User intern = userService.register(
            RegisterDTO
                    .builder()
                    .email(acceptCandidatureDTO.getEmail())
                    .password(acceptCandidatureDTO.getPassword())
                    .firstName(candidature.getResume().getInternFirstName())
                    .lastName(candidature.getResume().getInternLastName())
                    .userRole(UserRole.INTERN)
                    .build()
    );
    candidature.setIntern(intern);
    candidature.setStatus(SubjectStatus.ACCEPTED);

    candidatureRepository.save(candidature);
  }
}
