package com.mainproject.server.member.mapper;

import com.mainproject.server.ChatRoom.mapper.ChatRoomMapper;
import com.mainproject.server.member.dto.MemberPatchDto;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.dto.RankResponseDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.playlist.dto.SimplePlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.response.MultiResponseDto;
import org.mapstruct.Mapper;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.redis.core.ZSetOperations;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    List<MemberResponseDto> memberListToMemberResponseDtoList(List<Member> memberList);

    List<SimpleMemberResponseDto> memberListToSimpleMemberResponseDtoList(List<Member> memberList);

    default MemberResponseDto memberToMemberResponseDto(Member member, Boolean followState, ChatRoomMapper chatRoomMapper,
                                                        PlaylistMapper playlistMapper, int playlistPage, Integer rank) {
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
        memberResponseDto.rank( rank );
        memberResponseDto.role(member.getRole());
        memberResponseDto.createdAt(member.getCreatedAt());
        memberResponseDto.modifiedAt(member.getModifiedAt());

        List<Playlist> playlistList = member.getPlaylists()
                .stream()
                .skip(5 * playlistPage)
                .limit(5)
                .collect(Collectors.toList());

        PageImpl page = new PageImpl<>(playlistList);
        MultiResponseDto<SimplePlaylistResponseDto> multiResponseDto =
                new MultiResponseDto<>(playlistMapper.playlistToSimplePlaylistResponseDtoList(playlistList), page);

        memberResponseDto.playlist(multiResponseDto);

        memberResponseDto.followState(followState);

        return memberResponseDto.build();
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
        if (followState == true) {
            memberResponseDto.follow(member.getFollows().size() + 1);
        }
        if (followState == false) {
            memberResponseDto.follow(member.getFollows().size() - 1);
        }

//        memberResponseDto.rank( member.getRanking().getRank() );
        memberResponseDto.role(member.getRole());
        memberResponseDto.createdAt(member.getCreatedAt());
        memberResponseDto.modifiedAt(member.getModifiedAt());

        List<Playlist> playlistList = member.getPlaylists()
                .stream()
                .skip(5 * playlistPage)
                .limit(5)
                .collect(Collectors.toList());

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

        return simpleMemberResponseDto.build();
    }

    default RankResponseDto memberToRankResponseDto(Member member) {
        if (member == null) {
            return null;
        }

        RankResponseDto.RankResponseDtoBuilder rankResponseDto = RankResponseDto.builder();

        rankResponseDto.name(member.getName());
        rankResponseDto.picture(member.getPicture());
        rankResponseDto.rank( member.getRank() );
        rankResponseDto.follow(member.getFollows().size());

        List<Playlist> membersPlaylist = member.getPlaylists();
        int Score = 0;

//        for (Playlist pl : membersPlaylist){
//            int like = pl.getLike();
//            Score += like;
//        }

        rankResponseDto.like(Score);

        return rankResponseDto.build();
    }
    List<RankResponseDto> memberListToRankResponseDtoList(List<Member> memberList);
}
