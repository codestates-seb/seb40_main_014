package com.mainproject.server.ChatRoom.dto;

import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ResponseChatRoomDto {
    private String roomId;
    private String title;
    private String content;
    private String pwd;
    private boolean secret;
    private int roomMemberlist;

    SimpleMemberResponseDto memberResponseDto;
    List<PlaylistResponseDto> playlistResponseDtoList;

    @Builder
    public ResponseChatRoomDto(ChatRoom chatRoom, SimpleMemberResponseDto memberResponseDto, List<PlaylistResponseDto> playlistResponseDtoList) {
        this.roomId = chatRoom.getRoomId();
        this.title = chatRoom.getTitle();
        this.content = chatRoom.getContent();
        this.pwd = chatRoom.getPwd();
        this.secret = chatRoom.getPwd() != null;
        this.roomMemberlist = chatRoom.getRoomMemberList().size();
        this.memberResponseDto = memberResponseDto;
        this.playlistResponseDtoList = playlistResponseDtoList;
    }
}
