package com.capgemini.Internship_Management_Backend.common.httpresponse.controller.advice;

import com.capgemini.Internship_Management_Backend.common.httpresponse.model.StandardResponse;
import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(Exception.class)
  public ResponseEntity<StandardResponse.ErrorResponse> handleAllExceptions(Exception exception) {
    return ResponseEntity.badRequest().body(ResponseUtil.errorResponse(exception.getMessage()));
  }
}
