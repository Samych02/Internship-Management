package com.capgemini.Internship_Management_Backend.subject.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class Competency {
  private String category;
  private List<String> details;

}
