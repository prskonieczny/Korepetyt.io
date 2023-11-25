package com.korepetytio.Korepetytio.repository;

import com.korepetytio.Korepetytio.entities.TeacherStatistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherStatisticsRepository extends JpaRepository<TeacherStatistics, Long> {

}
