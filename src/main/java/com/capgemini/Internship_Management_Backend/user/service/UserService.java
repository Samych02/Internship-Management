package com.capgemini.Internship_Management_Backend.user.service;

import com.capgemini.Internship_Management_Backend.user.dto.LoginDTO;
import com.capgemini.Internship_Management_Backend.user.dto.RegisterDTO;
import com.capgemini.Internship_Management_Backend.user.dto.UpdatePasswordDTO;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import com.capgemini.Internship_Management_Backend.user.repository.UserRepository;
import com.capgemini.Internship_Management_Backend.user.repository.projection.UserProjection;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public Boolean isEmailUsed(String email) {
    User user = userRepository.findByEmailIgnoreCase(email);
    return user != null;
  }

  public void register(RegisterDTO registerDTO) {
    registerDTO.setPassword(new BCryptPasswordEncoder().encode(registerDTO.getPassword()));
    User user = new User(registerDTO);
    userRepository.save(user);
  }

  public LoginDTO.response login(LoginDTO.request request) {
    User user = userRepository.findByEmailIgnoreCase(request.getEmail());
    if (user != null && new BCryptPasswordEncoder().matches(request.getPassword(), user.getPassword())) {
      return new LoginDTO.response(user);
    }
    return null;
  }

  public Boolean updatePassword(UpdatePasswordDTO updatePasswordDTO) {
    Optional<User> user = userRepository.findById(updatePasswordDTO.getUserID());
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    if (user.isPresent() && encoder.matches(updatePasswordDTO.getOldPassword(), user.get().getPassword())) {
      user.get().setPassword(encoder.encode(updatePasswordDTO.getNewPassword()));
      userRepository.save(user.get());
      return true;
    }
    return false;
  }

  public List<UserProjection> getUserList() {
    return userRepository.findAllByOrderByCreatedAtDesc();
  }
}
