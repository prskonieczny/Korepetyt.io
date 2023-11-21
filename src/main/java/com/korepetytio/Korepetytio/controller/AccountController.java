package com.korepetytio.Korepetytio.controller;


import com.korepetytio.Korepetytio.dto.ShowAccountResponse;
import com.korepetytio.Korepetytio.service.interfaces.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
}
