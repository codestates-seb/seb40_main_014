package com.mainproject.server.ChatRoom.controller;

import com.mainproject.server.ChatRoom.dto.ChatRoomDto;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.mapper.ChatRoomMapper;
import com.mainproject.server.ChatRoom.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final ChatService chatService;
    private final ChatRoomMapper chatRoomMapper;

    @PostMapping
    public ChatRoom createRoom(@RequestBody ChatRoomDto.Post requestBody) {
        ChatRoom chatRoom = chatRoomMapper.chatRoomPostDtoToChatRoom(requestBody);
        ChatRoom room = chatService.createRoom(chatRoom);
        if (requestBody.getPwd() != null) room.setSecret(true);
        return room;
    }

    @PatchMapping("/update/{roomId}")
    public ChatRoom updateRoom(@PathVariable String roomId,
                               @RequestBody ChatRoomDto.Patch requestBody) {

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
