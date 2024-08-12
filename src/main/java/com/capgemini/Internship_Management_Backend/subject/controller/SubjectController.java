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
  private final SubjectWordGeneratorService subjectWordGeneratorService;
  private final ValidationAutoConfiguration validationAutoConfiguration;
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
          @RequestParam(required = false) Integer posterId,
          @RequestParam(required = false) SubjectStatus subjectStatus
  ) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subjects fetched successfully", subjectService.getAllSubjects(posterId, subjectStatus)));
  }

  @GetMapping("count-pending")
  public ResponseEntity<?> countPendingSubjects() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subjects fetched successfully", Collections.singletonMap("numberOfPendingSubjects", subjectService.countPendingSubjects())));
  }


  @GetMapping("{subjectId}")
  public ResponseEntity<?> getSubject(@PathVariable Integer subjectId) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Subjects fetched successfully", subjectService.getSubjectById(subjectId)));
  }

  @PatchMapping("{subjectId}")
  public ResponseEntity<?> updateSubject(@PathVariable Integer subjectId, @RequestBody @Valid PushSubjectDTO pushSubjectDTO) {
    subjectService.updateSubject(subjectId, pushSubjectDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Subject updated successfully", Collections.singletonMap("created", true)));
  }

  @PatchMapping("{subjectId}/{subjectStatus}")
  public ResponseEntity<?> updateSubjectStatus(@PathVariable Integer subjectId, @PathVariable SubjectStatus subjectStatus, @RequestBody(required = false) String specialistComment) {
    subjectService.updateSubjectStatus(subjectId, subjectStatus, specialistComment);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Subject status updated successfully", Collections.singletonMap("created", true)));
  }

  @GetMapping("test")
  public void test(@RequestParam(required = false) SubjectStatus id) {
    System.out.println(1111);
    System.out.println(id);
  }
}
