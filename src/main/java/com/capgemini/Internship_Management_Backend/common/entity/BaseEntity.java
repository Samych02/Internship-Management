package com.capgemini.Internship_Management_Backend.common.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  protected Integer ID;

  @CreatedDate
  @Column(name = "created_at")
  protected LocalDateTime createdAt;

  @LastModifiedDate
  @Column(name = "updated_at")
  protected LocalDateTime updatedAt;

  public BaseEntity(Integer ID) {
    this.ID = ID;
  }
}
