package com.mainproject.server.auth.dto;

import com.mainproject.server.member.entity.Member;
import lombok.Getter;

@Getter
public class SessionMember {
    private String name;
    private String email;
    private String picture;

    public SessionMember(Member member){
        this.name = member.getName();
        this.email = member.getEmail();
        this.picture = member.getPicture();
    }
}
