package com.mainproject.server.ChatRoom.dto;

import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class MemRoomResponseDto {

    private String roomId;
    private String title;
    private int maxCount;
    private String pwd;
    private boolean secret;
    private int userCount;
    PlaylistResponseDto playlistResponseDto;
    SimpleMemberResponseDto memberResponseDto;
    List<String> userlist = new ArrayList<>();

    @Builder
    public MemRoomResponseDto(ChatRoom chatRoom, SimpleMemberResponseDto memberResponseDto, PlaylistResponseDto playlistResponseDto) {
        this.roomId = chatRoom.getRoomId();
        this.title = chatRoom.getTitle();
        this.maxCount = chatRoom.getMaxCount();
        this.pwd = chatRoom.getPwd();
        this.secret = chatRoom.getPwd() != null;
        this.userCount = chatRoom.getUserCount();
        this.userlist = chatRoom.getUserlist();
        this.memberResponseDto = memberResponseDto;
        this.playlistResponseDto = playlistResponseDto;
    }
}
