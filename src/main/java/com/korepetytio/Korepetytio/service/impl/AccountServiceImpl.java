package com.korepetytio.Korepetytio.service.impl;

import com.korepetytio.Korepetytio.dto.ShowAccountResponse;
import com.korepetytio.Korepetytio.dto.converters.AccountDTOConverter;
import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.entities.Role;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.repository.RoleRepository;
import com.korepetytio.Korepetytio.service.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    PasswordEncoder passwordEncoder;
    private final AccountRepository accountRepository;
    private final RoleRepository roleRepository;

    public AccountServiceImpl(AccountRepository accountRepository, RoleRepository roleRepository) {
        this.accountRepository = accountRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public List<ShowAccountResponse> getAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        return accounts.stream()
                .filter(Objects::nonNull)
                .map(AccountDTOConverter::convertAccountToAccountResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void addAdminRole(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Account not found"));
        // need to seed the database
    }

    @Override
    public void removeAdminRole(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Account not found"));
        // need to seed the database
    }

}
