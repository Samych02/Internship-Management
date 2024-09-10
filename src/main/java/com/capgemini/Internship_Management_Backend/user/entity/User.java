package com.capgemini.Internship_Management_Backend.user.entity;

import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
import com.capgemini.Internship_Management_Backend.user.dto.RegisterDTO;
import com.capgemini.Internship_Management_Backend.user.model.UserRole;
import jakarta.persistence.*;
import lombok.*;

@Data
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User extends BaseEntity {
  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Enumerated(EnumType.STRING)
  private UserRole userRole;

  private String phoneNumber;

  private String team;

  private String perimeter;

  private String image;

  public User(RegisterDTO registerDTO) {
    this.email = registerDTO.getEmail();
    this.password = registerDTO.getPassword();
    this.firstName = registerDTO.getFirstName().substring(0, 1).toUpperCase() + registerDTO.getFirstName().substring(1).toLowerCase();
    this.lastName = registerDTO.getLastName().substring(0, 1).toUpperCase() + registerDTO.getLastName().substring(1).toLowerCase();
    this.userRole = registerDTO.getUserRole();
  }

  public User(Integer ID) {
    this.ID = ID;
  }

  public String getFullName() {
    return firstName + " " + lastName;
  }
}
