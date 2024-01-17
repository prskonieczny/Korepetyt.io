package com.korepetytio.Korepetytio.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LoginResponse {
    private Long id;
    private String username;
    @JsonIgnore
    private String password;
    private String phone;
    private String email;
    private String city;
    private String street;
    private List<String> roles;
    private String token;
    public LoginResponse(Long id,
                         String username,
                         String password,
                         String phone,
                         String email,
                         String city,
                         String street,
                         List<String> roles,
                         String token) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.phone = phone;
        this.email = email;
        this.city = city;
        this.street = street;
        this.roles = roles;
        this.token = token;
    }


}
