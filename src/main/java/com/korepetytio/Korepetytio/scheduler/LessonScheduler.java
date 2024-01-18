package com.korepetytio.Korepetytio.scheduler;

import com.korepetytio.Korepetytio.entities.Lesson;
import com.korepetytio.Korepetytio.entities.enums.LessonStatus;
import com.korepetytio.Korepetytio.repository.LessonRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class LessonScheduler {
    private final LessonRepository lessonRepository;

    public LessonScheduler(LessonRepository lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    @Scheduled(fixedRate = 60000) // per minute
    public void checkLessonStatus() {
        List<Lesson> lessons = lessonRepository.findByLessonStatus(LessonStatus.ACTIVE);

        for (Lesson lesson : lessons) {
            if (lesson.getEndTime().isBefore(LocalDateTime.now())) {
                lesson.setLessonStatus(LessonStatus.FINISHED);
                lessonRepository.save(lesson);
            }
        }
    }
}
