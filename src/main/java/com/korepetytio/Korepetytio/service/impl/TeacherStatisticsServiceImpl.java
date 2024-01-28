package com.korepetytio.Korepetytio.service.impl;

import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.entities.TeacherStatistics;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.repository.LessonRepository;
import com.korepetytio.Korepetytio.repository.TeacherStatisticsRepository;
import com.korepetytio.Korepetytio.service.interfaces.TeacherStatisticsService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TeacherStatisticsServiceImpl implements TeacherStatisticsService {

    private final TeacherStatisticsRepository teacherStatisticsRepository;
    private final LessonRepository lessonRepository;
    private final AccountRepository accountRepository;

    public TeacherStatisticsServiceImpl(TeacherStatisticsRepository teacherStatisticsRepository, LessonRepository lessonRepository, AccountRepository accountRepository) {
        this.teacherStatisticsRepository = teacherStatisticsRepository;
        this.lessonRepository = lessonRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public int getNumberOfLessonsByTeacherId(Long teacherId) {
        TeacherStatistics teacherStatistics = teacherStatisticsRepository.findByAccountId(teacherId);
        incrementLessonCounter(teacherId);
        if (teacherStatistics != null) {
            return teacherStatistics.getNumberOfLessons();
        } else {
            return 0;
        }
    }

    private void incrementLessonCounter(Long id) {
        TeacherStatistics teacherStatistics = teacherStatisticsRepository.findByAccountId(id);
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Account not found"));
        teacherStatistics.setNumberOfLessons(lessonRepository.findFinishedLessonsByTeacherUsername(account.getUsername()).size());
        teacherStatisticsRepository.save(teacherStatistics);
    }
}
