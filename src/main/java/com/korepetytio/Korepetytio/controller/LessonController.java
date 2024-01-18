package com.korepetytio.Korepetytio.controller;

import com.korepetytio.Korepetytio.dto.request.CreateLessonRequest;
import com.korepetytio.Korepetytio.dto.response.ShowTeacherLessonsResponse;
import com.korepetytio.Korepetytio.service.interfaces.LessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {
    private final LessonService lessonService;
    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/teacher/{teacherUsername}")
    public ResponseEntity<List<ShowTeacherLessonsResponse>> getTeacherLessons(@PathVariable String teacherUsername) {
        try {
            List<ShowTeacherLessonsResponse> teacherLessons = lessonService.getTeacherLessons(teacherUsername);
            return ResponseEntity.ok(teacherLessons);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @PostMapping("/reserve/{teacherId}")
    public ResponseEntity<String> reserveLesson(
            @PathVariable Long teacherId,
            @RequestBody CreateLessonRequest createLessonRequest
            ){
        try {
            lessonService.reserveLesson(teacherId, createLessonRequest);
            return ResponseEntity.ok("Lesson reserved successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to reserve lesson: " + e.getMessage());
        }
    }
    @DeleteMapping("/cancel/{lessonId}")
    public ResponseEntity<String> cancelLesson(
            @PathVariable Long lessonId
    ){
        try {
            lessonService.cancelLesson(lessonId);
            return ResponseEntity.ok("Lesson canceled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to cancel lesson: " + e.getMessage());
        }
    }
}