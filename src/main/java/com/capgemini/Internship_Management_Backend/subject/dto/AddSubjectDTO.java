package com.capgemini.Internship_Management_Backend.subject.dto;

import com.capgemini.Internship_Management_Backend.subject.model.InternType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class AddSubjectDTO {
  @NotEmpty
  private String title;

  @NotNull
  public List<String> tasks;

  @NotEmpty
  public InternType internType;

  @NotEmpty
  public String targetSchools;

  @NotEmpty
  public String targetSpecialities;

  @NotNull
  public List<String> competenciesRequired;

  @Min(1)
  public Integer internNumber;

}
