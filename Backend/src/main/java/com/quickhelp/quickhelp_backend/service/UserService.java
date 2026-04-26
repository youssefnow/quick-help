package com.quickhelp.quickhelp_backend.service;

import com.quickhelp.quickhelp_backend.dto.request.UpdateLocationRequest;
import com.quickhelp.quickhelp_backend.dto.response.UserResponse;
import com.quickhelp.quickhelp_backend.model.User;
import com.quickhelp.quickhelp_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserResponse getCurrentUser(User user) {
        return mapToUserResponse(user);
    }

    public UserResponse updateLocation(UpdateLocationRequest request, User user) {
        user.setLatitude(request.getLatitude());
        user.setLongitude(request.getLongitude());
        user.setLocationAddress(request.getLocationAddress());

        user = userRepository.save(user);
        return mapToUserResponse(user);
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserResponse(user);
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .locationAddress(user.getLocationAddress())
                .latitude(user.getLatitude())
                .longitude(user.getLongitude())
                .createdAt(user.getCreatedAt())
                .build();
    }
}