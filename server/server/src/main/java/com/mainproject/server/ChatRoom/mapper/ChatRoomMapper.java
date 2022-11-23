package com.mainproject.server.ChatRoom.mapper;

import com.mainproject.server.ChatRoom.dto.ChatRoomPatchDto;
import com.mainproject.server.ChatRoom.dto.ChatRoomPostDto;
import com.mainproject.server.ChatRoom.dto.MemberChatRoomDto;
import com.mainproject.server.ChatRoom.dto.ResponseChatRoomDto;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.roomMember.entity.roomMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatRoomMapper {

    private final MemberMapper memberMapper;
    private final PlaylistMapper playlistMapper;
    private final MemberService memberService;
    private final MemberRepository memberRepository;

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

        List<PlaylistResponseDto> playlistResponseDtos = chatRoom.getMember().getPlaylists().stream()
                .map(playlistMapper::playlistToPlaylistResponseDto)
                .collect(Collectors.toList());

        ResponseChatRoomDto responseChatRoomDto = ResponseChatRoomDto.builder()
                .chatRoom(chatRoom)
                .memberResponseDto(memberResponseDto)
                .playlistResponseDtoList(playlistResponseDtos)
                .build();
        return responseChatRoomDto;
    }

    public MemberChatRoomDto chatRoomMemberListResponseDtoToChatRoom(ChatRoom chatRoom, List<Member> memberList) {

        List<SimpleMemberResponseDto> memberResponseDtos = memberMapper.memberListToSimpleMemberResponseDtoList(memberList);

        List<PlaylistResponseDto> playlistResponseDtos = chatRoom.getMember().getPlaylists().stream()
                .map(playlistMapper::playlistToPlaylistResponseDto)
                .collect(Collectors.toList());

        MemberChatRoomDto responseChatRoomDto = MemberChatRoomDto.builder()
                .chatRoom(chatRoom)
                .memberResponseDto(memberResponseDtos)
                .playlistResponseDtoList(playlistResponseDtos)
                .build();
        return responseChatRoomDto;
    }

    public List<ResponseChatRoomDto> responseChatRoomDtoList(List<ChatRoom> chatRooms, Member member) {

//        List<MemberResponseDto> memberResponseDtos = memberMapper.memberListToMemberResponseDtoList(memberList);

        List<ResponseChatRoomDto> roomDtoList = chatRooms.stream()
                .map(chatRoom -> chatRoomResponseDtoToChatRoom(chatRoom, member))
                .collect(Collectors.toList());


        return roomDtoList;
    }
}
