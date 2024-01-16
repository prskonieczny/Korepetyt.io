package com.korepetytio.Korepetytio.service.interfaces;

import com.korepetytio.Korepetytio.dto.AddAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.EditAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.ShowAnnouncementAccountResponse;
import com.korepetytio.Korepetytio.dto.ShowAnnouncementsResponse;

import java.util.List;

public interface AnnouncementService {
    List<ShowAnnouncementsResponse> getAllAnnouncements();
    void addAnnouncement(AddAnnouncementRequest addAnnouncementRequest);
    void deleteAnnouncement(Long announcementId);
    void editAnnouncement(Long announcementId, EditAnnouncementRequest editAnnouncementRequest);
    void addTeacherToAnnouncement(Long announcementId);
    List<ShowAnnouncementAccountResponse> getTeachersByAnnouncementId(Long announcementId);
}
