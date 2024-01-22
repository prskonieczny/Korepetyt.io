package com.korepetytio.Korepetytio.entities;

import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.Iterator;
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
        @ManyToMany
        @OnDelete(action = OnDeleteAction.CASCADE)
        @JoinTable(
                name = "announcement_teacher",
                joinColumns = @JoinColumn(name = "announcement_id"),
                inverseJoinColumns = @JoinColumn(name = "teacher_id")
        )
        private List<Account> teachersAccounts = new ArrayList<>();
}
