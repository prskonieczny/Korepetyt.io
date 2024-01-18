package com.korepetytio.Korepetytio.scheduler;

import com.korepetytio.Korepetytio.entities.Lesson;
import com.korepetytio.Korepetytio.entities.enums.LessonStatus;
import com.korepetytio.Korepetytio.repository.LessonRepository;
import com.korepetytio.Korepetytio.security.service.mailSender.EmailService;
import org.springframework.mail.MailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class LessonScheduler {
    private final LessonRepository lessonRepository;
    private final EmailService emailService;
    public LessonScheduler(LessonRepository lessonRepository, MailSender mailSender, EmailService emailService) {
        this.lessonRepository = lessonRepository;
        this.emailService = emailService;
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
    @Scheduled(fixedRate = 60000) // per minute
    public void sendEmailBeforeLesson() {
        List<Lesson> lessons = lessonRepository.findLessonsToNotify(
                LocalDateTime.now(),
                LocalDateTime.now().plusHours(2)
        );
        for (Lesson lesson : lessons) {
            // Make sure that the lesson is starting in 2 hours
            if (lesson.getStartTime().isBefore(LocalDateTime.now().plusHours(2)) &&
                    lesson.getStartTime().isAfter(LocalDateTime.now())) {
                // Send reminder to student
                sendStudentReminderMail(lesson.getStudentUsername(), lesson.getTeacherUsername(), lesson.getSubject());
                // Send reminder to teacher
                sendTeacherReminderMail(lesson.getTeacherUsername(), lesson.getStudentUsername(), lesson.getSubject());
            }
        }
    }
    private void sendStudentReminderMail(String to, String teacherUsername, String lessonSubject) {
        String subject = "Korepetyt.io - lesson reminder!";
        String content = "Your lesson with " + teacherUsername + " on " + lessonSubject + " will start in 2 hours! Get prepared!";
        emailService.sendEmail(to, subject, content);
    }
    private void sendTeacherReminderMail(String to, String studentUsername, String lessonSubject) {
        String subject = "Korepetyt.io - lesson reminder!";
        String content = "Your lesson with " + studentUsername + " on " + lessonSubject + " will start in 2 hours! Get prepared!";
        emailService.sendEmail(to, subject, content);
    }
}
