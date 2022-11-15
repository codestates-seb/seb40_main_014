package com.mainproject.server.member.dto;

import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.entity.Role;
import com.mainproject.server.playlist.entity.playlistDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class MemberDto {

    @Getter @Setter
    @AllArgsConstructor
    public static class ChatRes {
        private Member member;
        private String name;
        private String grade;
        private Role role = Role.ADMIN;
    }

    @Getter @Setter
    @AllArgsConstructor
    public static class Chat {
        private Long memberId;
        private Long playlistId;
    }

}
