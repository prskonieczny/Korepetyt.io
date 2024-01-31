package com.korepetytio.Korepetytio.service.impl;

import com.korepetytio.Korepetytio.dto.converters.OpinionDTOConverter;
import com.korepetytio.Korepetytio.dto.request.AddOpinionRequest;
import com.korepetytio.Korepetytio.dto.response.ShowOpinionResponse;
import com.korepetytio.Korepetytio.entities.Lesson;
import com.korepetytio.Korepetytio.entities.Opinion;
import com.korepetytio.Korepetytio.repository.LessonRepository;
import com.korepetytio.Korepetytio.repository.OpinionRepository;
import com.korepetytio.Korepetytio.service.interfaces.OpinionService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OpinionServiceImpl implements OpinionService {
    private final OpinionRepository opinionRepository;
    private final LessonRepository lessonRepository;

    public OpinionServiceImpl(OpinionRepository opinionRepository, LessonRepository lessonRepository) {
        this.opinionRepository = opinionRepository;
        this.lessonRepository = lessonRepository;
    }

    @Override
    public void addOpinion(AddOpinionRequest addOpinionRequest) {
        List<Lesson> finishedLesson = lessonRepository.findFinishedLessonByTeacherUsernameAndStudentUsername(
                addOpinionRequest.getTeacherUsername(),
                SecurityContextHolder.getContext().getAuthentication().getName()
        );

        if (!finishedLesson.isEmpty()) {
            Opinion opinion = new Opinion();
            opinion.setStarReview(addOpinionRequest.getStarReview());
            opinion.setOpinionContent(addOpinionRequest.getOpinionContent());
            opinion.setOpinionPros(addOpinionRequest.getOpinionPros());
            opinion.setOpinionCons(addOpinionRequest.getOpinionCons());
            opinion.setTeacherUsername(addOpinionRequest.getTeacherUsername());
            opinion.setStudentUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            opinion.setCreationDate(new Date());
            opinionRepository.save(opinion);
        } else {
            throw new IllegalStateException("You can only add an opinion for a finished lesson with the specified teacher");
        }
    }

    @Override
    public List<ShowOpinionResponse> getAllOpinionsForTeacher(String teacherUsername) {
        List<Opinion> teacherOpinions = opinionRepository.findAllByTeacherUsername(teacherUsername);
        return teacherOpinions.stream()
                .filter(Objects::nonNull)
                .map(OpinionDTOConverter::convertOpinionToOpinionResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteOpinion(Long opinionId) {
        Optional<Opinion> optionalOpinion = opinionRepository.findById(opinionId);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String studentUsername = authentication.getName();
        if (optionalOpinion.isPresent()) {
            Opinion opinion = optionalOpinion.get();
            // We check if the user that wants to delete the opinion is the same who added it
            if (!opinion.getStudentUsername().equals(studentUsername)) {
                throw new IllegalArgumentException("You can only delete your own opinions");
            }
            opinionRepository.delete(opinion);
        } else {
            throw new RuntimeException("Opinion not found");
        }
    }

    @Override
    public List<ShowOpinionResponse> getOwnOpinions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String studentUsername = authentication.getName();
        List<Opinion> ownOpinions = opinionRepository.findAllByStudentUsername(studentUsername);
        return ownOpinions.stream()
                .filter(Objects::nonNull)
                .map(OpinionDTOConverter::convertOpinionToOpinionResponse)
                .collect(Collectors.toList());
    }
}
