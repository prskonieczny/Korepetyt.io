package com.korepetytio.Korepetytio.controller;


import com.korepetytio.Korepetytio.dto.request.ChangeOwnPasswordRequest;
import com.korepetytio.Korepetytio.dto.request.EditOwnAccountDetailsRequest;
import com.korepetytio.Korepetytio.dto.request.EditOwnEmailRequest;
import com.korepetytio.Korepetytio.dto.response.ShowAccountResponse;
import com.korepetytio.Korepetytio.service.interfaces.AccountService;
import jakarta.validation.Valid;
import jdk.jfr.ContentType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
    @PutMapping("/self/details")
    public ResponseEntity editOwnAccountDetails(@Valid @RequestBody EditOwnAccountDetailsRequest editOwnAccountDetailsRequest) {
        accountService.editOwnAccountDetails(editOwnAccountDetailsRequest);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/self/email")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('STUDENT') or hasAuthority('TEACHER')")
    public ResponseEntity editOwnEmail(@Valid @RequestBody EditOwnEmailRequest edtitOwnEmailRequest) {
        accountService.editOwnEmail(edtitOwnEmailRequest);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/delete/{accountId}")
    public ResponseEntity<String> deleteAccount(@PathVariable Long accountId) {
        try {
            accountService.deleteAccount(accountId);
            return ResponseEntity.ok("Account deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete account: " + e.getMessage());
        }
    }
}
