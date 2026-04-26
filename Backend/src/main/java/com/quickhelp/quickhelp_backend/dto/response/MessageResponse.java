package com.quickhelp.quickhelp_backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class MessageResponse {
    private Long id;
    private String content;
    private Long senderId;
    private String senderName;
    private LocalDateTime sentAt;
}
