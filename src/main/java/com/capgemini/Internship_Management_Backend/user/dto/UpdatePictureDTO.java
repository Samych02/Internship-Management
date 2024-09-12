package com.capgemini.Internship_Management_Backend.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UpdatePictureDTO {
  @NotNull
  private Integer userID;

  @NotNull
  private MultipartFile file;
}
