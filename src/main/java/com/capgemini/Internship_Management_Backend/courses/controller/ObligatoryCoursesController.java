package com.capgemini.Internship_Management_Backend.courses.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.courses.service.ObligatoryCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/obligatory_courses")
@RequiredArgsConstructor
public class ObligatoryCoursesController {
  private final ObligatoryCourseService obligatoryCourseService;

  @GetMapping("")
  public ResponseEntity<?> getInternObligatoryCourses(@RequestParam Integer internID) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Obligatory courses fetched successfully", obligatoryCourseService.getAllObligatoryCoursesOfIntern(internID)));
  }
}
