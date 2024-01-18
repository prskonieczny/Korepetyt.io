package com.korepetytio.Korepetytio.dto.request;

import com.korepetytio.Korepetytio.entities.enums.StarReview;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddOpinionRequest {
    private StarReview starReview;
    private String opinionContent;
    private String opinionPros;
    private String opinionCons;
    private String teacherUsername;
}