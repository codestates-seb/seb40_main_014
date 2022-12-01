package com.mainproject.server.chatroom.repository;

import com.mainproject.server.chatroom.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    ChatMessage findByMemberName(String memberName);

}
