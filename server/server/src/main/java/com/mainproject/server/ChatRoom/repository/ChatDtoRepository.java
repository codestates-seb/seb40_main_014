package com.mainproject.server.ChatRoom.repository;

import com.mainproject.server.ChatRoom.entity.ChatRoomDto;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public interface ChatDtoRepository {
    public Map<String, ChatRoomDto> chatRoomMap = null;

}
