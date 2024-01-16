package com.korepetytio.Korepetytio.controller;

import com.korepetytio.Korepetytio.dto.AddAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.EditAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.ShowAnnouncementsResponse;
import com.korepetytio.Korepetytio.service.interfaces.AnnouncementService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {
    private final AnnouncementService announcementService;
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }
    @GetMapping("/all")
    public ResponseEntity<List<ShowAnnouncementsResponse>> getAllAnnouncements(){
        return ResponseEntity.ok().body(announcementService.getAllAnnouncements());
    }

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('STUDENT')")
    public ResponseEntity<String> addAnnouncement(@RequestBody AddAnnouncementRequest announcementDto) {
        try {
            announcementService.addAnnouncement(announcementDto);
            return ResponseEntity.ok("Announcement added successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to add announcement: " + e.getMessage());
        }
    }

    @DeleteMapping("/{announcementId}")
    public ResponseEntity<String> deleteAnnouncement(@PathVariable Long announcementId) {
        try {
            announcementService.deleteAnnouncement(announcementId);
            return ResponseEntity.ok("Announcement deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete announcement: " + e.getMessage());
        }
    }

    @PutMapping("/edit/{announcementId}")
    public ResponseEntity<String> editAnnouncement(@PathVariable Long announcementId, @RequestBody EditAnnouncementRequest editAnnouncementRequest) {
        try {
            announcementService.editAnnouncement(announcementId, editAnnouncementRequest);
            return ResponseEntity.ok("Announcement edited successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to edit announcement: " + e.getMessage());
        }
    }
}
