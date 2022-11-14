package com.mainproject.server.member.dto;

import com.mainproject.server.member.entity.Role;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MemberChatResDto {
    private Long memberId;
    private String name;
    private String grade;
    private Role role;
}
