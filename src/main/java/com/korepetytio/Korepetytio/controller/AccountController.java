package com.korepetytio.Korepetytio.controller;


import com.korepetytio.Korepetytio.dto.ShowAccountResponse;
import com.korepetytio.Korepetytio.service.interfaces.AccountService;
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
}
