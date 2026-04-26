package com.quickhelp.quickhelp_backend.repository;

import com.quickhelp.quickhelp_backend.model.HelpRequest;
import com.quickhelp.quickhelp_backend.model.enums.RequestStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long> {
    List<HelpRequest> findByStatus(RequestStatus status);
    List<HelpRequest> findByCreatorId(Long creatorId);
    List<HelpRequest> findByCreatorIdOrHelperId(Long creatorId, Long helperId);
}