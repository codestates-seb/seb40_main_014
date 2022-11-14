package com.mainproject.server.ChatRoom.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChatRoomPatchDto {
    //playlist는 MemberResDto에서 memberID, playlistId 뺴올 예정
    private String title;
    private String content;
    private String pwd;
    private boolean secret;
}
