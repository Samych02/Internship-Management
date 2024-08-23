package com.capgemini.Internship_Management_Backend.course.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.course.model.CourseStatus;
import com.capgemini.Internship_Management_Backend.course.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
  private final CourseService courseService;

  @GetMapping("/obligatory")
  public ResponseEntity<?> getInternObligatoryCourses(@RequestParam Integer internID) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Obligatory courses fetched successfully", courseService.getAllObligatoryCoursesOfIntern(internID)));
  }

  @GetMapping("/personal")
  public ResponseEntity<?> getInternPersonalCourses(@RequestParam Integer internID) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Personal courses fetched successfully", courseService.getAllPersonalCoursesOfIntern(internID)));
  }

  @PatchMapping("{courseId}/{courseStatus}")
  public ResponseEntity<?> updateCourseStatus(@PathVariable Integer courseId, @PathVariable @Valid CourseStatus courseStatus) {
    courseService.updateCourseStatus(courseId, courseStatus);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Course status updated successfully", Collections.singletonMap("updated", true)));
  }
}
