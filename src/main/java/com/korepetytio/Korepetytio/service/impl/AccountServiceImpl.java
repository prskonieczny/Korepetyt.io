package com.korepetytio.Korepetytio.service.impl;

import com.korepetytio.Korepetytio.dto.request.ChangeOwnPasswordRequest;
import com.korepetytio.Korepetytio.dto.request.EditOwnAccountDetailsRequest;
import com.korepetytio.Korepetytio.dto.request.EditOwnEmailRequest;
import com.korepetytio.Korepetytio.dto.response.ShowAccountResponse;
import com.korepetytio.Korepetytio.dto.converters.AccountDTOConverter;
import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.entities.Role;
import com.korepetytio.Korepetytio.entities.enums.RoleType;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.repository.RoleRepository;
import com.korepetytio.Korepetytio.security.service.mailSender.EmailService;
import com.korepetytio.Korepetytio.service.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    EmailService emailService;
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
    public List<ShowAccountResponse> getAllTeachers() {
        List<Account> teachersAccounts = accountRepository.findAll();
        return teachersAccounts.stream()
                .filter(Objects::nonNull)
                .filter(account -> account.getRoles()
                        .stream()
                        .anyMatch(role -> role.getPermissionLevel() == RoleType.TEACHER))
                .map(AccountDTOConverter::convertAccountToAccountResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ShowAccountResponse> getAllStudents() {
        List<Account> studentsAccounts = accountRepository.findAll();
        return studentsAccounts.stream()
                .filter(Objects::nonNull)
                .filter(account -> account.getRoles()
                        .stream()
                        .anyMatch(role -> role.getPermissionLevel() == RoleType.STUDENT))
                .map(AccountDTOConverter::convertAccountToAccountResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void addAdminRole(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Account not found"));
        Role adminRole = roleRepository.findByPermissionLevel(RoleType.ADMIN)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT));
        account.addRole(adminRole);
        accountRepository.save(account);
    }

    @Override
    public void removeAdminRole(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Account not found"));
        Role adminRole = roleRepository.findByPermissionLevel(RoleType.ADMIN)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.CONFLICT));
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.equals(account.getUsername(), currentUser.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }
        account.removeRole(adminRole);
        accountRepository.save(account);
    }

    @Override
    public ShowAccountResponse retrieveCurrentUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Account account = accountRepository
                    .findByUsername(authentication.getName()).orElseThrow(() -> new RuntimeException("Error: Account not found"));
            return AccountDTOConverter.convertAccountToAccountResponse(account);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This user does not exist.");
    }

    @Override
    public ShowAccountResponse retrieveOtherUserDetails(Long id) {
        Account account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Error: Account not found"));
        return AccountDTOConverter.convertAccountToAccountResponse(account);
    }

    @Override
    public void changeOwnPassword(ChangeOwnPasswordRequest changeOwnPasswordRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Account account = accountRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Error: Account is not found"));
            if (passwordEncoder.matches(changeOwnPasswordRequest.getNewPassword(), account.getPassword())) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "New password can not be the same as old password.");
            }
            if (!passwordEncoder.matches(changeOwnPasswordRequest.getOldPassword(), account.getPassword())) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Old password is not correct.");
            }
            account.setPassword(passwordEncoder.encode(changeOwnPasswordRequest.getNewPassword()));
            accountRepository.save(account);
            sendChangePasswordEmail(account.getEmail());
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "This user does not exist.");
        }
    }

    @Override
    public void editOwnAccountDetails(EditOwnAccountDetailsRequest editOwnAccountDetailsRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Account account = accountRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Error: Account is not found"));
            updateAccountDetails(account, editOwnAccountDetailsRequest);
        }
    }

    @Override
    public void editOwnEmail(EditOwnEmailRequest editOwnEmailRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Account account = accountRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new RuntimeException("Error: Account is not found"));
            updateOwnEmail(account, editOwnEmailRequest);
        }
    }

    private void updateAccountDetails(Account account, EditOwnAccountDetailsRequest dto) {
        if (dto.getUsername() != null)
            account.setUsername(dto.getUsername());
        if (dto.getCity() != null)
            account.setCity(dto.getCity());
        if (dto.getStreet() != null)
            account.setStreet(dto.getStreet());
        if (dto.getPhone() != null)
            account.setPhone(dto.getPhone());
        accountRepository.save(account);
    }

    private void updateOwnEmail(Account account, EditOwnEmailRequest dto) {
        account.setEmail(dto.getEmail());
        accountRepository.save(account);
        sendUpdateEmailNotification(account.getEmail());
    }

    private void sendChangePasswordEmail(String to) {
        String subject = "Korepetytio - you have changed your password!";
        String content = "Your password has been changed successfully.\nThis wasn't you? Contact us now!";
        emailService.sendEmail(to, subject, content);
    }

    private void sendUpdateEmailNotification(String to) {
        String subject = "Korepetytio - welcome at new email.";
        String content = "Your email has been successfully updated.";
        emailService.sendEmail(to, subject, content);
    }
}
