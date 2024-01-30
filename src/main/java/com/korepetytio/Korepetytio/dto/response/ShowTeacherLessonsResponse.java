package com.korepetytio.Korepetytio.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.korepetytio.Korepetytio.entities.enums.LessonStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShowTeacherLessonsResponse {
    private Long lessonId;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime startTime;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime endTime;
    private String studentUsername;
    private String teacherUsername;
    private String description;
    private String subject;
    private LessonStatus lessonStatus;
    private String image;
}
