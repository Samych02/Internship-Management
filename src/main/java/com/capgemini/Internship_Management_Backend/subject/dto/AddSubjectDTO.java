package com.capgemini.Internship_Management_Backend.subject.dto;

import com.capgemini.Internship_Management_Backend.subject.model.Competency;
import com.capgemini.Internship_Management_Backend.subject.model.InternType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class AddSubjectDTO {
  @NotNull
  private Integer id;

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
  public List<Competency> competenciesRequired;

  @NotEmpty
  public String supervisor;

  @Min(1)
  @NotNull
  public Integer internNumber;

}
