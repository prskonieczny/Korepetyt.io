package com.korepetytio.Korepetytio.dto.request;

import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateAccountPropertiesRequest {
    private Set<Levels> newLevels;
    private Set<Subjects> newSubjects;
}
