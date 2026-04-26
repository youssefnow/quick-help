package com.quickhelp.quickhelp_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MessageRequest {
    @NotNull
    private Long requestId;
    
    @NotBlank
    private String content;
}
