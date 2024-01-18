package com.korepetytio.Korepetytio.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TeacherStatistics extends AbstractEntity{
    @Column(name = "number_of_lessons")
    private int numberOfLessons;
    @OneToOne
    @JoinColumn(name = "teacher_id", referencedColumnName = "id")
    private Account teacher;
}
