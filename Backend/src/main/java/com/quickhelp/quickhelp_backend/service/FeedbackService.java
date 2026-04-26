package com.quickhelp.quickhelp_backend.service;

import com.quickhelp.quickhelp_backend.dto.request.CreateFeedbackRequest;
import com.quickhelp.quickhelp_backend.dto.response.FeedbackResponse;
import com.quickhelp.quickhelp_backend.dto.response.UserResponse;
import com.quickhelp.quickhelp_backend.model.Feedback;
import com.quickhelp.quickhelp_backend.model.HelpRequest;
import com.quickhelp.quickhelp_backend.model.User;
import com.quickhelp.quickhelp_backend.model.enums.RequestStatus;
import com.quickhelp.quickhelp_backend.repository.FeedbackRepository;
import com.quickhelp.quickhelp_backend.repository.HelpRequestRepository;
import com.quickhelp.quickhelp_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {

    private final FeedbackRepository feedbackRepository;
    private final HelpRequestRepository helpRequestRepository;
    private final UserRepository userRepository;

    public FeedbackResponse createFeedback(CreateFeedbackRequest request, User fromUser) {
        HelpRequest helpRequest = helpRequestRepository.findById(request.getRequestId())
                .orElseThrow(() -> new RuntimeException("Request not found"));

        if (helpRequest.getStatus() != RequestStatus.COMPLETED) {
            throw new RuntimeException("Cannot give feedback on incomplete request");
        }

        if (feedbackRepository.existsByRequestIdAndFromUserId(request.getRequestId(), fromUser.getId())) {
            throw new RuntimeException("You have already given feedback for this request");
        }

        User toUser = userRepository.findById(request.getToUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Feedback feedback = new Feedback();
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        feedback.setRequest(helpRequest);
        feedback.setFromUser(fromUser);
        feedback.setToUser(toUser);

        feedback = feedbackRepository.save(feedback);

        return mapToResponse(feedback);
    }

    public List<FeedbackResponse> getFeedbacksByUser(Long userId) {
        return feedbackRepository.findByToUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private FeedbackResponse mapToResponse(Feedback feedback) {
        return FeedbackResponse.builder()
                .id(feedback.getId())
                .rating(feedback.getRating())
                .comment(feedback.getComment())
                .fromUser(mapToUserResponse(feedback.getFromUser()))
                .toUser(mapToUserResponse(feedback.getToUser()))
                .requestId(feedback.getRequest().getId())
                .createdAt(feedback.getCreatedAt())
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