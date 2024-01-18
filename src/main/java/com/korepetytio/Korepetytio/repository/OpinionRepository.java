package com.korepetytio.Korepetytio.repository;

import com.korepetytio.Korepetytio.entities.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OpinionRepository extends JpaRepository<Opinion, Long> {
    List<Opinion> findAllByTeacherUsername(String teacherUsername);
    List<Opinion> findAllByStudentUsername(String studentUsername);
}
