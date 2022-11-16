package com.mainproject.server.ChatRoom.entity;

import com.mainproject.server.ChatRoom.service.ChatService;
import com.mainproject.server.auditable.Auditable;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.playlist.entity.Playlist;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.web.socket.WebSocketSession;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter @Setter
@AllArgsConstructor
@Entity
@NoArgsConstructor
public class ChatRoom extends Auditable {

    @OneToMany(mappedBy = "chatRoom")
    private List<Playlist> playlistList = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

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
    private Long memberId;
    private Long playlistId;

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
            chatMessage.setMessage(chatMessage.getMemberId() + "님이 입장했습니다.");
        }
        sendMessage(chatMessage, chatService);
    }

    private <T> void sendMessage(T message, ChatService chatService) {
        Set<WebSocketSession> sessions = new HashSet<>();
        sessions.parallelStream()
                .forEach(session -> chatService.sendMessage(session, message));
    }

}
