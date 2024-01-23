package com.korepetytio.Korepetytio.dto.request;

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
public class EditAnnouncementRequest {
    private String levels;
    private String subjects;
    private String description;
}
