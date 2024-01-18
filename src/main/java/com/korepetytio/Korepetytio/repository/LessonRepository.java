package com.korepetytio.Korepetytio.repository;

import com.korepetytio.Korepetytio.entities.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

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
}
