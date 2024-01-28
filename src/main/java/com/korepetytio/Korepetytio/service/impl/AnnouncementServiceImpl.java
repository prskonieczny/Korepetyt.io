package com.korepetytio.Korepetytio.service.impl;

import com.korepetytio.Korepetytio.dto.request.AddAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.request.EditAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.response.ShowAnnouncementAccountResponse;
import com.korepetytio.Korepetytio.dto.response.ShowAnnouncementsResponse;
import com.korepetytio.Korepetytio.dto.converters.AccountDTOConverter;
import com.korepetytio.Korepetytio.dto.converters.AnnouncementDTOConverter;
import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.entities.Announcement;
import com.korepetytio.Korepetytio.entities.Role;
import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.RoleType;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.repository.AnnouncementRepository;
import com.korepetytio.Korepetytio.service.interfaces.AnnouncementService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
    public List<ShowAnnouncementsResponse> getOwnAnnouncements() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Account account = accountRepository
                .findByUsername(authentication.getName()).orElseThrow(() -> new RuntimeException("Error: Account not found"));
        List<Announcement> announcements = announcementRepository.findAllByStudentName(account.getUsername());
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
        announcement.setDescription(addAnnouncementRequest.getDescription());
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
        } else if (account.getRoles().stream().anyMatch(role -> role.getPermissionLevel().equals(RoleType.ADMIN))) {
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
            editedAnnouncement.setDescription(editAnnouncementRequest.getDescription());
            announcementRepository.save(editedAnnouncement);
        } else {
            throw new RuntimeException("Error: You have no permissions to edit this announcement");
        }
    }

    @Override
    public void addTeacherToAnnouncement(Long announcementId) {
        Announcement announcement = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new IllegalArgumentException("Announcement not found"));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Account teacher = accountRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("Teacher account not found"));
        if (announcement.getTeachersAccounts().contains(teacher)){
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Teacher is already assigned to this announcement");
        }
        announcement.getTeachersAccounts().add(teacher);
        announcementRepository.save(announcement);
    }

    @Override
    public List<ShowAnnouncementAccountResponse> getTeachersByAnnouncementId(Long announcementId) {
        Announcement announcement = announcementRepository.findById(announcementId)
                .orElseThrow(() -> new IllegalArgumentException("Announcement not found"));
        return announcement.getTeachersAccounts().stream()
                .filter(Objects::nonNull)
                .map(AccountDTOConverter::convertAccountToAnnouncementAccountResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void removeAnnouncementsByTeacherId(Long teacherId) {
        List<Announcement> announcements = announcementRepository.findByTeachersAccounts_Id(teacherId);

        for (Announcement announcement : announcements) {
            announcement.getTeachersAccounts().removeIf(account -> account.getId().equals(teacherId));
        }
        announcements.removeIf(announcement -> announcement.getTeachersAccounts().isEmpty());
        announcementRepository.saveAll(announcements);
    }
}
