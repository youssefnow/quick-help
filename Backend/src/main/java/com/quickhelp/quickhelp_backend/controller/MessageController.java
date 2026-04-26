package com.quickhelp.quickhelp_backend.controller;

import com.quickhelp.quickhelp_backend.dto.request.MessageRequest;
import com.quickhelp.quickhelp_backend.dto.response.MessageResponse;
import com.quickhelp.quickhelp_backend.model.User;
import com.quickhelp.quickhelp_backend.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageResponse> sendMessage(
            @Valid @RequestBody MessageRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(messageService.sendMessage(request, user));
    }

    @GetMapping("/request/{requestId}")
    public ResponseEntity<List<MessageResponse>> getMessages(@PathVariable Long requestId) {
        return ResponseEntity.ok(messageService.getMessagesByRequest(requestId));
    }
}
