package com.capgemini.Internship_Management_Backend.report.repository;

import com.capgemini.Internship_Management_Backend.report.entity.Report;
import com.capgemini.Internship_Management_Backend.report.repository.projection.ReportProjection;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {
  List<ReportProjection> findAllProjectedByInternOrderByDateDesc(User intern);

  List<ReportProjection> findAllProjectedByOrderByDateDesc();
}
