package com.mainproject.server.ChatRoom.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@Slf4j
@Getter
@RequiredArgsConstructor
@Service
public class ChatService {
    private final ObjectMapper objectMapper;
    private Map<String, ChatRoom> chatRooms;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    public ChatRoom findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoom creatRoom(String title, String content, String pwd) {
        String randomId = UUID.randomUUID().toString();
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(randomId)
                .title(title)
                .content(content)
                .pwd(pwd)
                .build();
        chatRooms.put(randomId, chatRoom);
        return chatRoom;
    }

    public ChatRoom updateRoom(ChatRoom chatRoom) {
        ChatRoom updateroom = findRoomById(chatRoom.getRoomId());

        Optional.ofNullable(chatRoom.getTitle())
                .ifPresent(updateroom::setTitle);
        Optional.ofNullable(chatRoom.getContent())
                .ifPresent(updateroom::setContent);
        Optional.ofNullable(chatRoom.getPwd())
                .ifPresent(updateroom::setPwd);

        return updateroom;
    }

    public List<ChatRoom> findAllRoom() {
        //채팅방 최근 생성 순으로 반환
        List<ChatRoom> result = new ArrayList<>(chatRooms.values());
        Collections.reverse(result);

        return result;
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }
        catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }

}
