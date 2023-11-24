package com.korepetytio.Korepetytio.controller;


import com.korepetytio.Korepetytio.dto.ChangeOwnPasswordRequest;
import com.korepetytio.Korepetytio.dto.ShowAccountResponse;
import com.korepetytio.Korepetytio.service.interfaces.AccountService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService accountService;
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/test")
    public String test(){
        return "test";
    }
    @GetMapping("/all")
    public ResponseEntity<List<ShowAccountResponse>> getAllAccounts(){
        return ResponseEntity.ok().body(accountService.getAllAccounts());
    }
    @GetMapping("/teachers")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STUDENT')")
    public ResponseEntity<List<ShowAccountResponse>> getAllTeachers(){
        return ResponseEntity.ok().body(accountService.getAllTeachers());
    }
    @GetMapping("/students")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('TEACHER')")
    public ResponseEntity<List<ShowAccountResponse>> getAllStudents(){
        return ResponseEntity.ok().body(accountService.getAllStudents());
    }
    @PostMapping("/addAdminRole/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity addAdminRole(@PathVariable Long id) {
        accountService.addAdminRole(id);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/removeAdminRole/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity removeAdminRole(@PathVariable Long id) {
        accountService.removeAdminRole(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/self")
    @PreAuthorize("hasAuthority('TEACHER') or hasAuthority('STUDENT') or hasAuthority('ADMIN')")
    public ResponseEntity<Object> retrieveCurrentUserDetails() {
        return ResponseEntity.ok().body(accountService.retrieveCurrentUserDetails());
    }
    @GetMapping("/otherUser/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ShowAccountResponse> retrieveOtherUserDetails(@PathVariable Long id) {
        return ResponseEntity.ok().body(accountService.retrieveOtherUserDetails(id));
    }
    @PostMapping("/self/password")
    public ResponseEntity changeOwnPassword(@Valid @RequestBody ChangeOwnPasswordRequest changeOwnPasswordRequest) {
        accountService.changeOwnPassword(changeOwnPasswordRequest);
        return ResponseEntity.ok().build();
    }
}
