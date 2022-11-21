package com.mainproject.server.member.controller;

import com.mainproject.server.ChatRoom.mapper.ChatRoomMapper;
import com.mainproject.server.member.dto.MemberFollowDto;
import com.mainproject.server.member.dto.MemberPatchDto;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.response.MultiResponseDto;
import com.mainproject.server.response.SingleResponseDto;
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

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId,
                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {

        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        Member updateMember = service.updateMember(member, memberId);

        MemberResponseDto response = mapper.memberToMemberResponseDto(updateMember, chatRoomMapper, playlistMapper, 0);
        SingleResponseDto<MemberResponseDto> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") Long memberId,
                                    @Positive @RequestParam(defaultValue = "1") int playlistPage) {

        Member findMember = service.findMember(memberId);

        MemberResponseDto response = mapper.memberToMemberResponseDto(findMember, chatRoomMapper, playlistMapper, playlistPage-1);
        SingleResponseDto<MemberResponseDto> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity(singleResponseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam(defaultValue = "1") int page,
                                     @Positive @RequestParam(defaultValue = "1") int size) {

        Page<Member> pageMembers = service.findMembers(page-1, size);
        List<Member> members = pageMembers.getContent();

        MultiResponseDto<MemberResponseDto> multiResponseDto =
                new MultiResponseDto<>(mapper.memberListToMemberResponseDtoList(members), pageMembers);

        return new ResponseEntity(multiResponseDto, HttpStatus.OK);

    }

    @PatchMapping("/follow/{member-id}")
    public ResponseEntity followMember(@PathVariable("member-id") Long memberId,
                                       @Valid @RequestBody MemberFollowDto memberFollowDto) {

        Member followMember = service.followMember(memberId);

        MemberResponseDto response = mapper.memberToMemberResponseDto(followMember, chatRoomMapper, playlistMapper, 0);
        SingleResponseDto<MemberResponseDto> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
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
}
