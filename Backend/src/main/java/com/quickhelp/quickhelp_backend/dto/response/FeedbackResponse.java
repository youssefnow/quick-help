package com.quickhelp.quickhelp_backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class FeedbackResponse {
    private Long id;
    private Integer rating;
    private String comment;
    private UserResponse fromUser;
    private UserResponse toUser;
    private Long requestId;
    private LocalDateTime createdAt;
}