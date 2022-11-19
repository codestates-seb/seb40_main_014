package com.mainproject.server.ChatRoom.controller;

import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.repository.ChatRoomRepository;
import com.mainproject.server.ChatRoom.service.ChatService;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.roomMember.entity.roomMember;
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
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Optional;


@Controller
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final SimpMessageSendingOperations template;

    @Autowired
    ChatService chatService;

    @Autowired
    ChatRoomRepository chatRoomRepository;

//    private final ChatRoomPostDto chatRoomPostDto;

    // MessageMapping 을 통해 webSocket 로 들어오는 메시지를 발신 처리한다.
    // 이때 클라이언트에서는 /pub/chat/~ 로 요청하게 되고 이것을 controller 가 받아서 처리한다.
    // 처리가 완료되면 /sub/chat/room/roomId 로 메시지가 전송된다.
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload ChatMessage chat, SimpMessageHeaderAccessor headerAccessor) {

        // 채팅방 유저+1
        chatService.plusMemCount(chat.getChatRoom().getRoomId());

        // 채팅방에 유저 추가 및 memberId 반환
        chatService.addMem(chat.getChatRoom().getRoomId());

        // 반환 결과를 socket session 에 memberId 로 저장
        headerAccessor.getSessionAttributes().put("member", chat.getMember().getMemberId());
        headerAccessor.getSessionAttributes().put("roomId", chat.getChatRoom().getRoomId());

        chat.setMessage(chat.getMember().getMemberId() + " 님 입장하셨습니다.");
        template.convertAndSend("/sub/chat/room/" + chat.getChatRoom().getRoomId(), chat);

    }

    // 해당 유저 채팅 보내기
    @MessageMapping("/chat/sendMessage")
    public void sendMessage(@Payload ChatMessage chat) {
        log.info("CHAT {}", chat);
        chat.setMessage(chat.getMessage());
        template.convertAndSend("/sub/chat/room/" + chat.getChatRoom().getRoomId(), chat);
    }

    // 유저 퇴장 시에는 EventListener 을 통해서 유저 퇴장을 확인
    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("DisConnEvent {}", event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        // stomp 세션에 있던 member 와 roomId 를 확인해서 채팅방 유저 리스트와 room 에서 해당 유저를 삭제
        String mem = (String) headerAccessor.getSessionAttributes().get("mem");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        log.info("headAccessor {}", headerAccessor);

        // 채팅방 유저 -1
        chatService.minusMemCount(roomId);

        // 채팅방 유저 리스트에서 memberId 멤버 닉네임 조회 및 리스트에서 memberId 삭제
        roomMember roomMember = new roomMember();
        String roomMemberid = roomMember.getRoomMemberid();

        if (roomMemberid != null) {
            log.info("User Disconnected : " + roomMemberid);

            // builder 어노테이션 활용
            ChatMessage chat = ChatMessage.builder()
                    .type(ChatMessage.MessageType.LEAVE)
                    .member(Member.builder()
                            .memberId(Long.valueOf(roomMemberid))
                            .build())
                    .message(roomMemberid + " 님 퇴장하셨습니다")
                    .build();

            template.convertAndSend("/sub/chat/room/" + roomId, chat);
        }
    }

    //재시도하는 로직 브라우저 닫히면 다시 붙을 수 있는 retry 로직 필요
}
