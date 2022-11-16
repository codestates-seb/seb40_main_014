package com.mainproject.server.ChatRoom.dto;

import com.mainproject.server.member.dto.MemberPostDto;
import com.mainproject.server.member.dto.MemberResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class ChatRoomCountDto {
    private Long memberId;
    private String roomId;
    private String title;
    private String content;
    private String pwd;
    private boolean secret;
    private List<MemberResponseDto> memCount;
    private List<MemberResponseDto> memberList;
}
