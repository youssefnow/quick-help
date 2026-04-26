package com.quickhelp.quickhelp_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateHelpRequestDto {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Urgency is required")
    private String urgency;

    private String locationAddress;
    private Double latitude;
    private Double longitude;
}