package com.capgemini.Internship_Management_Backend.course.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.course.dto.PushCourseDTO;
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

  @PostMapping("")
  public ResponseEntity<?> addCourse(@Valid @RequestBody PushCourseDTO pushCourseDTO) {
    courseService.addCourse(pushCourseDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("Course status added successfully", Collections.singletonMap("created", true)));
  }

  @GetMapping("/personal")
  public ResponseEntity<?> getInternPersonalCourses(@RequestParam Integer internID) {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Personal courses fetched successfully", courseService.getAllPersonalCoursesOfIntern(internID)));
  }

  @PatchMapping("{courseID}/{courseStatus}")
  public ResponseEntity<?> updateCourseStatus(@PathVariable Integer courseID, @PathVariable @Valid CourseStatus courseStatus) {
    courseService.updateCourseStatus(courseID, courseStatus);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Course status updated successfully", Collections.singletonMap("updated", true)));
  }
}
