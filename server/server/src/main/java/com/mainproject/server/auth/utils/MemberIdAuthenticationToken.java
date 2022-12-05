package com.mainproject.server.auth.utils;

import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
public class MemberIdAuthenticationToken extends UsernamePasswordAuthenticationToken {

    private Long memberId;

    public MemberIdAuthenticationToken(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, Long memberId){
        super(principal, credentials, authorities);
        this.memberId = memberId;
    }
}
