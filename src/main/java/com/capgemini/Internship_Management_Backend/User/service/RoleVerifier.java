package com.capgemini.Internship_Management_Backend.User.service;

import com.capgemini.Internship_Management_Backend.User.model.UserRole;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class RoleVerifier {
  public Boolean isAdmin(Jwt token) {
    return token.getClaim("role").toString().equalsIgnoreCase(UserRole.ADMIN.toString());
  }

  public Boolean isSpecialist(Jwt token) {
    return token.getClaim("role").toString().equalsIgnoreCase(UserRole.SPECIALIST.toString());
  }

  public Boolean isManager(Jwt token) {
    return token.getClaim("role").toString().equalsIgnoreCase(UserRole.MANAGER.toString());
  }

  public Boolean isSupervisor(Jwt token) {
    return token.getClaim("role").toString().equalsIgnoreCase(UserRole.SUPERVISOR.toString());
  }

  public Boolean isConsultant(Jwt token) {
    return token.getClaim("role").toString().equalsIgnoreCase(UserRole.CONSULTANT.toString());
  }

  public Boolean isIntern(Jwt token) {
    return token.getClaim("role").toString().equalsIgnoreCase(UserRole.INTERN.toString());
  }
}
