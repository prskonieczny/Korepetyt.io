package com.korepetytio.Korepetytio.dto.converters;

import com.korepetytio.Korepetytio.dto.ShowAccountResponse;
import com.korepetytio.Korepetytio.entities.Account;

public class AccountDTOConverter {
    public static ShowAccountResponse convertAccountToAccountResponse(Account a){
        return ShowAccountResponse.builder()
                .id(a.getId())
                .username(a.getUsername())
                .email(a.getEmail())
                .phone(a.getPhone())
                .city(a.getCity())
                .street(a.getStreet())
                .roles(a.getRoles())
                .levels(a.getLevels())
                .subjects(a.getSubjects())
                .build();
    }
}
