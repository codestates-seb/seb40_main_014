package com.mainproject.server.chatroom.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChatRoomPatchDto {
    private String roomId;
    private String title;
    private String pwd;
    private boolean secret;
}
