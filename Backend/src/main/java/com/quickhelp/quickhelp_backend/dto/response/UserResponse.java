package com.quickhelp.quickhelp_backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Long id;
    private String fullName;
    private String email;
    private String role;
    private String locationAddress;
    private Double latitude;
    private Double longitude;
    private LocalDateTime createdAt;
}