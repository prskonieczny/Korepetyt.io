package com.korepetytio.Korepetytio.entities;

import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class TeacherStatistics extends AbstractEntity{
    @Column(name = "number_of_lessons")
    @NotNull
    private int numberOfLessons;
    @Column(name = "teached_subjects")
    private List<Subjects> techedSubjects = new ArrayList<>();
    @Column(name = "teached_level")
    private List<Levels> teachedLevels = new ArrayList<>();
    @OneToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Account teacher;
}
