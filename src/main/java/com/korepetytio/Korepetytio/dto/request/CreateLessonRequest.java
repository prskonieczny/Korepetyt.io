package com.korepetytio.Korepetytio.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateLessonRequest {
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime startTime;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime endTime;
    private String subject;
    private String description;
}
