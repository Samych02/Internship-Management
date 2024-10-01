package com.capgemini.Internship_Management_Backend.common.httpresponse.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class StandardResponse {
  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class SuccessResponse<T> {
    private String status;
    private String statusText;
    private T body;
  }

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  @Builder
  public static class ErrorResponse {
    private String status;
    private String statusText;
  }
}
