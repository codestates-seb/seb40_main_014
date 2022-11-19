package com.mainproject.server.ChatRoom.repository;

import com.mainproject.server.ChatRoom.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, String> {

}
