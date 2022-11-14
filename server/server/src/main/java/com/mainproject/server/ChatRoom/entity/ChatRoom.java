package com.mainproject.server.ChatRoom.entity;

import com.mainproject.server.ChatRoom.dto.ChatRoomDto;
import com.mainproject.server.ChatRoom.service.ChatService;
import lombok.*;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {
    private String roomId;
    private String title;
    private String content;
    private Onair onair = Onair.ON;

    private boolean secret;
    private String pwd;

    public enum Onair {
        ON, OFF;

        @Getter
        private String onair;
    }

    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoom(String roomId, String title, String content, String pwd) {
        this.roomId = roomId;
        this.title = title;
        this.content = content;
        this.pwd = pwd;
        Onair on = Onair.ON;
    }

    public void handlerActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService) {
        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getMember() + "님이 입장했습니다.");
        }
        sendMessage(chatMessage, chatService);
    }

    private <T> void sendMessage(T message, ChatService chatService) {
        sessions.parallelStream()
                .forEach(session -> chatService.sendMessage(session, message));
    }
}
