package com.mainproject.server.ChatRoom.repository;

import com.mainproject.server.ChatRoom.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    Optional<ChatRoom> findChatRoomByRoomId(String roomId);

}
