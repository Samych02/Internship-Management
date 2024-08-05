package com.capgemini.Internship_Management_Backend.subject.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.subject.dto.AddSubjectDTO;
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
  public ResponseEntity<?> addSubject(@RequestBody @Valid AddSubjectDTO addSubjectDTO) {
    subjectService.saveSubject(addSubjectDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("User created successfully", Collections.singletonMap("created", true)));
  }

  @GetMapping("")
  public ResponseEntity<?> getAllUserSubjects(@RequestParam @Valid @NotNull Integer id,
                                              @RequestParam @Valid @NotNull int page,
                                              @RequestParam(required = false) String title,
                                              @RequestParam(required = false, defaultValue = "10") int size) {
    return ResponseEntity.status(HttpStatus.OK).body(subjectService.getAllUserSubjects(id, title, page, size));
  }


//  @GetMapping("test")
//  public void test() {
//    subjectWordGeneratorService.generateSubjectFile();
//  }
}
