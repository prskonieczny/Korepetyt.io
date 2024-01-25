package com.korepetytio.Korepetytio.service.interfaces;

import com.korepetytio.Korepetytio.dto.request.AddAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.request.EditAnnouncementRequest;
import com.korepetytio.Korepetytio.dto.response.ShowAnnouncementAccountResponse;
import com.korepetytio.Korepetytio.dto.response.ShowAnnouncementsResponse;

import java.util.List;

public interface AnnouncementService {
    List<ShowAnnouncementsResponse> getAllAnnouncements();
    List<ShowAnnouncementsResponse> getOwnAnnouncements();
    void addAnnouncement(AddAnnouncementRequest addAnnouncementRequest);
    void deleteAnnouncement(Long announcementId);
    void editAnnouncement(Long announcementId, EditAnnouncementRequest editAnnouncementRequest);
    void addTeacherToAnnouncement(Long announcementId);
    List<ShowAnnouncementAccountResponse> getTeachersByAnnouncementId(Long announcementId);
    void removeAnnouncementsByTeacherId(Long teacherId);
}
