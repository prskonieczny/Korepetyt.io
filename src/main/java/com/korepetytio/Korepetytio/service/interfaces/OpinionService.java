package com.korepetytio.Korepetytio.service.interfaces;

import com.korepetytio.Korepetytio.dto.request.AddOpinionRequest;
import com.korepetytio.Korepetytio.dto.response.ShowOpinionResponse;

import java.util.List;

public interface OpinionService {
    void addOpinion(AddOpinionRequest addOpinionRequest);
    List<ShowOpinionResponse> getAllOpinionsForTeacher(String teacherUsername);
    void deleteOpinion(Long opinionId);
    List<ShowOpinionResponse> getOwnOpinions();
}
