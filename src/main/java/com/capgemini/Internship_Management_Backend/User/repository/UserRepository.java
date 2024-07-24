package com.capgemini.Internship_Management_Backend.User.repository;

import com.capgemini.Internship_Management_Backend.User.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  User findByEmail(String email);

}
