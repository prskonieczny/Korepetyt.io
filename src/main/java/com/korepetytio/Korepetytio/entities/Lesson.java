package com.korepetytio.Korepetytio.entities;

import com.korepetytio.Korepetytio.entities.enums.LessonStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Lesson extends AbstractEntity {
    @Column(name = "start_time")
    @NotNull
    private Date startTime;
    @Column(name = "end_time")
    @NotNull
    private Date endTime;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private Account studentAccount;
    @NotNull
    @ManyToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Account teacherAccount;
    @NotNull
    @Column(name = "description", length = 2000)
    private String description;
    @NotNull
    @Column(name = "subject")
    private String subject;
    @Column(name = "lesson_status")
    @Enumerated(EnumType.STRING)
    private LessonStatus lessonStatus;
}
