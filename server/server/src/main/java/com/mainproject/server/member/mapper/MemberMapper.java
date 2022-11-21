package com.mainproject.server.member.mapper;

import com.mainproject.server.ChatRoom.mapper.ChatRoomMapper;
import com.mainproject.server.member.dto.MemberPatchDto;
import com.mainproject.server.member.dto.MemberPostDto;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Follow;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.playlist.dto.SimplePlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
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
    List<SimpleMemberResponseDto> memberListToSimpleMemberResponseDtoList(List<Member> memberList);
    SimpleMemberResponseDto memberToSimpleMemberResponseDto(Member member);

    default MemberResponseDto memberToMemberResponseDto(Member member, ChatRoomMapper chatRoomMapper,
                                                        PlaylistMapper playlistMapper, int playlistPage) {
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

        List<Playlist> playlistList = member.getPlaylists()
                .stream()
                .skip(5*playlistPage)
                .limit(5)
                .collect(Collectors.toList());

        PageImpl page = new PageImpl<>(playlistList);
        MultiResponseDto<SimplePlaylistResponseDto> multiResponseDto =
                new MultiResponseDto<>(playlistMapper.playlistToSimplePlaylistResponseDtoList(playlistList), page);

        memberResponseDto.playlist(multiResponseDto);

        return memberResponseDto.build();
    }
}