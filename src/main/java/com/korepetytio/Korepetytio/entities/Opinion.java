package com.korepetytio.Korepetytio.entities;

import com.korepetytio.Korepetytio.entities.enums.StarReview;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
public class Opinion extends AbstractEntity {
    @Enumerated(EnumType.STRING)
    @NotNull
    private StarReview starReview;
    @Column(length = 1000)
    private String opinionContent;
    @Column(length = 500)
    private String opinionPros;
    @Column(length = 500)
    private String opinionCons;
    private String studentUsername;
    private String teacherUsername;
    private Date creationDate;
}
