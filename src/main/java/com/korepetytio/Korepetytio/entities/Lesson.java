package com.korepetytio.Korepetytio.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.korepetytio.Korepetytio.entities.enums.LessonStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Lesson extends AbstractEntity {
    @Column(name = "start_time")
    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime startTime;
    @Column(name = "end_time")
    @NotNull
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime endTime;
    @NotNull
    @Column(name = "student_username")
    private String studentUsername;
    @NotNull
    @Column(name = "teacher_username")
    private String teacherUsername;
    @Column(name = "description", length = 2000)
    private String description;
    @NotNull
    @Column(name = "subject")
    private String subject;
    @Column(name = "lesson_status")
    @Enumerated(EnumType.STRING)
    private LessonStatus lessonStatus;
    @Column(columnDefinition = "text")
    private String image;
}
