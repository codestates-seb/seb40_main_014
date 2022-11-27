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
public class ResponseChatRoomDto {
    private String roomId;
    private String title;
    private int maxCount;
    private String pwd;
    private boolean secret;
    private int userCount;
    private Long playlistId;
    SimpleMemberResponseDto memberResponseDto;

    PlaylistResponseDto playlistResponseDto;
    List<String> userlist = new ArrayList<>();

    @Builder
    public ResponseChatRoomDto(ChatRoom chatRoom, SimpleMemberResponseDto memberResponseDto, PlaylistResponseDto playlistResponseDto) {
        this.roomId = chatRoom.getRoomId();
        this.title = chatRoom.getTitle();
        this.maxCount = chatRoom.getMaxCount();
        this.pwd = chatRoom.getPwd();
        this.secret = chatRoom.getPwd() != null;
        this.userCount = chatRoom.getUserCount();
        this.userlist = chatRoom.getUserlist();
        this.playlistId = chatRoom.getPlaylistId();
        this.memberResponseDto = memberResponseDto;
        this.playlistResponseDto = playlistResponseDto;
    }
}
