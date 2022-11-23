package com.mainproject.server.ChatRoom.dto;

import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.response.MultiResponseDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomPostDto {
    private Long memberId;
    private long playlistId;
    private String title;
    private int maxCount;
    private String pwd;
    private boolean secret;
}
