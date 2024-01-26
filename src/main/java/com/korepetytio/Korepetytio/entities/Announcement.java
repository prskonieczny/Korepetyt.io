package com.korepetytio.Korepetytio.entities;

import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class Announcement extends AbstractEntity {
        @Column(name = "studentName", nullable = false)
        private String studentName;
        @Enumerated(EnumType.STRING)
        @Column(name = "level")
        private Levels levels;
        @Enumerated(EnumType.STRING)
        @Column(name = "subject")
        private Subjects subjects;
        @Column(name = "description")
        private String description;
        @ManyToMany
        @OnDelete(action = OnDeleteAction.CASCADE)
        @JoinTable(
                name = "announcement_teacher",
                joinColumns = @JoinColumn(name = "announcement_id"),
                inverseJoinColumns = @JoinColumn(name = "teacher_id")
        )
        private List<Account> teachersAccounts = new ArrayList<>();
}
