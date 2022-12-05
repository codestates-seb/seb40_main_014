package com.mainproject.server.member.service;

import com.mainproject.server.auth.utils.CustomAuthorityUtil;
import com.mainproject.server.exception.BusinessException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.jwt.JwtTokenizer;
import com.mainproject.server.member.jwt.RefreshToken;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.member.repository.TokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtil customAuthorityUtil;
    private final TokenRepository tokenRepository;

    public void savedToken(String token) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setRefreshToken(token);
        tokenRepository.save(refreshToken);
    }

    public Member updateMember(Member member, Long memberId) {

        Member findMember = verifyExistsMember(memberId);

        // 기존닉네임과 Patch요청의 닉네임이 다른경우
        if (!member.getName().equals(findMember.getName())){
            // 요청 닉네임이 존재하는지 조회
            if(memberRepository.existsByName(member.getName())){
                //존재한다면 에러 발생
                throw new BusinessException(ExceptionCode.NAME_ALREADY_EXISTS);
            }
        }

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));
        Optional.ofNullable(member.getContent())
                .ifPresent(content -> findMember.setContent(content));
        Optional.ofNullable(member.getModifiedAt())
                .ifPresent(modifiedAt -> findMember.setModifiedAt(modifiedAt));

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

    public Page<Member> searchMembers(String name, int page, int size){

        List<Member> searchMembers = memberRepository.findByNameContaining(name);

        Pageable pageRequest = PageRequest.of(page, size, Sort.by("ranking"));
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchMembers.size());

        Page<Member> memberPage = new PageImpl<>(searchMembers.subList(start, end), pageRequest, searchMembers.size());
        return memberPage;
    }

    public void logoutMember(HttpServletRequest request){

        String refreshToken = request.getHeader("RefreshToken").substring(6);
        RefreshToken token = tokenRepository.findByRefreshToken(refreshToken).get();

        tokenRepository.deleteById(token.getTokenId());
    }

    public ResponseEntity refresh(HttpServletRequest request, HttpServletResponse response) {

        String refreshToken = request.getHeader("RefreshToken").substring(6);

        Boolean validateRefreshToken = jwtTokenizer.validateToken(refreshToken);
        Boolean isRefreshToken = jwtTokenizer.existsRefreshToken(refreshToken);

        if (validateRefreshToken && isRefreshToken){
            String email = jwtTokenizer.getUserEmail(refreshToken);
            String role = memberRepository.findByEmail(email).get().toString();
            List<GrantedAuthority> authorities = customAuthorityUtil.stringToGrantedAuthority(role);

            String newAccessToken = jwtTokenizer.createNewToken(email, authorities);

            response.setHeader("Authorization", "bearer"+newAccessToken);
            return new ResponseEntity<>("Refresh OK", HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>("Refresh Failed", HttpStatus.NOT_FOUND);
        }
    }

    private Member verifyExistsMember(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(
                () -> {throw new BusinessException(ExceptionCode.MEMBER_NOT_EXISTS);
                });
    }

    public Page<Member> findRoomsRank(int page, int size) {
        List<Member> findAllMember = memberRepository.findAllByOrderByRankingAsc();
        List<Member> members = new ArrayList<>();
        for (Member member : findAllMember) {
            if (member.getRanking() != 0) {
                if (member.getChatRooms().size() != 0){
                    members.add(member);
                }
            }
        }

        Pageable pageRequest = PageRequest.of(page, size);
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), members.size());

        Page<Member> memberPage = new PageImpl<>(members.subList(start, end), pageRequest, members.size());
        return memberPage;
    }

    public Page<Member> findPlTopDjList(int page, int size) {
        List<Member> findAllMember = memberRepository.findAllByOrderByRankingAsc();
        List<Member> members = new ArrayList<>();
        for (Member member : findAllMember) {
            if (member.getRanking() != 0) {
                if (member.getPlaylists().size() != 0){
                    members.add(member);
                }
            }
        }

        Pageable pageRequest = PageRequest.of(page, size);
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), members.size());

        Page<Member> memberPage = new PageImpl<>(members.subList(start, end), pageRequest, members.size());
        return memberPage;
    }

    private void verifyNotExistsMember(String email, String name) {

        if (memberRepository.existsByName(name)){
            throw new BusinessException(ExceptionCode.NAME_ALREADY_EXISTS);
        }
        if (memberRepository.existsByEmail(email)){
            throw new BusinessException(ExceptionCode.EMAIL_ALREADY_EXISTS);
        }

    }

}
