package com.quickhelp.quickhelp_backend.service;

import com.quickhelp.quickhelp_backend.dto.request.CreateHelpRequestDto;
import com.quickhelp.quickhelp_backend.dto.response.HelpRequestResponse;
import com.quickhelp.quickhelp_backend.dto.response.UserResponse;
import com.quickhelp.quickhelp_backend.model.HelpRequest;
import com.quickhelp.quickhelp_backend.model.User;
import com.quickhelp.quickhelp_backend.model.enums.RequestStatus;
import com.quickhelp.quickhelp_backend.model.enums.UrgencyLevel;
import com.quickhelp.quickhelp_backend.repository.HelpRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HelpRequestService {

    private final HelpRequestRepository helpRequestRepository;

    public HelpRequestResponse createRequest(CreateHelpRequestDto request, User creator) {
        HelpRequest helpRequest = new HelpRequest();
        helpRequest.setTitle(request.getTitle());
        helpRequest.setDescription(request.getDescription());
        helpRequest.setCategory(request.getCategory());
        helpRequest.setUrgency(UrgencyLevel.valueOf(request.getUrgency()));
        helpRequest.setStatus(RequestStatus.OPEN);
        helpRequest.setLocationAddress(request.getLocationAddress());
        helpRequest.setLatitude(request.getLatitude());
        helpRequest.setLongitude(request.getLongitude());
        helpRequest.setCreator(creator);

        helpRequest = helpRequestRepository.save(helpRequest);
        return mapToResponse(helpRequest);
    }

    public List<HelpRequestResponse> getAllActiveRequests() {
        return helpRequestRepository.findAll()
                .stream()
                .filter(req -> req.getStatus() == RequestStatus.OPEN || req.getStatus() == RequestStatus.ACCEPTED)
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public HelpRequestResponse getRequestById(Long id) {
        HelpRequest request = helpRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        return mapToResponse(request);
    }

    public List<HelpRequestResponse> getMyRequests(User user) {
        return helpRequestRepository.findByCreatorIdOrHelperId(user.getId(), user.getId())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public HelpRequestResponse acceptRequest(Long id, User helper) {
        HelpRequest request = helpRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (request.getStatus() != RequestStatus.OPEN) {
            throw new RuntimeException("Request is not open for acceptance");
        }

        request.setStatus(RequestStatus.ACCEPTED);
        request.setHelper(helper);

        request = helpRequestRepository.save(request);
        return mapToResponse(request);
    }

    public HelpRequestResponse completeRequest(Long id, User currentUser) {
        HelpRequest request = helpRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (request.getStatus() != RequestStatus.ACCEPTED) {
            throw new RuntimeException("Request is not accepted yet");
        }

        if (request.getHelper() == null || !request.getHelper().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only the helper can complete this request");
        }

        request.setStatus(RequestStatus.COMPLETED);

        request = helpRequestRepository.save(request);
        return mapToResponse(request);
    }

    public void deleteRequest(Long id, User currentUser) {
        HelpRequest request = helpRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (!request.getCreator().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Only the creator can delete this request");
        }

        helpRequestRepository.delete(request);
    }

    private HelpRequestResponse mapToResponse(HelpRequest request) {
        return HelpRequestResponse.builder()
                .id(request.getId())
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .urgency(request.getUrgency().name())
                .status(request.getStatus().name())
                .locationAddress(request.getLocationAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .creator(mapToUserResponse(request.getCreator()))
                .helper(request.getHelper() != null ? mapToUserResponse(request.getHelper()) : null)
                .createdAt(request.getCreatedAt())
                .updatedAt(request.getUpdatedAt())
                .build();
    }

    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole().name())
                .build();
    }
}