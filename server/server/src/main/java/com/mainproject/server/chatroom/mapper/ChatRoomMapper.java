package com.mainproject.server.chatroom.mapper;

import com.mainproject.server.chatroom.dto.ChatRoomPatchDto;
import com.mainproject.server.chatroom.dto.ChatRoomPostDto;
import com.mainproject.server.chatroom.dto.RankResponseChatRoomDto;
import com.mainproject.server.chatroom.dto.ResponseChatRoomDto;
import com.mainproject.server.chatroom.entity.ChatRoom;
import com.mainproject.server.member.dto.RankChatRoomSimpleDto;
import com.mainproject.server.member.dto.RankResponseDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.playlist.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatRoomMapper {

    private final MemberMapper memberMapper;
    private final PlaylistMapper playlistMapper;
    private final PlaylistService playlistService;
    private final MemberService memberService;


    public ChatRoom chatRoomPostDtoToChatRoom(ChatRoomPostDto chatRoomPostDto, Member member) {
        if (chatRoomPostDto == null) return null;
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setTitle(chatRoomPostDto.getTitle());
        chatRoom.setMaxCount(chatRoomPostDto.getMaxCount());
        chatRoom.setPwd(chatRoomPostDto.getPwd());
        chatRoom.setMember(member);
        return chatRoom;
    }

    public ChatRoom chatRoomPatchDtoToChatRoom(ChatRoomPatchDto chatRoomPatchDto, Member member) {
        if (chatRoomPatchDto == null) return null;
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setTitle(chatRoomPatchDto.getTitle());
        chatRoom.setPwd(chatRoomPatchDto.getPwd());
        chatRoom.setMember(member);
        chatRoom.setRoomId(chatRoomPatchDto.getRoomId());
        return chatRoom;
    }

    public ResponseChatRoomDto chatRoomMemberNameResponseDtoToChatRoom(ChatRoom chatRoom, Member member, Playlist playlist) {

        PlaylistResponseDto playlistResponseDto = playlistMapper.playlistToPlaylistResponseDto(playlist);

        SimpleMemberResponseDto memberResponseDto = memberMapper.memberToSimpleMemberResponseDto(chatRoom.getMember());

        ResponseChatRoomDto responseChatRoomDto = ResponseChatRoomDto.builder()
                .chatRoom(chatRoom)
                .memberResponseDto(memberResponseDto)
                .playlistResponseDto(playlistResponseDto)
                .build();
        return responseChatRoomDto;
    }

    public ResponseChatRoomDto chatRoomResponseDtoToChatRoom(ChatRoom chatRoom, Member member) {

        SimpleMemberResponseDto memberResponseDto = memberMapper.memberToSimpleMemberResponseDto(chatRoom.getMember());

//        List<PlaylistResponseDto> playlistResponseDtos = chatRoom.getMember().getPlaylists().stream()
//                .map(playlistMapper::playlistToPlaylistResponseDto)
//                .collect(Collectors.toList());
        Playlist playList = playlistService.findPlaylist(chatRoom.getPlaylistId());
        PlaylistResponseDto playlistResponseDto = playlistMapper.playlistToPlaylistResponseDto(playList);

        ResponseChatRoomDto responseChatRoomDto = ResponseChatRoomDto.builder()
                .chatRoom(chatRoom)
                .memberResponseDto(memberResponseDto)
                .playlistResponseDto(playlistResponseDto)
                .build();
        return responseChatRoomDto;
    }

    public List<ResponseChatRoomDto> responseChatRoomDtoList(List<ChatRoom> chatRooms, Member member) {

        List<ResponseChatRoomDto> roomDtoList = chatRooms.stream()
                .map(chatRoom -> chatRoomResponseDtoToChatRoom(chatRoom, member))
                .collect(Collectors.toList());

        return roomDtoList;
    }

    public RankResponseChatRoomDto chatRoomRankResponseDtoToChatRoom(ChatRoom chatRoom) {

        Playlist playList = playlistService.findPlaylist(chatRoom.getPlaylistId());
        PlaylistResponseDto playlistResponseDto = playlistMapper.playlistToPlaylistResponseDto(playList);

        Member serviceMember = memberService.findMember(playlistResponseDto.getMemberId());
        List<RankResponseDto> rankResponseDtoList = memberMapper.memberListToRankResponseDtoList(Collections.singletonList(serviceMember));
        RankChatRoomSimpleDto rankChatRoomSimpleDto = memberMapper.memberToRankChatRoomSimpleDto(serviceMember);

        RankResponseChatRoomDto rankResponseChatRoomDto = RankResponseChatRoomDto.builder()
                .chatRoom(chatRoom)
                .rankResponseDtoList(rankResponseDtoList)
                .rankChatRoomSimpleDto(rankChatRoomSimpleDto)
                .playlistResponseDto(playlistResponseDto)
                .build();
        return rankResponseChatRoomDto;

    }

    public List<RankResponseChatRoomDto> chatRoomRankDtotoMember(List<Member> member) {
        // member는 이미 정렬된 멤버
        List<ChatRoom> chatRoomList = new ArrayList<>();

        for (Member member1 : member) {
            // 멤버가 가지고 있는 룸을 전부 리스트에 추가
//            if (member1.getRanking() != 0) {
                if (member1.getChatRooms().size() != 0) {
                    chatRoomList.add(member1.getChatRooms().get(0));
                }
//            }
        }

        // 정렬된 ChatRoom 리스트로 한건씩 Dto 생성
        List<RankResponseChatRoomDto> rankResponseChatRoomDtoList = chatRoomList.stream()
                .map(chatRoom -> chatRoomRankResponseDtoToChatRoom(chatRoom))
                .collect(Collectors.toList());

        return rankResponseChatRoomDtoList;
    }
}