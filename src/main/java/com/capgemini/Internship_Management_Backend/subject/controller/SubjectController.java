package com.capgemini.Internship_Management_Backend.subject.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.subject.dto.AddSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.service.SubjectService;
import com.capgemini.Internship_Management_Backend.subject.service.SubjectWordGeneratorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.validation.ValidationAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/subjects")
@RequiredArgsConstructor
public class SubjectController {
  private final SubjectWordGeneratorService subjectWordGeneratorService;
  private final ValidationAutoConfiguration validationAutoConfiguration;
  private final SubjectService subjectService;

  @PostMapping("")
  public ResponseEntity<?> addSubject(@RequestBody @Valid AddSubjectDTO addSubjectDTO) {
    subjectService.addSubject(addSubjectDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("User created successfully", Collections.singletonMap("created", true)));
  }

//  @GetMapping("test")
//  public void test() {
//    subjectWordGeneratorService.generateSubjectFile();
//  }
}
