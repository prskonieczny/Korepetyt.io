package com.korepetytio.Korepetytio.service.interfaces;

import com.korepetytio.Korepetytio.dto.request.CreateLessonRequest;
import com.korepetytio.Korepetytio.dto.response.ShowTeacherLessonsResponse;

import java.util.List;

public interface LessonService {
    void reserveLesson(Long teacherId, CreateLessonRequest createLessonRequest);
    List<ShowTeacherLessonsResponse> getTeacherLessons(String teacherUsername);
    void cancelLesson(Long lessonId);
    List<ShowTeacherLessonsResponse> getAllReservations();
}
