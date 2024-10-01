package com.capgemini.Internship_Management_Backend.internship.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.internship.dto.PushInternshipDTO;
import com.capgemini.Internship_Management_Backend.subject.model.InternshipType;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "internships")
public class Internship extends BaseEntity {
  private String title;
  private String team;
  private String managerFullName;
  private Integer year;
  private String internFullName;
  private String schoolName;
  private String supervisorFullName;
  private InternshipType internshipType;
  private String reportPath;
  private String presentationPath;

  public Internship(PushInternshipDTO pushInternshipDTO) {
    this.title = pushInternshipDTO.getTitle();
    this.team = pushInternshipDTO.getTeam();
    this.managerFullName = pushInternshipDTO.getManagerFullName();
    this.year = pushInternshipDTO.getYear();
    this.internFullName = pushInternshipDTO.getInternFullName();
    this.schoolName = pushInternshipDTO.getSchoolName();
    this.supervisorFullName = pushInternshipDTO.getSupervisorFullName();
    this.internshipType = pushInternshipDTO.getInternshipType();
    this.reportPath = "/Stage/" + pushInternshipDTO.getYear() + "/" + pushInternshipDTO.getTitle() + "/Rapport.pdf";
    if (pushInternshipDTO.getPresentationFile() != null) {
      this.presentationPath = "/Stage/" + pushInternshipDTO.getYear() + "/" + pushInternshipDTO.getTitle() + "/Présentation.pptx";
    }
  }
}
