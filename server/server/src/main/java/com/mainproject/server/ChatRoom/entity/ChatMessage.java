package com.mainproject.server.ChatRoom.entity;

import com.mainproject.server.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
    public class ChatMessage {
        public enum MessageType{
            ENTER, TALK, LEAVE;
        }

        private MessageType type;
        private String roomId;
        private Member member;
        private String message;
    }

