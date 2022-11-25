package com.mainproject.server.ChatRoom.mapper;

import com.mainproject.server.ChatRoom.dto.*;
import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.entity.ChatRoomDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class ChatRoomMapper {

    private final MemberMapper memberMapper;
    private final PlaylistMapper playlistMapper;

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

    public ResponseChatRoomDto chatRoomResponseDtoToChatRoom(ChatRoom chatRoom, Member member, ChatMessage chatMessage) {

//        ChatMessage chatMessage = new ChatMessage();
//        chatRoomDto.setUserlist(Collections.singletonList(chatMessage.getMemberName()));
//        chatRoomMap.put(chatMessage.getRoomId(), chatRoomDto);
//        log.info("why not {}", chatRoomMap.values());

        SimpleMemberResponseDto memberResponseDto = memberMapper.memberToSimpleMemberResponseDto(chatRoom.getMember());

        List<PlaylistResponseDto> playlistResponseDtos = chatRoom.getMember().getPlaylists().stream()
                .map(playlistMapper::playlistToPlaylistResponseDto)
                .collect(Collectors.toList());

        ResponseChatRoomDto responseChatRoomDto = ResponseChatRoomDto.builder()
                .chatRoom(chatRoom)
                .chatMessage(chatMessage)
                .memberResponseDto(memberResponseDto)
                .playlistResponseDtoList(playlistResponseDtos)
                .build();
        return responseChatRoomDto;
    }

    private List<ChatRoomDto> chatRoomMap;

    public MemRoomResponseDto chatRoomMemberNameResponseDtoToChatRoom(ChatRoom chatRoom, Member member, ChatMessage chatMessage, Playlist playlist) {

        PlaylistResponseDto playlistResponseDto = playlistMapper.playlistToPlaylistResponseDto(playlist);

        SimpleMemberResponseDto memberResponseDto = memberMapper.memberToSimpleMemberResponseDto(chatRoom.getMember());

        MemRoomResponseDto memRoomResponseDto = MemRoomResponseDto.builder()
                .chatRoom(chatRoom)
                .chatMessage(chatMessage)
                .memberResponseDto(memberResponseDto)
                .playlistResponseDto(playlistResponseDto)
                .build();
        return memRoomResponseDto;
    }

    public List<ResponseChatRoomDto> responseChatRoomDtoList(List<ChatRoom> chatRooms, Member member, ChatMessage chatMessage) {

        List<ResponseChatRoomDto> roomDtoList = chatRooms.stream()
                .map(chatRoom -> chatRoomResponseDtoToChatRoom(chatRoom, member, chatMessage))
                .collect(Collectors.toList());


        return roomDtoList;
    }
}
