package com.capgemini.Internship_Management_Backend.subject.service;

import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.model.InternType;
import com.documents4j.api.DocumentType;
import com.documents4j.api.IConverter;
import com.documents4j.job.LocalConverter;
import lombok.SneakyThrows;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectWordGeneratorService {
  @Value("${resources-directory}")
  private String resourcesDirectory;

  @SneakyThrows
  public String generateSubjectFile(Subject subject) {
    Resource resource = new ClassPathResource("Template.docx");
    XWPFDocument document = new XWPFDocument(resource.getInputStream());

    document = replaceText(document, "$title", subject.getTitle());
    document = replaceText(document, "$tasks", "• " + String.join("\n• ", subject.getTasks()));
    // what these lines do is replace both intern type placeholders with 'X' and
    // sets the color to white (invisible) or black depending on the type
    if (subject.getInternType() == InternType.TECHNICIAN) {
      document = replaceText(document, "$profileType", "☒ Technicien                ☐ Ingénieur", true);
    } else {
      document = replaceText(document, "$profileType", "☐ Technicien                ☒ Ingénieur", true);
    }

    document = replaceText(document, "$targetSchools", String.join(", ", subject.getTargetSchools()));
    document = replaceText(document, "$targetSpecialities", String.join(", ", subject.getTargetSpecialities()));
    document = replaceText(document, "$targetSpecialities", String.join(", ", subject.getTargetSpecialities()));
    document = replaceText(document, "$competenciesRequired", "• " + subject.getCompetenciesRequired().stream().map(c -> c.getCategory() + ": " + String.join(", ", c.getDetails())).collect(Collectors.joining("\n• ")));
    document = replaceText(document, "$supervisor", subject.getSupervisor());
    document = replaceText(document, "$internNumber", String.valueOf(subject.getInternNumber()));


    // the path after the base folder
    String partialPath = null;
    if (subject.getPath() != null) {
      partialPath = subject.getPath();
    } else {
      partialPath = "\\sujets\\" + subject.getYear() + "\\" + subject.getTitle() + "\\";
    }
    try {
      Files.createDirectories(Paths.get(resourcesDirectory + partialPath));
      try (FileOutputStream out = new FileOutputStream(Paths.get(resourcesDirectory + partialPath + "sujet.docx").toFile())) {
        document.write(out);
        document.close();
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    ConvertToPDF(resourcesDirectory + partialPath);
    return partialPath;
  }

  private void ConvertToPDF(String path) {
    try {
      InputStream docxInputStream = new FileInputStream(path + "sujet.docx");
      OutputStream outputStream = new FileOutputStream(path + "sujet.pdf");
      IConverter converter = LocalConverter.builder().build();
      converter.convert(docxInputStream).as(DocumentType.DOCX).to(outputStream).as(DocumentType.PDF).execute();
      outputStream.close();
      converter.shutDown();
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private XWPFDocument replaceText(XWPFDocument doc, String originalText, String updatedText) {
    replaceTextInParagraphs(doc.getParagraphs(), originalText, updatedText);
    for (XWPFTable tbl : doc.getTables()) {
      for (XWPFTableRow row : tbl.getRows()) {
        for (XWPFTableCell cell : row.getTableCells()) {
          replaceTextInParagraphs(cell.getParagraphs(), originalText, updatedText);
        }
      }
    }
    return doc;
  }

  //the flag is for the box checking which need special formatting
  private XWPFDocument replaceText(XWPFDocument doc, String originalText, String updatedText, Boolean flag) {
    replaceTextInParagraphs(doc.getParagraphs(), originalText, updatedText, flag);
    for (XWPFTable tbl : doc.getTables()) {
      for (XWPFTableRow row : tbl.getRows()) {
        for (XWPFTableCell cell : row.getTableCells()) {
          replaceTextInParagraphs(cell.getParagraphs(), originalText, updatedText, flag);
        }
      }
    }
    return doc;
  }

  private void replaceTextInParagraphs(List<XWPFParagraph> paragraphs, String originalText, String updatedText) {
    paragraphs.forEach(paragraph -> {
      String paragraphText = paragraph.getParagraphText();
      if (paragraphText.contains(originalText)) {
        String updatedParagraphText = paragraphText.replace(originalText, updatedText);
        while (!paragraph.getRuns().isEmpty()) {
          paragraph.removeRun(0);
        }
        String[] lines = updatedParagraphText.split("\n");
        for (int i = 0; i < lines.length; i++) {
          XWPFRun newRun = paragraph.createRun();
          newRun.setText(lines[i]);
          if (i < lines.length - 1) {
            newRun.addBreak();
          }
        }
      }
    });
  }

  private void replaceTextInParagraphs(List<XWPFParagraph> paragraphs, String originalText, String updatedText, Boolean flag) {
    paragraphs.forEach(paragraph -> {
      String paragraphText = paragraph.getParagraphText();
      if (paragraphText.contains(originalText)) {
        String updatedParagraphText = paragraphText.replace(originalText, updatedText);
        while (!paragraph.getRuns().isEmpty()) {
          paragraph.removeRun(0);
        }
        String[] lines = updatedParagraphText.split("\n");
        for (int i = 0; i < lines.length; i++) {
          XWPFRun newRun = paragraph.createRun();
          newRun.setText(lines[i]);
          newRun.setColor("246F86");
          newRun.setFontSize(20);
          if (i < lines.length - 1) {
            newRun.addBreak();
          }
        }
      }
    });
  }
}
