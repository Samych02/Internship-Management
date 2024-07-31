package com.capgemini.Internship_Management_Backend.subject.controller;

import com.capgemini.Internship_Management_Backend.subject.service.SubjectWordGeneratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/subjects")
@RequiredArgsConstructor
public class SubjectController {
  private final SubjectWordGeneratorService subjectWordGeneratorService;

  @GetMapping("test")
  public void test() {
    subjectWordGeneratorService.generateSubjectFile();
  }
}
