package com.mainproject.server.member.service;

import com.mainproject.server.exception.BusinessException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member findMember = verifyExistsMember(username);

        return findMember;
    }

    private Member verifyExistsMember(String email) {

        Member findMember = memberRepository.findByEmail(email).orElseThrow(() -> {
            throw new BusinessException(ExceptionCode.MEMBER_NOT_EXISTS);
        });

        return findMember;
    }
}
