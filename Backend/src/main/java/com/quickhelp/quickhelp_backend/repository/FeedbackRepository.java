package com.quickhelp.quickhelp_backend.repository;

import com.quickhelp.quickhelp_backend.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findByToUserId(Long toUserId);
    List<Feedback> findByRequestId(Long requestId);
    boolean existsByRequestIdAndFromUserId(Long requestId, Long fromUserId);
}