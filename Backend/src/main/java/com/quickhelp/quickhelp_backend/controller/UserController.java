package com.quickhelp.quickhelp_backend.controller;

import com.quickhelp.quickhelp_backend.dto.request.UpdateLocationRequest;
import com.quickhelp.quickhelp_backend.dto.response.UserResponse;
import com.quickhelp.quickhelp_backend.model.User;
import com.quickhelp.quickhelp_backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.getCurrentUser(user));
    }

    @PutMapping("/me/location")
    public ResponseEntity<UserResponse> updateLocation(
            @Valid @RequestBody UpdateLocationRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(userService.updateLocation(request, user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}