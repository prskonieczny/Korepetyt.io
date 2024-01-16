package com.korepetytio.Korepetytio.dto;

import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShowAnnouncementAccountResponse {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String city;
    private String street;
    private Set<Levels> levels = new HashSet<>();
    private Set<Subjects> subjects = new HashSet<>();
}
