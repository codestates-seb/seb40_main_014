package com.mainproject.server.ChatRoom.dto;

import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.entity.ChatRoomDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
        ChatMessage chatMessage;

        @Builder
        public MemRoomResponseDto(ChatRoom chatRoom, ChatMessage chatMessage, SimpleMemberResponseDto memberResponseDto, PlaylistResponseDto playlistResponseDto) {
            this.roomId = chatRoom.getRoomId();
            this.title = chatRoom.getTitle();
            this.maxCount = chatRoom.getMaxCount();
            this.pwd = chatRoom.getPwd();
            this.secret = chatRoom.getPwd() != null;
            this.userCount = chatRoom.getUserCount();
            this.chatMessage = chatMessage;
            this.memberResponseDto = memberResponseDto;
            this.playlistResponseDto = playlistResponseDto;
        }
    }
