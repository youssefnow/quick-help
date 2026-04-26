package com.quickhelp.quickhelp_backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class HelpRequestResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String urgency;
    private String status;
    private String locationAddress;
    private Double latitude;
    private Double longitude;
    private UserResponse creator;
    private UserResponse helper;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}