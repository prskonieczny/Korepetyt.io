package com.korepetytio.Korepetytio.service.impl;

import com.korepetytio.Korepetytio.dto.RegisterRequest;
import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.security.service.mailSender.EmailService;
import com.korepetytio.Korepetytio.service.interfaces.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    EmailService emailService;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    public boolean checkUsername(RegisterRequest registerRequest) {
        return accountRepository.existsByUsername(registerRequest.getUsername());
    }
    @Override
    public boolean checkEmail(RegisterRequest registerRequest) {
        return accountRepository.existsByEmail(registerRequest.getEmail());
    }
    @Override
    public boolean checkPhoneNumber(RegisterRequest registerRequest) {
        return accountRepository.existsByPhone(registerRequest.getPhone());
    }
    @Override
    public Account createAccount(RegisterRequest registerRequest) {
        return new Account(
                registerRequest.getUsername(),
                passwordEncoder.encode(registerRequest.getPassword()),
                registerRequest.getPhone(),
                registerRequest.getEmail(),
                registerRequest.getCity(),
                registerRequest.getStreet());
    }
    @Override
    public void sendRegistrationEmail(String to, String name) {
        String subject = "Korepetytio - welcome on board " + name + "!";
        String content = "Thank you for registration. Your account has been created successfully.";
        emailService.sendEmail(to, subject, content);
    }
}
