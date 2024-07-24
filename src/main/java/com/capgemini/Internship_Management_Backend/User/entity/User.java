package com.capgemini.Internship_Management_Backend.User.entity;

import com.capgemini.Internship_Management_Backend.User.dto.RegisterDTO;
import com.capgemini.Internship_Management_Backend.User.model.UserRole;
import com.capgemini.Internship_Management_Backend.common.entity.BaseEntity;
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

  public User(RegisterDTO registerDTO) {
    this.email = registerDTO.getEmail();
    this.password = registerDTO.getPassword();
    this.firstName = registerDTO.getFirstName();
    this.lastName = registerDTO.getLastName();
    this.userRole = registerDTO.getUserRole();
  }
}
