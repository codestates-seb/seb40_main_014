package com.mainproject.server.member.dto;

import com.mainproject.server.member.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class MemberDto {

    @Getter
    @AllArgsConstructor
    public class ChatRes {
        private Long memberId;
        private String name;
        private String grade;
        private Role role;
    }
    @Getter
    @AllArgsConstructor
    public class Chat {
        private Long memberId;
        //playlistId
    }
}
