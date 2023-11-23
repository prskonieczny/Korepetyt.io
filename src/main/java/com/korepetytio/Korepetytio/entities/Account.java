package com.korepetytio.Korepetytio.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

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


    public Account(String username, String password, String phone, String email, String city, String street) {
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.street = street;
    }

    public void addLessonStudent(Lesson lesson) {
        lessonListAsStudent.add(lesson);
        lesson.setStudentAccount(this);
    }
    public void addLessonTeacher(Lesson lesson) {
        lessonListAsTeacher.add(lesson);
        lesson.setTeacherAccount(this);
    }

    public void addRole(Role role){
        roles.add(role);
    }
    public void removeRole(Role role){
        roles.remove(role);
    }
}
