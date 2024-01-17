package com.korepetytio.Korepetytio.dto.request;

import com.korepetytio.Korepetytio.entities.enums.Levels;
import com.korepetytio.Korepetytio.entities.enums.Subjects;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    private String username;
    @Size(min = 8, max = 16, message = "Password must be between 8 and 16 characters.")
    private String password;
    @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "Invalid email format.")
    private String email;
    @Pattern(regexp = "^[0-9]*$", message = "Invalid phone number.")
    private String phone;
    private String city;
    private String street;
    private Set<Levels> levels;
    private Set<Subjects> subjects;
}
