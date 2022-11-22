package com.mainproject.server.member.service;

import com.mainproject.server.exception.BusinessException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.member.entity.Follow;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.repository.FollowRepository;
import com.mainproject.server.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class FollowService {
    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public ResponseEntity followMember(Long memberId, Long authMemberId) {

        Member member = verifyExistsMember(memberId);

        Long followCount = followRepository.findByMember(member)// 인플루언서를 follow한 목록 Follow entity
                .stream()
                .filter(f -> f.getFollowerId().equals(authMemberId)) // 그안에 내가 있는 경우
                .count(); // 0, 1

        if (followCount == 1){
            Follow followMember = followRepository.findByMember(member)
                    .stream()
                    .filter(f -> f.getFollowerId().equals(authMemberId))
                    .findAny().get();

            followRepository.delete(followMember);
            return new ResponseEntity<>("Unfollow", HttpStatus.OK);
        }
        else {
            Follow followMember = new Follow();
            followMember.setFollowerId(authMemberId);
            followMember.setMember(member);

            followRepository.save(followMember);
            return new ResponseEntity<>("Follow", HttpStatus.CREATED);
        }

    }

    public Boolean followState(Long memberId, Long authMemberId){
        Member member = verifyExistsMember(memberId);

        Long followCount = followRepository.findByMember(member)
                .stream()
                .filter(f -> f.getFollowerId().equals(authMemberId))
                .count(); // 0, 1, []
        if (followCount == 1) { return true; }
        return false; // [], 0
    }

    private Member verifyExistsMember(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(
                () -> {throw new BusinessException(ExceptionCode.MEMBER_NOT_EXISTS);
                });
    }
}
