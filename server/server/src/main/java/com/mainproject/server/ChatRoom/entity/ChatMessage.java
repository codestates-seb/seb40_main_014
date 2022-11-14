package com.mainproject.server.ChatRoom.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
    public class ChatMessage {
        public enum MessageType{
            ENTER, TALK
        }

        private MessageType type;
        private String roomId;
        private String member;
        private String message;
    }

