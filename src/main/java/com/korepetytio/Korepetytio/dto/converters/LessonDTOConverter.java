package com.korepetytio.Korepetytio.dto.converters;

import com.korepetytio.Korepetytio.dto.response.ShowTeacherLessonsResponse;
import com.korepetytio.Korepetytio.entities.Lesson;

public class LessonDTOConverter {
    public static ShowTeacherLessonsResponse convertLessonToShowTeacherLessonsResponse(Lesson lesson) {
        ShowTeacherLessonsResponse dto = new ShowTeacherLessonsResponse();
        dto.setLessonId(lesson.getId());
        dto.setStartTime(lesson.getStartTime());
        dto.setEndTime(lesson.getEndTime());
        dto.setSubject(lesson.getSubject());
        dto.setDescription(lesson.getDescription());
        dto.setStudentUsername(lesson.getStudentUsername());
        dto.setTeacherUsername(lesson.getTeacherUsername());
        dto.setLessonStatus(lesson.getLessonStatus());
        return dto;
    }
}
