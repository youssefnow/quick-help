package com.quickhelp.quickhelp_backend.service;

import com.quickhelp.quickhelp_backend.dto.request.MessageRequest;
import com.quickhelp.quickhelp_backend.dto.response.MessageResponse;
import com.quickhelp.quickhelp_backend.model.HelpRequest;
import com.quickhelp.quickhelp_backend.model.Message;
import com.quickhelp.quickhelp_backend.model.User;
import com.quickhelp.quickhelp_backend.repository.HelpRequestRepository;
import com.quickhelp.quickhelp_backend.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;
    private final HelpRequestRepository helpRequestRepository;

    public MessageResponse sendMessage(MessageRequest request, User sender) {
        HelpRequest helpRequest = helpRequestRepository.findById(request.getRequestId())
                .orElseThrow(() -> new RuntimeException("Request not found"));

        Message message = new Message();
        message.setContent(request.getContent());
        message.setSender(sender);
        message.setHelpRequest(helpRequest);

        message = messageRepository.save(message);
        return mapToResponse(message);
    }

    public List<MessageResponse> getMessagesByRequest(Long requestId) {
        return messageRepository.findByHelpRequestIdOrderBySentAtAsc(requestId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private MessageResponse mapToResponse(Message message) {
        return MessageResponse.builder()
                .id(message.getId())
                .content(message.getContent())
                .senderId(message.getSender().getId())
                .senderName(message.getSender().getFullName())
                .sentAt(message.getSentAt())
                .build();
    }
}
