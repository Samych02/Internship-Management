package com.capgemini.Internship_Management_Backend.common.service;

import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileUtility {
  @Value("${resources-directory}")
  private String resourcesDirectory;

  @SneakyThrows
  public void saveUploadFile(MultipartFile file, String path) {
    byte[] bytes = file.getBytes();
    Path fullPath = Paths.get(resourcesDirectory + "\\" + path);
    Files.write(fullPath, bytes);
  }

  @SneakyThrows
  public void createFolder(String path) {
    Files.createDirectories(Paths.get(resourcesDirectory + "\\" + path));
  }

}
