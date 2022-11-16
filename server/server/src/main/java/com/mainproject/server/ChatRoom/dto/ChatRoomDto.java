package com.mainproject.server.ChatRoom.dto;

import com.mainproject.server.member.entity.Member;
import lombok.*;

public class ChatRoomDto {

    @Getter
    @AllArgsConstructor
    public static class Post {

        private String title;
        private String content;
        private String pwd;
        private boolean secret;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
        //playlist는 MemberResDto에서 memberID, playlistId 뺴올 예정
        private String roomId;
        private String title;
        private String content;
        private String pwd;
        private boolean secret;
    }

    @Getter @Setter
    @AllArgsConstructor
    public static class Count {
        private Long memberId;
        private String roomId;
        private String title;
        private String content;
        private String pwd;
        private boolean secret;
        private int memCount;
    }
}
