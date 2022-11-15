package com.mainproject.server.ChatRoom.mapper;

import com.mainproject.server.ChatRoom.dto.ChatRoomDto;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ChatRoomMapper {

    public ChatRoom chatRoomPostDtoToChatRoom(ChatRoomDto.Post chatRoomPostDto) {
        if (chatRoomPostDto == null) return null;
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setTitle(chatRoomPostDto.getTitle());
        chatRoom.setContent(chatRoomPostDto.getContent());
        chatRoom.setPwd(chatRoomPostDto.getPwd());
        return chatRoom;
    }

    public ChatRoom chatRoomPatchDtoToChatRoom(ChatRoomDto.Patch chatRoomPatchDto) {
        if (chatRoomPatchDto == null) return null;
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.setTitle(chatRoomPatchDto.getTitle());
        chatRoom.setContent(chatRoomPatchDto.getContent());
        chatRoom.setPwd(chatRoomPatchDto.getPwd());
        return chatRoom;
    }

    public ChatRoomDto.Count chatRoomCountDtoToChatRoom(ChatRoom chatRoom) {
        Long memberId = chatRoom.getMemberId();
        ChatRoomDto.Count countDto = new ChatRoomDto.Count(
        chatRoom.getMemberList().size(),
        chatRoom.setTitle(ch.getTitle());
        chatRoom.setContent(chatRoomPatchDto.getContent());
        chatRoom.setPwd(chatRoomPatchDto.getPwd()));

        );
    }
}
