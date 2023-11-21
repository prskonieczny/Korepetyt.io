package com.korepetytio.Korepetytio.service.interfaces;

import com.korepetytio.Korepetytio.dto.ShowAccountResponse;

import java.util.List;

public interface AccountService {
    List<ShowAccountResponse> getAllAccounts();
}
