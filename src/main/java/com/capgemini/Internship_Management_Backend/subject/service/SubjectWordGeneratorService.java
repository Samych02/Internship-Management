package com.capgemini.Internship_Management_Backend.subject.service;

import com.capgemini.Internship_Management_Backend.subject.dto.AddSubjectDTO;
import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubjectWordGeneratorService {

  public void addSubject(AddSubjectDTO addSubjectDTO) {
    Subject subject = new Subject(addSubjectDTO);
  }

  @SneakyThrows
  public void generateSubjectFile() {
    Resource resource = new ClassPathResource("Template.docx");
    XWPFDocument document = new XWPFDocument(resource.getInputStream());

    document = replaceText(document, "$tasks", "• uefgurfgyurfyg\n• iuehdiuedh");


    Path newDocPath = Paths.get("src/main/resources/modifiedTemplate.docx");
    try (FileOutputStream out = new FileOutputStream(newDocPath.toFile())) {
      document.write(out);
    }
    document.close();

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

  private void replaceTextInParagraphs(List<XWPFParagraph> paragraphs, String originalText, String updatedText) {
    paragraphs.forEach(paragraph -> replaceTextInParagraph(paragraph, originalText, updatedText));
  }

  private void replaceTextInParagraph(XWPFParagraph paragraph, String originalText, String updatedText) {
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
  }
}
