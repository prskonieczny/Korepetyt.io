package com.korepetytio.Korepetytio.dto.converters;

import com.korepetytio.Korepetytio.dto.ShowAccountResponse;
import com.korepetytio.Korepetytio.entities.Account;

public class AccountDTOConverter {
    public static ShowAccountResponse convertAccountToAccountResponse(Account a){
        return ShowAccountResponse.builder()
                .id(a.getId())
                .username(a.getUsername())
                .email(a.getEmail())
                .build();
    }
}
