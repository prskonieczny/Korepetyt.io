package com.korepetytio.Korepetytio.repository;

import com.korepetytio.Korepetytio.entities.Lesson;
import com.korepetytio.Korepetytio.entities.enums.LessonStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    @Query("SELECT l FROM Lesson l " +
        "WHERE l.teacherUsername = :teacherUsername " +
        "AND (:startTime < l.endTime AND :endTime > l.startTime)")
    List<Lesson> findByTeacherAndTimeOverlap(
            @Param("teacherUsername") String teacherUsername,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    default boolean existsByTeacherAndTimeOverlap(
            @Param("teacherUsername") String teacherUsername,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    ) {
        List<Lesson> overlappingLessons = findByTeacherAndTimeOverlap(teacherUsername, startTime, endTime);
        return !overlappingLessons.isEmpty();
    }

    @Query("SELECT l FROM Lesson l WHERE l.teacherUsername = :teacherUsername")
    List<Lesson> findByTeacherUsername(@Param("teacherUsername") String teacherUsername);

    @Query("SELECT l FROM Lesson l WHERE l.studentUsername = :studentUsername")
    List<Lesson> findByStudentUsername(@Param("studentUsername") String studentUsername);

    @Query("SELECT l FROM Lesson l " +
            "WHERE l.startTime BETWEEN :startTime AND :endTime " +
            "AND l.lessonStatus = 'INCOMING'")
    List<Lesson> findLessonsToNotify(
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );
    List<Lesson> findByLessonStatus(LessonStatus lessonStatus);
    List<Lesson> findFinishedLessonByTeacherUsernameAndStudentUsername(String teacherUsername, String studentUsername);
    @Query("SELECT l FROM Lesson l WHERE l.teacherUsername = :teacherUsername AND l.lessonStatus = 'FINISHED'")
    List<Lesson> findFinishedLessonsByTeacherUsername(String teacherUsername);
}
