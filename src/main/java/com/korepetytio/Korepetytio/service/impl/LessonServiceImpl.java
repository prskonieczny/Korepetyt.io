package com.korepetytio.Korepetytio.service.impl;

import com.korepetytio.Korepetytio.dto.converters.LessonDTOConverter;
import com.korepetytio.Korepetytio.dto.request.CreateLessonRequest;
import com.korepetytio.Korepetytio.dto.response.ShowTeacherLessonsResponse;
import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.entities.Lesson;
import com.korepetytio.Korepetytio.entities.enums.LessonStatus;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.repository.LessonRepository;
import com.korepetytio.Korepetytio.service.interfaces.LessonService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.korepetytio.Korepetytio.entities.enums.RoleType.ADMIN;
import static com.korepetytio.Korepetytio.entities.enums.RoleType.STUDENT;

@Service
public class LessonServiceImpl implements LessonService {
    private final LessonRepository lessonRepository;
    private final AccountRepository accountRepository;
    public LessonServiceImpl(LessonRepository lessonRepository, AccountRepository accountRepository) {
        this.lessonRepository = lessonRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public void reserveLesson(Long teacherId, CreateLessonRequest createLessonRequest) {
        // we get current user account
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account student = accountRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Error: Student account not found"));

        // it must be student
        if (student.getRoles().stream().noneMatch(role -> role.getPermissionLevel().equals(STUDENT))) {
            throw new IllegalArgumentException("Only students can reserve lessons");
        }

        // we get wanted teacher's account
        Account teacher = accountRepository.findById(teacherId)
                .orElseThrow(() -> new RuntimeException("Error: Teacher account not found"));

        // the teacher must teach the subject we want to reserve
        if (!teacher.getSubjects().contains(Subjects.valueOf(createLessonRequest.getSubject()))) {
            throw new IllegalArgumentException("Teacher does not teach the selected subject");
        }

        // we check if there are no colliding lessons
        if (lessonRepository.existsByTeacherAndTimeOverlap(
                teacher.getUsername(),
                createLessonRequest.getStartTime(),
                createLessonRequest.getEndTime())) {
            throw new IllegalArgumentException("Teacher already has a lesson in the given period");
        }

        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime lessonStartDateTime = createLessonRequest.getStartTime();

        // we check if the lesson is not before current date
        if (lessonStartDateTime.isBefore(currentDateTime)) {
            throw new IllegalArgumentException("Lesson start time cannot be earlier than the current date and time");
        }

        // we create new lesson and save it in database
        Lesson lesson = new Lesson();
        lesson.setStudentUsername(student.getUsername());
        lesson.setTeacherUsername(teacher.getUsername());
        lesson.setStartTime(createLessonRequest.getStartTime());
        lesson.setEndTime(createLessonRequest.getEndTime());
        lesson.setLessonStatus(LessonStatus.INCOMING);
        lesson.setSubject(createLessonRequest.getSubject());
        lesson.setDescription(createLessonRequest.getDescription());

        lessonRepository.save(lesson);
    }

    @Override
    public List<ShowTeacherLessonsResponse> getTeacherLessons(String teacherUsername) {
        List<Lesson> teacherLessons = lessonRepository.findByTeacherUsername(teacherUsername);
        return teacherLessons.stream()
                .filter(Objects::nonNull)
                .map(LessonDTOConverter::convertLessonToShowTeacherLessonsResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelLesson(Long lessonId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String studentUsername = authentication.getName();

        Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
        Account accountDeletingLesson = accountRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Error: Student account not found"));

        if (optionalLesson.isPresent()) {
            Lesson lesson = optionalLesson.get();

            // lessons can be deleted only by user that created them or ADMIN user
            if (!(lesson.getStudentUsername().equals(studentUsername))
                    || !(accountDeletingLesson.getRoles().stream().noneMatch(role -> role.getPermissionLevel().equals(ADMIN)))) {
                throw new IllegalArgumentException("You have no permissions to cancel this lesson");
            }

            LocalDateTime lessonStartDateTime = lesson.getStartTime();
            LocalDateTime currentDateTime = LocalDateTime.now();

            // we can delete lessons max 2 hours before it starts
            if (lessonStartDateTime.isBefore(currentDateTime.plusHours(2))) {
                throw new IllegalArgumentException("You can only cancel a lesson at least 2 hours before its start");
            }

            lessonRepository.delete(lesson);
        } else {
            throw new RuntimeException("Lesson not found");
        }
    }

    @Override
    public List<ShowTeacherLessonsResponse> getAllReservations() {
        List<Lesson> teacherLessons = lessonRepository.findAll();
        return teacherLessons.stream()
                .filter(Objects::nonNull)
                .map(LessonDTOConverter::convertLessonToShowTeacherLessonsResponse)
                .collect(Collectors.toList());
    }
}
