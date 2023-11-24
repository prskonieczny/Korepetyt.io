package com.korepetytio.Korepetytio.controller;

import com.korepetytio.Korepetytio.dto.LoginRequest;
import com.korepetytio.Korepetytio.dto.LoginResponse;
import com.korepetytio.Korepetytio.dto.RegisterRequest;
import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.entities.Role;
import com.korepetytio.Korepetytio.entities.enums.RoleType;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.repository.RoleRepository;
import com.korepetytio.Korepetytio.security.jwt.JwtUtils;
import com.korepetytio.Korepetytio.security.service.UserDetailsImpl;
import com.korepetytio.Korepetytio.security.service.mailSender.EmailService;
import com.korepetytio.Korepetytio.service.interfaces.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    AccountRepository accountRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwtToken = jwtUtils.generateJwt(userDetails);

        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok().body(new LoginResponse(
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getPassword(),
                userDetails.getPhone(),
                userDetails.getCity(),
                userDetails.getStreet(),
                userDetails.getEmail(),
                roles, jwtToken));
    }

    @PostMapping("/register/teacher")
    public ResponseEntity<?> registerTeacher(@Valid @RequestBody RegisterRequest registerRequest) {
        if (authService.checkUsername(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (authService.checkEmail(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if (authService.checkPhoneNumber(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Phone number is already in use!");
        }
        Account account = authService.createAccount(registerRequest);
        Role role = roleRepository.findByPermissionLevel(RoleType.TEACHER).orElseThrow(
                () -> new RuntimeException("Error: Role is not found!"));
        account.addRole(role);
        accountRepository.save(account);
        authService.sendRegistrationEmail(account.getEmail(), account.getUsername());
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@Valid @RequestBody RegisterRequest registerRequest) {
        if (authService.checkUsername(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (authService.checkEmail(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if (authService.checkPhoneNumber(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Phone number is already in use!");
        }
        Account account = authService.createAccount(registerRequest);
        Role role = roleRepository.findByPermissionLevel(RoleType.STUDENT).orElseThrow(
                () -> new RuntimeException("Error: Role is not found!"));
        account.addRole(role);
        accountRepository.save(account);
        authService.sendRegistrationEmail(account.getEmail(), account.getUsername());
        return ResponseEntity.ok("User registered successfully!");
    }
}
