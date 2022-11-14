package com.mainproject.server.ChatRoom.entity;

<<<<<<< HEAD
import com.mainproject.server.ChatRoom.dto.ChatRoomDto;
=======
>>>>>>> 32cd91d954cda2c0246932f7a3da3f6ab1145294
import com.mainproject.server.ChatRoom.service.ChatService;
import com.mainproject.server.auditable.Auditable;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
<<<<<<< HEAD
import org.springframework.data.domain.Persistable;
=======
>>>>>>> 32cd91d954cda2c0246932f7a3da3f6ab1145294
import org.springframework.web.socket.WebSocketSession;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter
@AllArgsConstructor
@Entity
@NoArgsConstructor
public class ChatRoom extends Auditable {
    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String roomId;
    @Column
    private String title;
    @Column
    private String content;

    @Column
    private Onair onair = Onair.ON;

    @Column
    private boolean secret;
    @Column
    private String pwd;

    public enum Onair {
        ON, OFF;

        @Getter
        private String onair;
    }


    @Builder
    public ChatRoom(String roomId, String title, String content, String pwd) {
        this.roomId = roomId;
        this.title = title;
        this.content = content;
        this.pwd = pwd;
        Onair on = Onair.ON;
    }

    public void handlerActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService) {
        Set<WebSocketSession> sessions = new HashSet<>();

        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getMember() + "님이 입장했습니다.");
        }
        sendMessage(chatMessage, chatService);
    }

    private <T> void sendMessage(T message, ChatService chatService) {
        Set<WebSocketSession> sessions = new HashSet<>();
        sessions.parallelStream()
                .forEach(session -> chatService.sendMessage(session, message));
    }

}
