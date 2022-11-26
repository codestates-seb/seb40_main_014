package com.mainproject.server.ChatRoom.dto;

import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import lombok.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SimpleMemChatResponseDto {
    private String roomId;
    private String title;
    private int maxCount;
    private String pwd;
    private boolean secret;
    private int userCount;
    List<String> userlist = new ArrayList<>();
    SimpleMemberResponseDto memberResponseDto;
    List<PlaylistResponseDto> playlistResponseDtoList;

    @Builder
    public SimpleMemChatResponseDto(ChatRoom chatRoom, SimpleMemberResponseDto memberResponseDto, List<PlaylistResponseDto> playlistResponseDtoList) {
        this.roomId = chatRoom.getRoomId();
        this.title = chatRoom.getTitle();
        this.maxCount = chatRoom.getMaxCount();
        this.pwd = chatRoom.getPwd();
        this.secret = chatRoom.getPwd() != null;
        this.userCount = chatRoom.getUserCount();
        this.userlist = chatRoom.getUserlist();
        this.memberResponseDto = memberResponseDto;
        this.playlistResponseDtoList = playlistResponseDtoList;
    }
}
