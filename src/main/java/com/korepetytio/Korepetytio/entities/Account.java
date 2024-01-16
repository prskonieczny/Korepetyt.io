package com.korepetytio.Korepetytio.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
@Setter
public class Account extends AbstractEntity{

    @Column(name = "username", unique = true, nullable = false)
    private String username;
    @Column(name = "password", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private String password;
    @Column(name = "phone", nullable = false)
    private String phone;
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    @Column(name = "city", nullable = false)
    private String city;
    @Column(name = "street", nullable = false)
    private String street;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Role> roles = new HashSet<>();
    @OneToMany(mappedBy = "studentAccount", cascade = CascadeType.ALL)
    private List<Lesson> lessonListAsStudent = new ArrayList<>();
    @OneToMany(mappedBy = "teacherAccount", cascade = CascadeType.ALL)
    private List<Lesson> lessonListAsTeacher = new ArrayList<>();
    @ElementCollection(targetClass = Levels.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "account_levels", joinColumns = @JoinColumn(name = "account_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private Set<Levels> levels = new HashSet<>();
    @ElementCollection(targetClass = Subjects.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "account_subjects", joinColumns = @JoinColumn(name = "account_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "subject")
    private Set<Subjects> subjects = new HashSet<>();

    public Account(String username, String password, String phone, String email, String city, String street, Set<Levels> levels, Set<Subjects> subjects) {
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.street = street;
        this.levels = levels;
        this.subjects = subjects;
    }

    public void addLessonStudent(Lesson lesson) {
        lessonListAsStudent.add(lesson);
        lesson.setStudentAccount(this);
    }
    public void addLessonTeacher(Lesson lesson) {
        lessonListAsTeacher.add(lesson);
        lesson.setTeacherAccount(this);
    }

    public void addLevel(Levels level){
        levels.add(level);
    }
    public void removeLevel(Levels level){
        levels.remove(level);
    }

    public void addRole(Role role){
        roles.add(role);
    }
    public void removeRole(Role role){
        roles.remove(role);
    }
}
