package com.mainproject.server.ChatRoom.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomPostDto {
    private String title;
    private String content;
    private String pwd;
    private boolean secret;
}
