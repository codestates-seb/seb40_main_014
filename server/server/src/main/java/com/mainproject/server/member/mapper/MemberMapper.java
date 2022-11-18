package com.mainproject.server.member.mapper;

import com.mainproject.server.member.dto.MemberPatchDto;
import com.mainproject.server.member.dto.MemberPostDto;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Follow;
import com.mainproject.server.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

//    MemberResponseDto memberToMemberResponseDto(Member member);

    List<MemberResponseDto> memberListToMemberResponseDtoList(List<Member> memberList);

    SimpleMemberResponseDto memberToSimpleMemberResponseDto(Member member);

    default MemberResponseDto memberToMemberResponseDto(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberResponseDto.MemberResponseDtoBuilder memberResponseDto = MemberResponseDto.builder();

        memberResponseDto.memberId( member.getMemberId() );
        memberResponseDto.email( member.getEmail() );
        memberResponseDto.name( member.getName() );
        memberResponseDto.picture( member.getPicture() );
        memberResponseDto.grade( member.getGrade() );
        memberResponseDto.follow( member.getFollows().size() );
//        memberResponseDto.rank( member.getRanking().getRank() );
        memberResponseDto.role( member.getRole() );
        memberResponseDto.createdAt( member.getCreatedAt() );
        memberResponseDto.modifiedAt( member.getModifiedAt() );

        return memberResponseDto.build();
    }
}
