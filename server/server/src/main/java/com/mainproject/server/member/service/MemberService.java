package com.mainproject.server.member.service;

import com.mainproject.server.exception.BusinessException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.member.dto.MemberPatchDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public Member updateMember(Member member, Long memberId) {

        Member findMember = verifyExistsMember(memberId);

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getModifiedAt())
                .ifPresent(modifiedAt -> findMember.setModifiedAt(modifiedAt));

        Member updateMember = memberRepository.save(findMember);

        return updateMember;
    }

    public Member followMember(Long memberId) {
        Member findMember = verifyExistsMember(memberId);

        Member updateMember = memberRepository.save(findMember);

        return updateMember;
    }

    public Member findMember(Long memberId) {

        Member findMember = verifyExistsMember(memberId);
        memberRepository.save(findMember);

        return findMember;

    }

    public Page<Member> findMembers(int page, int size) {

        Page<Member> findMembers =
                memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));

        return findMembers;
    }


    private Member verifyExistsMember(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(
                () -> {throw new BusinessException(ExceptionCode.MEMBER_NOT_EXISTS);
                });
    }
}
