package com.capgemini.Internship_Management_Backend.user.repository;

import com.capgemini.Internship_Management_Backend.user.entity.User;
import com.capgemini.Internship_Management_Backend.user.repository.projection.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  User findByEmailIgnoreCase(String email);

  List<UserProjection> findAllByOrderByCreatedAtDesc();

}
