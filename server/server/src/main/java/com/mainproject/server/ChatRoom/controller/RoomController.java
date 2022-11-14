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
@CrossOrigin
@RequestMapping("/rooms")
public class RoomController {

    private final ChatService chatService;
    private final ChatRoomMapper chatRoomMapper;

    @PostMapping
    public ChatRoom createRoom(@RequestBody ChatRoomDto.Post requestBody) {
        ChatRoom chatRoom = chatRoomMapper.chatRoomPostDtoToChatRoom(requestBody);
        ChatRoom room = chatService.creatRoom(requestBody.getTitle(), requestBody.getContent(), requestBody.getPwd());
        if (requestBody.getPwd() != null) room.setSecret(true);
        return room;
    }

    @PatchMapping("/update")
    public ChatRoom updateRoom(@RequestParam String roomId,
                               @RequestBody ChatRoomDto.Patch requestBody) {

        ChatRoom chatRoom = chatRoomMapper.chatRoomPatchDtoToChatRoom(requestBody);
        if (requestBody.getPwd() != null) chatRoom.setSecret(true);

        return chatService.updateRoom(chatRoom);

    }

    @GetMapping
    public List<ChatRoom> findAllRoom() {
        return chatService.findAllRoom();
    }

    @GetMapping("/{roomId}")
    @ResponseBody
    public ChatRoom findRoomById(@PathVariable String roomId) {
        return chatService.findRoomById(roomId);
    }

}
