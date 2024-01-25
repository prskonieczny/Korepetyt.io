package com.korepetytio.Korepetytio.repository;

import com.korepetytio.Korepetytio.entities.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByTeachersAccounts_Id(Long teacherId);
    List<Announcement> findAllByStudentName(String studentName);
}
