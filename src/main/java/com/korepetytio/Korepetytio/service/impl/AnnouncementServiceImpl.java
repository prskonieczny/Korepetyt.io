package com.korepetytio.Korepetytio.service.impl;

import com.korepetytio.Korepetytio.dto.AddAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.EditAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.ShowAnnouncementsResponse;
import com.korepetytio.Korepetytio.dto.converters.AnnouncementDTOConverter;
import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.entities.Announcement;
import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.repository.AnnouncementRepository;
import com.korepetytio.Korepetytio.service.interfaces.AnnouncementService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AnnouncementServiceImpl implements AnnouncementService {

    private final AnnouncementRepository announcementRepository;
    private final AccountRepository accountRepository;
    public AnnouncementServiceImpl(AnnouncementRepository announcementRepository, AccountRepository accountRepository) {
        this.announcementRepository = announcementRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    public List<ShowAnnouncementsResponse> getAllAnnouncements() {
        List<Announcement> announcements = announcementRepository.findAll();
        return announcements.stream()
                .filter(Objects::nonNull)
                .map(AnnouncementDTOConverter::convertAnnouncementToAnnouncementResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void addAnnouncement(AddAnnouncementRequest addAnnouncementRequest) {
        Announcement announcement = new Announcement();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = accountRepository
                .findByUsername(authentication.getName()).orElseThrow(() -> new RuntimeException("Error: Account not found"));
        announcement.setStudentName(account.getUsername());
        announcement.setLevels(Levels.valueOf(addAnnouncementRequest.getLevels()));
        announcement.setSubjects(Subjects.valueOf(addAnnouncementRequest.getSubjects()));
        announcementRepository.save(announcement);
    }

    @Override
    public void deleteAnnouncement(Long announcementId) {
        Announcement deletedAnnouncement = announcementRepository
                .findById(announcementId)
                .orElseThrow(() -> new IllegalArgumentException("Error: Announcement not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = accountRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Error: Account not found"));
        if (Objects.equals(account.getUsername(), deletedAnnouncement.getStudentName())) {
            announcementRepository.deleteById(announcementId);
        } else {
            throw new RuntimeException("Error: You have no permissions to delete this announcement");
        }
    }

    @Override
    public void editAnnouncement(Long announcementId, EditAnnouncementRequest editAnnouncementRequest) {
        Announcement editedAnnouncement = announcementRepository
                .findById(announcementId)
                .orElseThrow(() -> new IllegalArgumentException("Error: Announcement not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = accountRepository
                .findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Error: Account not found"));
        if (Objects.equals(account.getUsername(), editedAnnouncement.getStudentName())) {
            editedAnnouncement.setLevels(Levels.valueOf(editAnnouncementRequest.getLevels()));
            editedAnnouncement.setSubjects(Subjects.valueOf(editAnnouncementRequest.getSubjects()));
            announcementRepository.save(editedAnnouncement);
        } else {
            throw new RuntimeException("Error: You have no permissions to edit this announcement");
        }
    }
}
