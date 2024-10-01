package com.capgemini.Internship_Management_Backend.user.repository.projection;

import com.capgemini.Internship_Management_Backend.user.model.UserRole;

public interface UserProjection {
  Integer getID();

  String getFirstName();

  String getLastName();

  String getEmail();

  UserRole getUserRole();
}
