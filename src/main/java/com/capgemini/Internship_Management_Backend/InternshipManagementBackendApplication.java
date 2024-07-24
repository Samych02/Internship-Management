package com.capgemini.Internship_Management_Backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@EnableMethodSecurity
public class InternshipManagementBackendApplication {

  public static void main(String[] args) {
    SpringApplication.run(InternshipManagementBackendApplication.class, args);
  }

}
