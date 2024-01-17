package com.korepetytio.Korepetytio.service.interfaces;

import com.korepetytio.Korepetytio.dto.request.RegisterRequest;
import com.korepetytio.Korepetytio.entities.Account;

public interface AuthService {
    boolean checkUsername(RegisterRequest registerRequest);
    boolean checkEmail(RegisterRequest registerRequest);
    boolean checkPhoneNumber(RegisterRequest registerRequest);
    Account createAccount(RegisterRequest registerRequest);
    void sendRegistrationEmail(String to, String name);
}
