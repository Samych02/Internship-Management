package com.capgemini.Internship_Management_Backend.report.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.report.dto.PushReportDTO;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "reports")
public class Report extends BaseEntity {
  @ManyToOne
  @JoinColumn(nullable = false)
  private User intern;
  private String summary;
  private LocalDate date;
  private String path;

  public Report(PushReportDTO pushReportDTO) {
    this.intern = new User(pushReportDTO.getInternID());
    this.summary = pushReportDTO.getSummary();
    this.date = pushReportDTO.getDate();
    this.path = "\\CR\\" + pushReportDTO.getFullName() + "\\" + pushReportDTO.getDate() + "\\CR.pdf";
  }

}
