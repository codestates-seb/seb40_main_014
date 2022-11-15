package com.mainproject.server.ChatRoom.controller;

import com.mainproject.server.ChatRoom.dto.ChatRoomCountDto;
import com.mainproject.server.ChatRoom.dto.ChatRoomDto;
import com.mainproject.server.ChatRoom.mapper.ChatRoomMapper;
import com.mainproject.server.ChatRoom.repository.ChatRoomRepository;
import com.mainproject.server.ChatRoom.service.ChatService;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessageSendingOperations template;

    @Autowired
    ChatService chatService;

    @Autowired
    ChatRoomRepository chatRoomRepository;

    @MessageMapping("chat/enter")
    public void enterMember(@Payload ChatRoomCountDto chat, SimpMessageHeaderAccessor headerAccessor) {
        chatService.plusMemCount(chat.getRoomId());

    }



}
