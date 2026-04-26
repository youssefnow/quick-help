package com.quickhelp.quickhelp_backend.controller;

import com.quickhelp.quickhelp_backend.dto.request.CreateHelpRequestDto;
import com.quickhelp.quickhelp_backend.dto.response.HelpRequestResponse;
import com.quickhelp.quickhelp_backend.model.User;
import com.quickhelp.quickhelp_backend.service.HelpRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class HelpRequestController {

    private final HelpRequestService helpRequestService;

    @GetMapping
    public ResponseEntity<List<HelpRequestResponse>> getAllRequests() {
        return ResponseEntity.ok(helpRequestService.getAllActiveRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HelpRequestResponse> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(helpRequestService.getRequestById(id));
    }

    @GetMapping("/my")
    public ResponseEntity<List<HelpRequestResponse>> getMyRequests(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(helpRequestService.getMyRequests(user));
    }

    @PostMapping
    public ResponseEntity<HelpRequestResponse> createRequest(
            @Valid @RequestBody CreateHelpRequestDto request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(helpRequestService.createRequest(request, user));
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<HelpRequestResponse> acceptRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(helpRequestService.acceptRequest(id, user));
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<HelpRequestResponse> completeRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(helpRequestService.completeRequest(id, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        helpRequestService.deleteRequest(id, user);
        return ResponseEntity.noContent().build();
    }
}