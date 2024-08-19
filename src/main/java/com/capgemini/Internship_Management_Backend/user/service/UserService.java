package com.capgemini.Internship_Management_Backend.user.service;

import com.capgemini.Internship_Management_Backend.user.dto.LoginDTO;
import com.capgemini.Internship_Management_Backend.user.dto.RegisterDTO;
import com.capgemini.Internship_Management_Backend.user.entity.User;
import com.capgemini.Internship_Management_Backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

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

}
