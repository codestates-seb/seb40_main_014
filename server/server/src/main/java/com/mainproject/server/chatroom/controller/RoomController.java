package com.mainproject.server.chatroom.controller;

import com.mainproject.server.chatroom.dto.ChatRoomPatchDto;
import com.mainproject.server.chatroom.dto.ChatRoomPostDto;
import com.mainproject.server.chatroom.entity.ChatRoom;
import com.mainproject.server.chatroom.mapper.ChatRoomMapper;
import com.mainproject.server.chatroom.service.ChatService;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.service.PlaylistService;
import com.mainproject.server.response.MultiResponseDto;
import com.mainproject.server.response.SingleResponseDto;
import com.mainproject.server.tx.NeedMemberId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final ChatService chatService;
    private final MemberService memberService;
    private final ChatRoomMapper chatRoomMapper;
    private final PlaylistService playlistService;
    
    @NeedMemberId
    @PostMapping
    public ResponseEntity createRoom(@RequestBody ChatRoomPostDto requestBody, Long authMemberId) {

        Member member = memberService.findMember(authMemberId);
        Playlist playlist = playlistService.findPlaylist(requestBody.getPlaylistId());
        ChatRoom chatRoom = chatRoomMapper.chatRoomPostDtoToChatRoom(requestBody, member);
        chatRoom.setPlaylistId(requestBody.getPlaylistId());
        ChatRoom room = chatService.createRoom(chatRoom);

        return new ResponseEntity<>(
                new SingleResponseDto<>(chatRoomMapper.chatRoomMemberNameResponseDtoToChatRoom(room, member, playlist)), HttpStatus.OK);
    }

    @NeedMemberId
    @PatchMapping("/update/{roomId}")
    public ResponseEntity updateRoom(@PathVariable String roomId,
                                     @Valid @RequestBody ChatRoomPatchDto requestBody, Long authMemberId) {
        requestBody.setRoomId(roomId);
        Member member = memberService.findMember(authMemberId);
        ChatRoom chatRoom1 = chatRoomMapper.chatRoomPatchDtoToChatRoom(requestBody, member);
        ChatRoom chatRoom = chatService.updateRoom(chatRoom1);

        return new ResponseEntity<>(
                new SingleResponseDto<>(chatRoomMapper.chatRoomResponseDtoToChatRoom(chatRoom, member)), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity findAllRooms(@RequestParam(required = false, defaultValue = "1") int page,
                                       @RequestParam(required = false, defaultValue = "15") int size, Member member) {

        Page<ChatRoom> chatRoomPage = chatService.findChatRooms(page - 1 , size);
        List<ChatRoom> content = chatRoomPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(chatRoomMapper.responseChatRoomDtoList(content, member), chatRoomPage), HttpStatus.OK);
    }

    @GetMapping("/{roomId}")
    @ResponseBody
    public ResponseEntity findRoomById(@PathVariable String roomId, Member member) {

        ChatRoom chatRoom = chatService.findVerifiedRoomId(roomId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(chatRoomMapper.chatRoomResponseDtoToChatRoom(chatRoom, member)),HttpStatus.OK);
    }

    @DeleteMapping("/delete/{roomId}")
    @ResponseBody
    public String deleteRoom(@PathVariable String roomId) {

        chatService.deleteChatRoom(roomId);
        return "room deleted success";
    }

    @GetMapping("/users")
    public ResponseEntity findRoomsUserList(@RequestParam(required = false, defaultValue = "1") int page,
                                            @RequestParam(required = false, defaultValue = "10") int size, Member member) {

        Page<ChatRoom> chatRoomPage = chatService.findRoomsUserSize(page - 1 , size);
        List<ChatRoom> content = chatRoomPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(chatRoomMapper.responseChatRoomDtoList(content, member), chatRoomPage), HttpStatus.OK);
    }

    @GetMapping("/rank")
    public ResponseEntity findRoomsRank(@RequestParam(required = false, defaultValue = "1") int page,
                                        @RequestParam(required = false, defaultValue = "10") int size) {

        Page<Member> roomsRank = memberService.findRoomsRank(page - 1, size);
        List<Member> rankContent = roomsRank.getContent();

        Page<ChatRoom> chatRoomPage = chatService.findChatRooms(page - 1 , size);

        return new ResponseEntity<>(
                new MultiResponseDto<>(chatRoomMapper.chatRoomRankDtotoMember(rankContent), chatRoomPage), HttpStatus.OK);
    }

    // 방 검색
    @GetMapping("/search")
    public ResponseEntity searchMembers(@Positive @RequestParam(defaultValue = "1") int page,
                                        @Positive @RequestParam(defaultValue = "6") int size,
                                        @RequestParam String type, @RequestParam String name,
                                        Member member) {

        Page<ChatRoom> pageChatRooms = chatService.searchChatRooms(type, name, page-1, size);
        List<ChatRoom> chatRoomList = pageChatRooms.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(chatRoomMapper.responseChatRoomDtoList(chatRoomList, member), pageChatRooms), HttpStatus.OK);

    }
}
