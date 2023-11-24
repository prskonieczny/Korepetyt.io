package com.korepetytio.Korepetytio.dto;

import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EditOwnAccountDetailsRequest {
    private String username;
    @Pattern(regexp = "^[0-9]*$", message = "Invalid phone number.")
    private String phone;
    private String city;
    private String street;
}
