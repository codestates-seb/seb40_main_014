package com.mainproject.server.ChatRoom.dto;

import com.mainproject.server.member.dto.MemberDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatRoomPostDto {
    private String title;
    private String content;
    private String pwd;
    private boolean secret;
}
