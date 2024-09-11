package com.capgemini.Internship_Management_Backend.subject.service;

import com.capgemini.Internship_Management_Backend.subject.entity.Subject;
import com.capgemini.Internship_Management_Backend.subject.model.InternType;
import fr.opensagres.poi.xwpf.converter.pdf.PdfConverter;
import fr.opensagres.poi.xwpf.converter.pdf.PdfOptions;
import lombok.SneakyThrows;
import org.apache.poi.xwpf.usermodel.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileFilter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
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
    document = replaceText(document, "$tasks", "\u2022 " + String.join("\n\u2022 ", subject.getTasks()));
    // what these lines do is replace both intern type placeholders with 'X' and
    // sets the color to white (invisible) or black depending on the type
    if (subject.getInternType() == InternType.TECHNICIAN) {
      document = replaceText(document, "$profileType", "[X] Technicien                [  ] Ingénieur", true);
    } else {
      document = replaceText(document, "$profileType", "[  ] Technicien                [X] Ingénieur", true);
    }

    document = replaceText(document, "$targetSchools", String.join(", ", subject.getTargetSchools()));
    document = replaceText(document, "$targetSpecialities", String.join(", ", subject.getTargetSpecialities()));
    document = replaceText(document, "$targetSpecialities", String.join(", ", subject.getTargetSpecialities()));
    document = replaceText(document, "$competenciesRequired", "\u2022 " + subject.getCompetenciesRequired().stream().map(c -> c.getCategory() + ": " + String.join(", ", c.getDetails())).collect(Collectors.joining("\n\u2022 ")));
    document = replaceText(document, "$supervisor", subject.getSupervisor());
    document = replaceText(document, "$internNumber", String.valueOf(subject.getInternNumber()));


    // the path after the base folder
    String partialPath = null;
    String fileNameWithoutExtension = null;
    if (subject.getPath() != null) {
      int lastIndex = subject.getPath().lastIndexOf('\\');
      partialPath = subject.getPath().substring(0, lastIndex + 1);
      fileNameWithoutExtension = subject.getPath().substring(lastIndex + 1);

    } else {
      partialPath = "\\sujets\\" + subject.getYear();
      // the subject file should have this naming convention Cap Eng Sujet de stage_09_AIS_RBSE
      //first we get the index of the subject from subject folder then we append the rest of the path to partialPath
      fileNameWithoutExtension = "Cap Eng Sujet de stage_" + String.format("%02d", getSubjectIndex(resourcesDirectory + partialPath) + 1) + "_AIS_RBSE";
      partialPath += "\\" + subject.getTitle() + "\\";
    }
    try {
      Files.createDirectories(Paths.get(resourcesDirectory + partialPath));
      // create docx file
      try (FileOutputStream out = new FileOutputStream(Paths.get(resourcesDirectory + partialPath + fileNameWithoutExtension + ".docx").toFile())) {
        document.write(out);
      }

      //convert to pdf
      try (FileOutputStream out = new FileOutputStream(Paths.get(resourcesDirectory + partialPath + fileNameWithoutExtension + ".pdf").toFile())) {
        PdfOptions options = PdfOptions.create();
        PdfConverter.getInstance().convert(document, out, options);
        document.close();
      }

    } catch (IOException e) {
      throw new RuntimeException(e);
    }

    return partialPath + fileNameWithoutExtension;
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
          newRun.setFontSize(12);
          if (i < lines.length - 1) {
            newRun.addBreak();
          }
        }
      }
    });
  }

  // We are using this method to get the index of a subject based on the number of subfolder existing
  // It ain't 100% reliable, but we know that subjects can't be removed
  private int getSubjectIndex(String path) {
    try {
      File file = new File(path);
      File[] files = file.listFiles(new FileFilter() {
        @Override
        public boolean accept(File f) {
          return f.isDirectory();
        }
      });
      return Objects.requireNonNull(files).length;
    } catch (NullPointerException e) {
      return 0;
    }
  }
}
