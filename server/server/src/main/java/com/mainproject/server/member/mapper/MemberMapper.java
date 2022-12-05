package com.mainproject.server.member.mapper;

import com.mainproject.server.chatroom.mapper.ChatRoomMapper;
import com.mainproject.server.member.dto.*;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.playlist.dto.SimplePlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.response.MultiResponseDto;
import org.mapstruct.Mapper;
import org.springframework.data.domain.PageImpl;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    List<MemberResponseDto> memberListToMemberResponseDtoList(List<Member> memberList);

    List<SimpleMemberResponseDto> memberListToSimpleMemberResponseDtoList(List<Member> memberList);

    default MemberResponseDto memberToMemberResponseDto(Member member, Boolean followState,
                                                        PlaylistMapper playlistMapper) {
        if (member == null) {
            return null;
        }

        MemberResponseDto.MemberResponseDtoBuilder memberResponseDto = MemberResponseDto.builder();

        memberResponseDto.memberId(member.getMemberId());
        memberResponseDto.email(member.getEmail());
        memberResponseDto.name(member.getName());
        memberResponseDto.picture(member.getPicture());
        memberResponseDto.grade(member.getGrade());
        memberResponseDto.follow(member.getFollows().size());
        memberResponseDto.rank( member.getRanking() );
        memberResponseDto.role(member.getRole());
        memberResponseDto.createdAt(member.getCreatedAt());
        memberResponseDto.modifiedAt(member.getModifiedAt());
        memberResponseDto.content(member.getContent());

        List<Playlist> playlistList = member.getPlaylists();
//                .stream()
//                .skip(5 * playlistPage)
//                .limit(5)
//                .collect(Collectors.toList());

        PageImpl page = new PageImpl<>(playlistList);
        MultiResponseDto<SimplePlaylistResponseDto> multiResponseDto =
                new MultiResponseDto<>(playlistMapper.playlistToSimplePlaylistResponseDtoList(playlistList), page);

        memberResponseDto.playlist(multiResponseDto);

        memberResponseDto.followState(followState);

        return memberResponseDto.build();
    }

    default List<MemberResponseDto> memberListToMemberResponseDtoList(List<Member> memberList, List<Boolean> followStates,
                                                                      PlaylistMapper playlistMapper) {
        if ( memberList == null ) {
            return null;
        }

        List<MemberResponseDto> list = new ArrayList<MemberResponseDto>( memberList.size() );
        for ( int i=0; i<memberList.size(); i++ ) {
            list.add( memberToMemberResponseDto( memberList.get(i), followStates.get(i), playlistMapper) );
        }

        return list;
    }

    /**
     * Follow API 요청때만 사용
     **/
    default MemberResponseDto memberToFollowMemberResponseDto(Member member, Boolean followState, ChatRoomMapper chatRoomMapper,
                                                              PlaylistMapper playlistMapper, int playlistPage) {
        if (member == null) {
            return null;
        }

        MemberResponseDto.MemberResponseDtoBuilder memberResponseDto = MemberResponseDto.builder();

        memberResponseDto.memberId(member.getMemberId());
        memberResponseDto.email(member.getEmail());
        memberResponseDto.name(member.getName());
        memberResponseDto.picture(member.getPicture());
        memberResponseDto.grade(member.getGrade());
        memberResponseDto.content(member.getContent());
        if (followState == true) {
            memberResponseDto.follow(member.getFollows().size() + 1);
        }
        if (followState == false) {
            memberResponseDto.follow(member.getFollows().size() - 1);
        }
        memberResponseDto.role(member.getRole());
        memberResponseDto.createdAt(member.getCreatedAt());
        memberResponseDto.modifiedAt(member.getModifiedAt());

        List<Playlist> playlistList = member.getPlaylists();

        PageImpl page = new PageImpl<>(playlistList);
        MultiResponseDto<SimplePlaylistResponseDto> multiResponseDto =
                new MultiResponseDto<>(playlistMapper.playlistToSimplePlaylistResponseDtoList(playlistList), page);

        memberResponseDto.playlist(multiResponseDto);

        memberResponseDto.followState(followState);

        return memberResponseDto.build();
    }

    default SimpleMemberResponseDto memberToSimpleMemberResponseDto(Member member) {
        if (member == null) {
            return null;
        }

        SimpleMemberResponseDto.SimpleMemberResponseDtoBuilder simpleMemberResponseDto = SimpleMemberResponseDto.builder();

        simpleMemberResponseDto.memberId(member.getMemberId());
        simpleMemberResponseDto.email(member.getEmail());
        simpleMemberResponseDto.name(member.getName());
        simpleMemberResponseDto.picture(member.getPicture());
        simpleMemberResponseDto.grade(member.getGrade());
        simpleMemberResponseDto.follow(member.getFollows().size());
        simpleMemberResponseDto.role(member.getRole());
        simpleMemberResponseDto.createdAt(member.getCreatedAt());
        simpleMemberResponseDto.modifiedAt(member.getModifiedAt());
        simpleMemberResponseDto.content(member.getContent());

        return simpleMemberResponseDto.build();
    }

    default RankResponseDto memberToRankResponseDto(Member member) {
        if (member == null) {
            return null;
        }

        RankResponseDto.RankResponseDtoBuilder rankResponseDto = RankResponseDto.builder();

        rankResponseDto.memberId(member.getMemberId());
        rankResponseDto.name(member.getName());
        rankResponseDto.picture(member.getPicture());
        rankResponseDto.rank( member.getRanking() );
        rankResponseDto.follow(member.getFollows().size());
        rankResponseDto.content(member.getContent());

        List<Playlist> membersPlaylist = member.getPlaylists();
        int Score = 0;

        for (Playlist pl : membersPlaylist){
            int like = pl.getLikes().size();
            Score += like;
        }

        rankResponseDto.like(Score);
        rankResponseDto.score(Score+member.getFollows().size());

        return rankResponseDto.build();
    }
    List<RankResponseDto> memberListToRankResponseDtoList(List<Member> memberList);

    default RankChatRoomSimpleDto memberToRankChatRoomSimpleDto(Member member) {
        if (member == null) {
            return null;
        }

        RankChatRoomSimpleDto.RankChatRoomSimpleDtoBuilder rankChatRoomSimpleDto = RankChatRoomSimpleDto.builder();

        rankChatRoomSimpleDto.memberId(member.getMemberId());
        rankChatRoomSimpleDto.email(member.getEmail());
        rankChatRoomSimpleDto.name(member.getName());
        rankChatRoomSimpleDto.picture(member.getPicture());
        rankChatRoomSimpleDto.grade(member.getGrade());
        rankChatRoomSimpleDto.follow(member.getFollows().size());
        rankChatRoomSimpleDto.role(member.getRole());
        rankChatRoomSimpleDto.createdAt(member.getCreatedAt());
        rankChatRoomSimpleDto.modifiedAt(member.getModifiedAt());
        rankChatRoomSimpleDto.content(member.getContent());

        return rankChatRoomSimpleDto.build();
    }
}
