package com.korepetytio.Korepetytio.entities;

import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class TecherStatistics extends AbstractEntity{
    @Column(name = "number_of_students")
    @NotNull
    private int numberOfStudents;
    @Column(name = "number_of_lessons")
    @NotNull
    private int numberOfLessons;
    @Column(name = "teached_subjects")
    private List<Subjects> techedSubjects;
    @Column(name = "teached_level")
    private List<Levels> teachedLevels;
    @OneToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Account teacher;
}
