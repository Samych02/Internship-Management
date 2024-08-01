package com.capgemini.Internship_Management_Backend.subject.dto;

import com.capgemini.Internship_Management_Backend.subject.model.InternType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class AddSubjectDTO {
  @NotEmpty
  private String title;

  @NotNull
  public List<String> tasks;

  @NotNull
  public InternType internType;

  @NotNull
  public List<String> targetSchools;

  @NotEmpty
  public List<String> targetSpecialities;

  @NotNull
  public Map<String, String> competenciesRequired;

  @NotEmpty
  public String supervisor;

  @Min(1)
  @NotNull
  public Integer internNumber;

}
