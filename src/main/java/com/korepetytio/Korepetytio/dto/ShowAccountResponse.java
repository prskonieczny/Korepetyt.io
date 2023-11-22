package com.korepetytio.Korepetytio.dto;

import com.korepetytio.Korepetytio.entities.Role;
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
public class ShowAccountResponse {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String city;
    private String street;
    private Set<Role> roles = new HashSet<>();
}