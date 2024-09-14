package com.capgemini.Internship_Management_Backend.user.service;

import com.capgemini.Internship_Management_Backend.common.service.FileUtility;
import com.capgemini.Internship_Management_Backend.user.dto.*;
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
  private final FileUtility fileUtility;

  public Boolean isEmailUsed(String email) {
    User user = userRepository.findByEmailIgnoreCase(email);
    return user != null;
  }

  public User register(RegisterDTO registerDTO) {
    registerDTO.setPassword(new BCryptPasswordEncoder().encode(registerDTO.getPassword()));
    User user = new User(registerDTO);
    return userRepository.save(user);
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

  public void resetPassword(ResetPasswordDTO resetPasswordDTO) {
    Optional<User> user = userRepository.findById(resetPasswordDTO.getUserID());
    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    if (user.isPresent()) {
      user.get().setPassword(encoder.encode(resetPasswordDTO.getNewPassword()));
      userRepository.save(user.get());
    }
  }

  public List<UserProjection> getUserList() {
    return userRepository.findAllByOrderByCreatedAtDesc();
  }


  public String updateProfilePicture(UpdatePictureDTO updatePictureDTO) {
    User user = userRepository.findById(updatePictureDTO.getUserID()).get();
    fileUtility.createFolder("profile-images");
    fileUtility.saveUploadFile(updatePictureDTO.getFile(), "/profile-images/" + user.getID().toString());
    user.setImage("/profile-images/" + user.getID().toString());
    userRepository.save(user);
    return ("/profile-images/" + user.getID().toString());
  }
}
