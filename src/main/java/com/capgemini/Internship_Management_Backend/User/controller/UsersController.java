package com.capgemini.Internship_Management_Backend.User.controller;

import com.capgemini.Internship_Management_Backend.User.dto.LoginDTO;
import com.capgemini.Internship_Management_Backend.User.dto.RegisterDTO;
import com.capgemini.Internship_Management_Backend.User.service.UserService;
import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
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


}
