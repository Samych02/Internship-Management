package com.capgemini.Internship_Management_Backend.subject.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.subject.dto.PushSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.model.SubjectStatus;
import com.capgemini.Internship_Management_Backend.subject.service.SubjectService;
import com.capgemini.Internship_Management_Backend.subject.service.SubjectWordGeneratorService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {
  private final SubjectService subjectService;

  @GetMapping("/check-title-used")
  public ResponseEntity<?> checkTitleUsed(@RequestParam @Valid @NotNull String title) {
    Boolean isTitleUsed = subjectService.isTitleUsed(title);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse((isTitleUsed ? "Title used" : "Title not used"), Collections.singletonMap("isTitleUsed", isTitleUsed)));
  }

  @PostMapping("")
  public ResponseEntity<?> addSubject(@RequestBody @Valid PushSubjectDTO pushSubjectDTO) {
    subjectService.saveSubject(pushSubjectDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Subject created successfully", Collections.singletonMap("created", true)));
  }

  @GetMapping("")
  public ResponseEntity<?> getAllSubjects(
          @RequestParam(required = false) Integer posterID,
          @RequestParam(required = false) SubjectStatus subjectStatus
  ) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subjects fetched successfully", subjectService.getAllSubjects(posterID, subjectStatus)));
  }

  @GetMapping("assignable")
  public ResponseEntity<?> getAllAssociableSubjects(
          @RequestParam @Valid Integer resumeID,
          @RequestParam @Valid Integer supervisorID
  ) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subjects fetched successfully", subjectService.getAllSubjectsAssignableToResume(resumeID, supervisorID)));
  }

  @GetMapping("count-pending")
  public ResponseEntity<?> countPendingSubjects() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subjects fetched successfully", Collections.singletonMap("numberOfPendingSubjects", subjectService.countPendingSubjects())));
  }


  @GetMapping("{subjectId}")
  public ResponseEntity<?> getSubject(@PathVariable Integer subjectId) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subjects fetched successfully", subjectService.getSubjectByID(subjectId)));
  }

  @PatchMapping("{subjectID}")
  public ResponseEntity<?> updateSubject(@PathVariable Integer subjectID, @RequestBody @Valid PushSubjectDTO pushSubjectDTO) {
    subjectService.updateSubject(subjectID, pushSubjectDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Subject updated successfully", Collections.singletonMap("created", true)));
  }

  @DeleteMapping("{subjectID}")
  public ResponseEntity<?> deleteSubject(@PathVariable Integer subjectID) {
    subjectService.deleteSubject(subjectID);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subject deleted successfully", Collections.singletonMap("deleted", true)));
  }

  @PatchMapping("{subjectID}/{subjectStatus}")
  public ResponseEntity<?> updateSubjectStatus(@PathVariable Integer subjectID, @PathVariable SubjectStatus subjectStatus, @RequestBody(required = false) String specialistComment) {
    subjectService.updateSubjectStatus(subjectID, subjectStatus, specialistComment);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subject status updated successfully", Collections.singletonMap("updated", true)));
  }
}
