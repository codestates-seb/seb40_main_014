package com.mainproject.server.member.controller;

import com.mainproject.server.chatroom.mapper.ChatRoomMapper;
import com.mainproject.server.member.dto.*;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.service.FollowService;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.service.RankingScheduler;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.response.MultiResponseDto;
import com.mainproject.server.response.SingleResponseDto;
import com.mainproject.server.tx.NeedMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService service;
    private final ChatRoomMapper chatRoomMapper;
    private final PlaylistMapper playlistMapper;
    private final FollowService followService;
    private final RankingScheduler rankingScheduler;

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId,
                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {

        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        Member updateMember = service.updateMember(member, memberId);

        SimpleMemberResponseDto response = mapper.memberToSimpleMemberResponseDto(updateMember);
        SingleResponseDto<SimpleMemberResponseDto> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @NeedMemberId
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") Long memberId, Long authMemberId,
                                    @Positive @RequestParam(defaultValue = "1") int playlistPage) {

        Member findMember = service.findMember(memberId);

        Boolean followState = followService.followState(memberId, authMemberId);
//        Integer rank = followService.findRank(findMember);

        MemberResponseDto response = mapper.memberToMemberResponseDto(findMember, followState, playlistMapper);
        SingleResponseDto<MemberResponseDto> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity(singleResponseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam(defaultValue = "1") int page,
                                     @Positive @RequestParam(defaultValue = "15") int size) {

        Page<Member> pageMembers = service.findMembers(page-1, size);
        List<Member> members = pageMembers.getContent();

        MultiResponseDto<MemberResponseDto> multiResponseDto =
                new MultiResponseDto<>(mapper.memberListToMemberResponseDtoList(members), pageMembers);

        return new ResponseEntity(multiResponseDto, HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity searchMembers(@Positive @RequestParam(defaultValue = "1") int page,
                                        @Positive @RequestParam(defaultValue = "6") int size,
                                        @RequestParam String name) {

        Page<Member> pageMembers = service.searchMembers(name, page-1, size);
        List<Member> members = pageMembers.getContent();

        MultiResponseDto<MemberResponseDto> multiResponseDto =
                new MultiResponseDto<>(mapper.memberListToMemberResponseDtoList(members), pageMembers);

        return new ResponseEntity(multiResponseDto, HttpStatus.OK);

    }

    @NeedMemberId
    @PostMapping("/follow/{member-id}") // member-id = 팔로우 대상
    public ResponseEntity followMember(@PathVariable("member-id") Long memberId, Long authMemberId,
                                       @Positive @RequestParam(defaultValue = "1") int playlistPage) {
        followService.followMember(memberId, authMemberId);
        followService.getGrade(service.findMember(memberId));
        // 이 아래는 get과 동일
        Member findMember = service.findMember(memberId);

        Boolean followState = followService.followState(memberId, authMemberId);

        // Follow했을때, follow count가 반대로 되는 현상이 있어서 memberToFollowMemberResponseDto 추가로 만듦
        MemberResponseDto response = mapper.memberToFollowMemberResponseDto(findMember, followState, chatRoomMapper, playlistMapper, playlistPage-1);
        SingleResponseDto<MemberResponseDto> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity(singleResponseDto, HttpStatus.OK);

    }

    @PostMapping("/logout")
    public ResponseEntity logout(HttpServletRequest request) {
        service.logoutMember(request);

        return new ResponseEntity<>("Logout", HttpStatus.NO_CONTENT);
    }

    @PostMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        return service.refresh(request, response);
    }

    @GetMapping("/ranking/now")
    public ResponseEntity rankingNow() {
        Page<Member> rankPage = followService.getRankings();

        List<Member> members = rankPage.getContent();

        MultiResponseDto<RankResponseDto> multiResponseDto =
                new MultiResponseDto<>(mapper.memberListToRankResponseDtoList(members), rankPage);

        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }

    @GetMapping("/ranking")
    public ResponseEntity ranking() {
        Page<Member> rankPage = followService.getRankingScheduler();

        List<Member> members = rankPage.getContent();

        MultiResponseDto<RankResponseDto> multiResponseDto =
                new MultiResponseDto<>(rankingScheduler.memberListToRankResponseDtoList(members), rankPage);

        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }
    @GetMapping("/following/{member-id}")
    public ResponseEntity followingMembers(@PathVariable("member-id") Long memberId, Long authMemberId) {

        Page<Member> followingMembers = followService.followingMembers(memberId);

        List<Member> members = followingMembers.getContent();
        List<Boolean> followStates = followService.followStates(memberId, authMemberId);

        MultiResponseDto<MemberResponseDto> multiResponseDto =
                new MultiResponseDto<>(mapper.memberListToMemberResponseDtoList(members, followStates, playlistMapper), followingMembers);

        return new ResponseEntity(multiResponseDto, HttpStatus.OK);
    }
}