package com.mainproject.server.ChatRoom.controller;

import com.mainproject.server.ChatRoom.dto.ChatRoomPatchDto;
import com.mainproject.server.ChatRoom.dto.ChatRoomPostDto;
import com.mainproject.server.ChatRoom.dto.ResponseChatRoomDto;
import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.entity.ChatRoomDto;
import com.mainproject.server.ChatRoom.mapper.ChatRoomMapper;
import com.mainproject.server.ChatRoom.service.ChatService;
import com.mainproject.server.member.dto.MemberResponseDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.playlist.repository.PlaylistRepository;
import com.mainproject.server.playlist.service.PlaylistService;
import com.mainproject.server.response.MultiResponseDto;
import com.mainproject.server.response.SingleResponseDto;
import com.mainproject.server.tx.NeedMemberId;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
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
    private final PlaylistService playlistService;

    @NeedMemberId
    @PostMapping("/{playlist-id}")
    public ResponseEntity createRoom(@RequestBody ChatRoomPostDto requestBody,
                                     @PathVariable("playlist-id") @Positive long playlistId,
                                     Long authMemberId, ChatMessage chatMessage) {
        Member member = memberService.findMember(authMemberId);
        Playlist playlist = playlistService.findPlaylist(playlistId);
        ChatRoom chatRoom = chatRoomMapper.chatRoomPostDtoToChatRoom(requestBody, member);
        ChatRoom room = chatService.createRoom(chatRoom);

        return new ResponseEntity<>(
                new SingleResponseDto<>(chatRoomMapper.chatRoomMemberNameResponseDtoToChatRoom(room, member, chatMessage, playlist)), HttpStatus.OK);
    }

    @NeedMemberId
    @PatchMapping("/update/{roomId}")
    public ResponseEntity updateRoom(@PathVariable String roomId,
                                     @Valid @RequestBody ChatRoomPatchDto requestBody, Long authMemberId, ChatMessage chatMessage) {
        requestBody.setRoomId(roomId);
        Member member = memberService.findMember(authMemberId);
        ChatRoom chatRoom1 = chatRoomMapper.chatRoomPatchDtoToChatRoom(requestBody, member);
        ChatRoom chatRoom = chatService.updateRoom(chatRoom1);

        return new ResponseEntity<>(
                new SingleResponseDto<>(chatRoomMapper.chatRoomResponseDtoToChatRoom(chatRoom, member, chatMessage)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity findAllRooms(@RequestParam(required = false, defaultValue = "1") int page,
                                       @RequestParam(required = false, defaultValue = "15") int size, Member member, ChatMessage chatMessage) {

        Page<ChatRoom> chatRoomPage = chatService.findChatRooms(page - 1 , size);
        List<ChatRoom> content = chatRoomPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(chatRoomMapper.responseChatRoomDtoList(content, member, chatMessage), chatRoomPage), HttpStatus.OK);
    }

    @GetMapping("/{roomId}")
    @ResponseBody
    public ResponseEntity findRoomById(@PathVariable String roomId, Member member, ChatMessage chatMessage) {

        ChatRoom chatRoom = chatService.findVerifiedRoomId(roomId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(chatRoomMapper.chatRoomResponseDtoToChatRoom(chatRoom, member, chatMessage)),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{roomId}")
    @ResponseBody
    public String deleteRoom(@PathVariable String roomId) {

        chatService.deleteChatRoom(roomId);
        return "room deleted success";
    }

}
