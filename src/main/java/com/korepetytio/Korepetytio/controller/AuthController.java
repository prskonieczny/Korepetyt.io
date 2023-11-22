package com.korepetytio.Korepetytio.controller;

import com.korepetytio.Korepetytio.dto.LoginRequest;
import com.korepetytio.Korepetytio.dto.LoginResponse;
import com.korepetytio.Korepetytio.dto.RegisterRequest;
import com.korepetytio.Korepetytio.entities.Account;
import com.korepetytio.Korepetytio.entities.Role;
import com.korepetytio.Korepetytio.entities.RoleType;
import com.korepetytio.Korepetytio.repository.AccountRepository;
import com.korepetytio.Korepetytio.repository.RoleRepository;
import com.korepetytio.Korepetytio.security.jwt.JwtUtils;
import com.korepetytio.Korepetytio.security.service.UserDetailsImpl;
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
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtUtils jwtUtils;

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
        if (checkUsername(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (checkEmail(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if (checkPhoneNumber(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Phone number is already in use!");
        }
        Account account = createAccount(registerRequest);
        Role role = new Role(RoleType.TEACHER);
        roleRepository.save(role);
        account.addRole(role);
        accountRepository.save(account);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/register/student")
    public ResponseEntity<?> registerStudent(@Valid @RequestBody RegisterRequest registerRequest) {
        if (checkUsername(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }
        if (checkEmail(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        if (checkPhoneNumber(registerRequest)) {
            return ResponseEntity.badRequest().body("Error: Phone number is already in use!");
        }
        Account account = createAccount(registerRequest);
        Role role = new Role(RoleType.STUDENT);
        roleRepository.save(role);
        account.addRole(role);
        accountRepository.save(account);
        return ResponseEntity.ok("User registered successfully!");
    }

    private boolean checkUsername(RegisterRequest registerRequest) {
        return accountRepository.existsByUsername(registerRequest.getUsername());
    }
    private boolean checkEmail(RegisterRequest registerRequest) {
        return accountRepository.existsByEmail(registerRequest.getEmail());
    }
    private boolean checkPhoneNumber(RegisterRequest registerRequest) {
        return accountRepository.existsByPhone(registerRequest.getPhone());
    }
    private Account createAccount(RegisterRequest registerRequest) {
        return new Account(
                registerRequest.getUsername(),
                passwordEncoder.encode(registerRequest.getPassword()),
                registerRequest.getPhone(),
                registerRequest.getEmail(),
                registerRequest.getCity(),
                registerRequest.getStreet());
    }
}
