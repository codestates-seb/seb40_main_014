package com.mainproject.server.member.mapper;

import com.mainproject.server.member.dto.MemberPatchDto;
import com.mainproject.server.member.dto.MemberPostDto;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Follow;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.response.MultiResponseDto;
import org.mapstruct.Mapper;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.stream.Collectors;

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

//        원하는 페이지에서 n개씩 추출
//        List<Playlist> plList = member.getplList()
//                .stream()
//                .skip(15*playlistPage())
//                .limit(15)
//                .collect(Collectors.toList());

//        추출한 데이터를 MultiResponse 형태로 MemberResponseDto에 저장
//        PageImpl page = new PageImpl<>(plList);
//        MultiResponseDto<PlaylistResponseDto> multiResponseDto =
//                new MultiResponseDto<>(playlistMapper.playlistToPlayListResponseDtos(plList), page);
//
//        memberResponseDto.plList(multiResponseDto);

        return memberResponseDto.build();
    }
}
