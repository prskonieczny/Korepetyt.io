package com.korepetytio.Korepetytio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShowAnnouncementsResponse {
    private Long id;
    private String studentName;
    private String levels;
    private String subjects;
}
