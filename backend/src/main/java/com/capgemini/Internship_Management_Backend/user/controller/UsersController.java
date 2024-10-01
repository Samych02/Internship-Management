package com.capgemini.Internship_Management_Backend.user.controller;

import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import com.capgemini.Internship_Management_Backend.user.dto.*;
import com.capgemini.Internship_Management_Backend.user.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
  private final UserService userService;

  @GetMapping("/check-email-used")
  public ResponseEntity<?> checkEmailUsed(@RequestParam @Valid @Email String email) {
    Boolean isEmailUsed = userService.isEmailUsed(email);
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse((isEmailUsed ? "Email used" : "Email not used"), Collections.singletonMap("isEmailUsed", isEmailUsed)));
  }

  @PostMapping("register")
  public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO registerDTO) {
    userService.register(registerDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(ResponseUtil.successResponse("User created successfully", Collections.singletonMap("created", true)));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid LoginDTO.request request) {
    LoginDTO.response response = userService.login(request);
    if (response == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseUtil.errorResponse("Invalid credentials."));
    }
    return ResponseEntity.ok().body(ResponseUtil.successResponse("Logged in successfully", response));
  }

  @PatchMapping("update-password")
  public ResponseEntity<?> updatePassword(@RequestBody @Valid UpdatePasswordDTO updatePasswordDTO) {
    if (userService.updatePassword(updatePasswordDTO)) {
      return ResponseEntity.ok().body(ResponseUtil.successResponse("Password updated successfully", Collections.singletonMap("isPasswordUpdated", true)));
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseUtil.errorResponse("Invalid credentials."));
    }
  }

  @PatchMapping("reset-password")
  public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordDTO resetPasswordDTO) {
    userService.resetPassword(resetPasswordDTO);
    return ResponseEntity.ok().body(ResponseUtil.successResponse("Password reset successfully", Collections.singletonMap("isPasswordReset", true)));
  }

  @PatchMapping("update-profile-picture")
  public ResponseEntity<?> updateProfilePicture(@ModelAttribute @Valid UpdatePictureDTO updatePictureDTO) {
    return ResponseEntity.ok().body(ResponseUtil.successResponse("Image updated successfully", Collections.singletonMap("path", userService.updateProfilePicture(updatePictureDTO)
    )));
  }

  @GetMapping
  public ResponseEntity<?> getUsers() {
    return ResponseEntity.status(HttpStatus.OK).body(ResponseUtil.successResponse("Users fetched successfully", userService.getUserList()));
  }

  @DeleteMapping("{userID}")
  public ResponseEntity<?> deleteUser(@PathVariable Integer userID) {
    userService.deleteAccount(userID);
    return ResponseEntity.ok().body(ResponseUtil.successResponse("Account deleted successfully", Collections.singletonMap("isAccountDeleted", true)));
  }

  @PatchMapping("update-role")
  public ResponseEntity<?> updateRole(@RequestBody @Valid EditRoleDTO editRoleDTO){
    userService.editRole(editRoleDTO);
    return ResponseEntity.ok().body(ResponseUtil.successResponse("Account role edited successfully", Collections.singletonMap("isRoleEdited", true)));
  }

}
