package com.mainproject.server.ChatRoom.entity;

import com.mainproject.server.member.entity.Member;
import lombok.*;

import javax.persistence.*;

@Getter @Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
    public class ChatMessage {
        public enum MessageType{
            ENTER, TALK, LEAVE;
        }

        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Id
        private Long chatMessageId;

        private MessageType type;
        private String roomId;

        @ManyToOne
        @JoinColumn(name = "member_id")
        private Member member;

        private String memberId;
//        private String channelId;

        private String message;

        public void newConnect() {
            this.type = MessageType.ENTER;
        }

        public void closeConnect() {
            this.type = MessageType.LEAVE;
        }
    }

