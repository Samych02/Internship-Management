package com.capgemini.Internship_Management_Backend.common.httpresponse.util;


import com.capgemini.Internship_Management_Backend.common.httpresponse.model.StandardResponse;

// A utility that creates a standardized format for all http responses
public class ResponseUtil {
  public static <T> StandardResponse.SuccessResponse<T> successResponse(String message, T data) {
    return StandardResponse.SuccessResponse
            .<T>builder()
            .status("success")
            .statusText(message)
            .body(data)
            .build();
  }

  public static StandardResponse.ErrorResponse errorResponse(String errorMessage) {
    return StandardResponse.ErrorResponse
            .builder()
            .status("error")
            .statusText(errorMessage)
            .build();
  }
}
