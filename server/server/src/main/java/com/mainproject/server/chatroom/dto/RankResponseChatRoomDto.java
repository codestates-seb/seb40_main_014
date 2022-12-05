package com.mainproject.server.chatroom.dto;

import com.mainproject.server.chatroom.entity.ChatRoom;
import com.mainproject.server.member.dto.RankChatRoomSimpleDto;
import com.mainproject.server.member.dto.RankResponseDto;
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
public class RankResponseChatRoomDto {

    private String roomId;
    private String title;
    private int maxCount;
    private String pwd;
    private boolean secret;
    private int userSize;
    private Long playlistId;
    List<RankResponseDto> rankResponseDtoList = new ArrayList<>();
    RankChatRoomSimpleDto rankChatRoomSimpleDto;
    PlaylistResponseDto playlistResponseDto;
    List<String> userlist = new ArrayList<>();

    @Builder
    public RankResponseChatRoomDto(ChatRoom chatRoom, List<RankResponseDto> rankResponseDtoList, RankChatRoomSimpleDto rankChatRoomSimpleDto, PlaylistResponseDto playlistResponseDto) {
        this.roomId = chatRoom.getRoomId();
        this.title = chatRoom.getTitle();
        this.maxCount = chatRoom.getMaxCount();
        this.pwd = chatRoom.getPwd();
        this.secret = chatRoom.getPwd() != null;
        this.userlist = chatRoom.getUserlist();
        this.userSize = chatRoom.getUserSize();
        this.playlistId = chatRoom.getPlaylistId();
        this.rankResponseDtoList = rankResponseDtoList;
        this.rankChatRoomSimpleDto = rankChatRoomSimpleDto;
        this.playlistResponseDto = playlistResponseDto;
    }
}

