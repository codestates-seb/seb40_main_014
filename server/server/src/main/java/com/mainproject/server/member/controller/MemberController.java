package com.mainproject.server.member.controller;

import com.mainproject.server.member.dto.MemberFollowDto;
import com.mainproject.server.member.dto.MemberPatchDto;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.response.MultiResponseDto;
import com.mainproject.server.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Validated
@RequiredArgsConstructor
@Controller
@RequestMapping("/api/members")
public class MemberController {

    private final MemberMapper mapper;
    private final MemberService service;

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId,
                                      @Valid @RequestBody MemberPatchDto memberPatchDto) {

        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        Member updateMember = service.updateMember(member, memberId);

        MemberResponseDto response = mapper.memberToMemberResponseDto(updateMember);
        SingleResponseDto<MemberResponseDto> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") Long memberId) {

        Member findMember = service.findMember(memberId);

        MemberResponseDto response = mapper.memberToMemberResponseDto(findMember);
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

        MemberResponseDto response = mapper.memberToMemberResponseDto(followMember);
        SingleResponseDto<MemberResponseDto> singleResponseDto = new SingleResponseDto<>(response);

        return new ResponseEntity<>(singleResponseDto, HttpStatus.OK);
    }

}
