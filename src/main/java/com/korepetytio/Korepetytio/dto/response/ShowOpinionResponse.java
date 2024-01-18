package com.korepetytio.Korepetytio.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.korepetytio.Korepetytio.entities.enums.StarReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShowOpinionResponse {
    private Long opinionId;
    private StarReview starReview;
    private String opinionContent;
    private String opinionPros;
    private String opinionCons;
    private String studentUsername;
    private String teacherUsername;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private Date creationDate;
}
