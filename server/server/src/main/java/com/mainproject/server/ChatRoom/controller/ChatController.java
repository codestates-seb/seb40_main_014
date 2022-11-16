package com.mainproject.server.ChatRoom.controller;

import com.mainproject.server.ChatRoom.dto.ChatRoomCountDto;
import com.mainproject.server.ChatRoom.dto.ChatRoomDto;
import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.mapper.ChatRoomMapper;
import com.mainproject.server.ChatRoom.repository.ChatRoomRepository;
import com.mainproject.server.ChatRoom.service.ChatService;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;


@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessageSendingOperations template;

    @Autowired
    ChatService chatService;

    @Autowired
    ChatRoomRepository chatRoomRepository;

    // MessageMapping 을 통해 webSocket 로 들어오는 메시지를 발신 처리한다.
    // 이때 클라이언트에서는 /pub/chat/~ 로 요청하게 되고 이것을 controller 가 받아서 처리한다.
    // 처리가 완료되면 /sub/chat/room/roomId 로 메시지가 전송된다.
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload ChatMessage chat, SimpMessageHeaderAccessor headerAccessor) {

        // 채팅방 유저+1
        chatService.plusMemCount(chat.getRoomId());

        // 채팅방에 유저 추가 및 memberId 반환
        chatService.addMem(chat.getRoomId());

        // 반환 결과를 socket session 에 memberId 로 저장
        headerAccessor.getSessionAttributes().put("member", chat.getMemberId());
        headerAccessor.getSessionAttributes().put("roomId", chat.getRoomId());

        chat.setMessage(chat.getMemberId() + " 님 입장!!");
        template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);

    }

    // 해당 유저
    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload ChatMessage chat) {
        log.info("CHAT {}", chat);
        chat.setMessage(chat.getMessage());
        template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);

    }

    // 유저 퇴장 시에는 EventListener 을 통해서 유저 퇴장을 확인
    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("DisConnEvent {}", event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // stomp 세션에 있던 member 와 roomId 를 확인해서 채팅방 유저 리스트와 room 에서 해당 유저를 삭제
        String memName = (String) headerAccessor.getSessionAttributes().get("memName");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        log.info("headAccessor {}", headerAccessor);

        // 채팅방 유저 -1
        chatService.minusMemCount(roomId);

        // 채팅방 유저 리스트에서 memberId 멤버 닉네임 조회 및 리스트에서 memberId 삭제
        String memId = String.valueOf(chatService.getMemId(roomId));
        chatRoomRepository.deleteById(roomId);

        if (memId != null) {
            log.info("User Disconnected : " + memId);

            // builder 어노테이션 활용
            ChatMessage chat = ChatMessage.builder()
                    .type(ChatMessage.MessageType.LEAVE)
                    .memberId(String.valueOf(memId))
                    .message(memId + " 님 퇴장!!")
                    .build();

            template.convertAndSend("/sub/chat/room/" + roomId, chat);
        }
    }

    // 채팅에 참여한 유저 리스트 반환
//    @GetMapping("/chat/userlist")
//    @ResponseBody
//    public ArrayList<String> userList(String roomId) {
//
//        return chatRoomRepository.getUserList(roomId);
//    }

}
