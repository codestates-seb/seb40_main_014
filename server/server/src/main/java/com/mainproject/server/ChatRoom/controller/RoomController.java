package com.mainproject.server.ChatRoom.controller;

import com.mainproject.server.ChatRoom.dto.ChatRoomPatchDto;
import com.mainproject.server.ChatRoom.dto.ChatRoomPostDto;
import com.mainproject.server.ChatRoom.dto.ResponseChatRoomDto;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.mapper.ChatRoomMapper;
import com.mainproject.server.ChatRoom.service.ChatService;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.playlist.repository.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final ChatService chatService;
    private final MemberService memberService;
    private final ChatRoomMapper chatRoomMapper;
    private final PlaylistRepository playlistRepository;

    private final PlaylistMapper playlistMapper;

    private final MemberMapper memberMapper;

    @PostMapping
//    public ChatRoom createRoom(@RequestBody ChatRoomDto.Post requestBody) {
    public ResponseChatRoomDto createRoom(@RequestBody ChatRoomPostDto requestBody) {
        ChatRoom chatRoom = chatRoomMapper.chatRoomPostDtoToChatRoom(requestBody);
        ChatRoom room = chatService.createRoom(chatRoom);

        Member member = memberService.findMember(requestBody.getMemberId());

        List<Playlist> playlists = playlistRepository.getPlaylistsByMember(member);
        if (requestBody.getPwd() != null) {
            room.setSecret(true);
        }

        MemberResponseDto memberResponseDto = memberMapper.memberToMemberResponseDto(member);

//        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
//                .member(member)
//                .build();
//        List<PlaylistResponseDto> playlistResponseDtoList = new ArrayList<>();
//
//        for (Playlist playlist : playlists) {
//            PlaylistResponseDto playlistResponseDto = PlaylistResponseDto.builder()
//                    .playlist(playlist)
//                    .build();
//            playlistResponseDtoList.add(playlistResponseDto);
//        }

        List<PlaylistResponseDto> playlistResponseDtos = member.getPlaylists().stream()
                .map(playlistMapper::playlistToPlaylistResponseDto)
                .collect(Collectors.toList());

//        ResponseChatRoomDto responseChatRoomDto = ResponseChatRoomDto.builder()
//                .chatRoom(chatRoom)
//                .memberResponseDto(memberResponseDto)
//                .playlistResponseDtoList(playlistResponseDtoList)
//                .build();
        ResponseChatRoomDto responseChatRoomDto = ResponseChatRoomDto.builder()
                .chatRoom(chatRoom)
                .memberResponseDto(memberResponseDto)
                .playlistResponseDtoList(playlistResponseDtos)
                .build();
        return responseChatRoomDto;

//        return room;
    }

    @PatchMapping("/update/{roomId}")
    public ChatRoom updateRoom(@PathVariable String roomId,
                               @RequestBody ChatRoomPatchDto requestBody) {

        requestBody.setRoomId(roomId);
        ChatRoom room = chatService.updateRoom(chatRoomMapper.chatRoomPatchDtoToChatRoom(requestBody));
        if (requestBody.getPwd() != null) room.setSecret(true);

        return room;
    }

    @GetMapping
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }

    @GetMapping("/{roomId}")
    @ResponseBody
    public ChatRoom findRoomById(@PathVariable String roomId) {

        return chatService.findChatRoom(roomId);
    }

    @DeleteMapping("/{roomId}")
    @ResponseBody
    public void deleteRoom(@PathVariable String roomId) {

        chatService.deleteChatRoom(roomId);

    }

}
