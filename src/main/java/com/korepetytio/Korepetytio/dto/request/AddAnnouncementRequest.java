package com.korepetytio.Korepetytio.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddAnnouncementRequest {
    private String levels;
    private String subjects;
}
