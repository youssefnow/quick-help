package com.quickhelp.quickhelp_backend.controller;

import com.quickhelp.quickhelp_backend.dto.request.CreateFeedbackRequest;
import com.quickhelp.quickhelp_backend.dto.response.FeedbackResponse;
import com.quickhelp.quickhelp_backend.model.User;
import com.quickhelp.quickhelp_backend.service.FeedbackService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {

    private final FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<FeedbackResponse> createFeedback(
            @Valid @RequestBody CreateFeedbackRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(feedbackService.createFeedback(request, user));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<FeedbackResponse>> getFeedbacksByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(feedbackService.getFeedbacksByUser(userId));
    }
}