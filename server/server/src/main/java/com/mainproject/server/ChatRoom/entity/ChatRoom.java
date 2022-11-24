package com.mainproject.server.ChatRoom.entity;

import com.mainproject.server.ChatRoom.service.ChatService;
import com.mainproject.server.auditable.Auditable;
import com.mainproject.server.roomMember.entity.roomMember;
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

    // chatroom_member

    // idx(pk), roomId, memberId

    // 1    1       2
    //  1   1       3

    @OneToMany(mappedBy = "chatRoom")
    private List<roomMember> roomMemberList = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private List<ChatMessage> chatMessage = new ArrayList<>();

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String roomId;
    @Column
    private String title;
    @Column
    private int maxCount;

    @Column
    private Onair onair = Onair.ON;

    @Column
    private boolean secret;
    @Column
    private String pwd;
//    private Long memberId;
    private Long playlistId;

    public enum Onair {
        ON, OFF;

        @Getter
        private String onair;
    }


    @Builder
    public ChatRoom(String roomId, String title, int maxCount, String pwd) {
        this.roomId = roomId;
        this.title = title;
        this.maxCount = maxCount;
        this.pwd = pwd;
        Onair on = Onair.ON;
    }

    public void handlerActions(WebSocketSession session, ChatMessage chatMessage, ChatService chatService) {
        Set<WebSocketSession> sessions = new HashSet<>();
//        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
//            sessions.add(session);
//            chatMessage.setMessage("님이 입장했습니다.");
//        }
//        sendMessage(chatMessage, chatService);
        if (chatMessage.getType().equals(ChatMessage.MessageType.ENTER)) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getMember() + "입장");
            sendMessage(chatMessage, chatService);
        } else if (chatMessage.getType().equals(ChatMessage.MessageType.TALK)) {
            chatMessage.setMessage(chatMessage.getMessage());
            sendMessage(chatMessage, chatService);
        }
    }

    public <T> void sendMessage(T message, ChatService chatService) {
        Set<WebSocketSession> sessions = new HashSet<>();
        sessions.parallelStream().forEach(session -> chatService.sendMessage(session, message));
    }

}
