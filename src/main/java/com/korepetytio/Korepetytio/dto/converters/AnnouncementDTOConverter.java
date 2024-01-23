package com.korepetytio.Korepetytio.dto.converters;

import com.korepetytio.Korepetytio.dto.response.ShowAnnouncementsResponse;
import com.korepetytio.Korepetytio.entities.Announcement;

public class AnnouncementDTOConverter {
    public static ShowAnnouncementsResponse convertAnnouncementToAnnouncementResponse(Announcement announcement) {
        ShowAnnouncementsResponse dto = new ShowAnnouncementsResponse();
        dto.setId(announcement.getId());
        dto.setStudentName(announcement.getStudentName());
        dto.setLevels(String.valueOf(announcement.getLevels()));
        dto.setSubjects(String.valueOf(announcement.getSubjects()));
        dto.setDescription(announcement.getDescription());
        return dto;
    }
}
