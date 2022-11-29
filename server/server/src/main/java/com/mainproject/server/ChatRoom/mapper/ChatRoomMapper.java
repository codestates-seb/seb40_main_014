package com.mainproject.server.ChatRoom.mapper;

import com.mainproject.server.ChatRoom.dto.*;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.playlist.service.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatRoomMapper {

    private final MemberMapper memberMapper;
    private final PlaylistMapper playlistMapper;
    private final PlaylistService playlistService;

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

    public List<ResponseChatRoomDto> responseChatRoomDtoList(List<ChatRoom> chatRooms, Member member) {

        List<ResponseChatRoomDto> roomDtoList = chatRooms.stream()
                .map(chatRoom -> chatRoomResponseDtoToChatRoom(chatRoom, member))
                .collect(Collectors.toList());


        return roomDtoList;
    }

    public RankResponseChatRoomDto chatRoomRankResponseDtoToChatRoom(ChatRoom chatRoom, List<Member> member) {

        List<SimpleMemberResponseDto> simpleMemberResponseDtoList = memberMapper.memberListToSimpleMemberResponseDtoList(member);

        Playlist playList = playlistService.findPlaylist(chatRoom.getPlaylistId());
        PlaylistResponseDto playlistResponseDto = playlistMapper.playlistToPlaylistResponseDto(playList);

        RankResponseChatRoomDto rankResponseChatRoomDto = RankResponseChatRoomDto.builder()
                .chatRoom(chatRoom)
                .simpleMemberResponseDtoList(simpleMemberResponseDtoList)
                .playlistResponseDto(playlistResponseDto)
                .build();
        return rankResponseChatRoomDto;
    }

    public List<RankResponseChatRoomDto> chatRoomRankDtotoMember(List<ChatRoom> chatRooms, List<Member> member) {

        List<RankResponseChatRoomDto> rankResponseChatRoomDtoList = chatRooms.stream()
                .map(chatRoom -> chatRoomRankResponseDtoToChatRoom( chatRoom, (member)) )
                .collect(Collectors.toList());

        return rankResponseChatRoomDtoList;

    }

}
