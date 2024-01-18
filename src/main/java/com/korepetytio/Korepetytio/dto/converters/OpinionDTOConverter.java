package com.korepetytio.Korepetytio.dto.converters;

import com.korepetytio.Korepetytio.dto.response.ShowAccountResponse;
import com.korepetytio.Korepetytio.dto.response.ShowOpinionResponse;
import com.korepetytio.Korepetytio.entities.Opinion;

public class OpinionDTOConverter {
    public static ShowOpinionResponse convertOpinionToOpinionResponse(Opinion o){
        return ShowOpinionResponse.builder()
                .opinionId(o.getId())
                .starReview(o.getStarReview())
                .opinionContent(o.getOpinionContent())
                .opinionPros(o.getOpinionPros())
                .opinionCons(o.getOpinionCons())
                .studentUsername(o.getStudentUsername())
                .teacherUsername(o.getTeacherUsername())
                .creationDate(o.getCreationDate())
                .build();
    }
}
