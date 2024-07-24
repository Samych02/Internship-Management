package com.capgemini.Internship_Management_Backend.User.controller;

import com.capgemini.Internship_Management_Backend.User.dto.LoginDTO;
import com.capgemini.Internship_Management_Backend.User.dto.RegisterDTO;
import com.capgemini.Internship_Management_Backend.User.model.UserRole;
import com.capgemini.Internship_Management_Backend.User.service.UserService;
import com.capgemini.Internship_Management_Backend.common.httpresponse.util.ResponseUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UsersController {
  private final UserService userService;

  @PostMapping("register")
  public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO registerDTO) {
    userService.register(registerDTO);
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(
                    ResponseUtil
                            .successResponse("User created successfully",
                                    Collections.singletonMap("created", true)
                            )
            );
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody @Valid LoginDTO.request request) {
    LoginDTO.response response = userService.login(request);
    if (response == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ResponseUtil.errorResponse("Invalid credentials."));
    }
    return ResponseEntity.ok().body(ResponseUtil.successResponse("Logged in successfully", response));
  }


  @SneakyThrows
  @GetMapping("test")
//  @PreAuthorize("@roleVerifier.isAdmin(#token)")
  public UserRole test(@RequestParam(required = true) UserRole userRole) {
    System.out.println(userRole);
//    String uid = "841sguBDN5TTN0NgZF05m68Gb4O2";
//    UserRecord userRecord = FirebaseAuth.getInstance().getUser(uid);
//    Map<String, Object> existingClaims = userRecord.getCustomClaims();
//
//    // Add or update the role in the custom claims
//    Map<String, Object> newClaims = new HashMap<>(existingClaims);
//    newClaims.put("role", UserRole.Admin.toString());
//
//    // Set the custom claims
//    FirebaseAuth.getInstance().setCustomUserClaims(uid, newClaims);

    return userRole;
  }
}
