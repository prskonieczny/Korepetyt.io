package com.korepetytio.Korepetytio.controller;

import com.korepetytio.Korepetytio.service.interfaces.TeacherStatisticsService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistics")
public class TeacherStatisticsController {
    private final TeacherStatisticsService teacherStatisticsService;

    public TeacherStatisticsController(TeacherStatisticsService teacherStatisticsService) {
        this.teacherStatisticsService = teacherStatisticsService;
    }

    @GetMapping("/lessons/{teacherId}")
    public ResponseEntity<Integer> getNumberOfLessonsByTeacherId(@PathVariable Long teacherId) {
        int numberOfLessons = teacherStatisticsService.getNumberOfLessonsByTeacherId(teacherId);
        return new ResponseEntity<>(numberOfLessons, HttpStatus.OK);
    }
}
