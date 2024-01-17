package com.korepetytio.Korepetytio.dto.request;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChangeOwnPasswordRequest {
    private String oldPassword;
    @Size(min = 8, max = 16)
    private String newPassword;
}
