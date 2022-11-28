package com.mainproject.server.ChatRoom.controller;

import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.repository.ChatRoomRepository;
import com.mainproject.server.ChatRoom.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import static com.mainproject.server.ChatRoom.entity.ChatMessage.MessageType.*;

@Controller
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChatController {

    private final SimpMessagingTemplate template;
    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;

    // MessageMapping 을 통해 webSocket 로 들어오는 메시지를 발신 처리한다.
    // 이때 클라이언트에서는 /pub/chat/~ 로 요청하게 되고 이것을 controller 가 받아서 처리한다.
    // 처리가 완료되면 /sub/chat/room/roomId 로 메시지가 전송된다.
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload ChatMessage chat,
                          SimpMessageHeaderAccessor headerAccessor) {

        chat.setMessage(chat.getMessage());

        // 채팅방 유저+1
        ChatRoom room = chatService.findVerifiedRoomId(chat.getRoomId());
        room.setRoomId(chat.getRoomId());

        boolean isContains = room.getUserlist().contains(chat.getMemberName());
        if (!isContains) {
            room.getUserlist().add(chat.getMemberName());
            room.setUserlist(room.getUserlist());
            room.setUserCount(room.getUserCount() + 1);
            chatRoomRepository.save(room);
        }
        chatRoomRepository.save(room);

        // 반환 결과를 socket session 에 memName 으로 저장
        headerAccessor.getSessionAttributes().put("MemberName", chat.getMemberName());
        headerAccessor.getSessionAttributes().put("roomId", chat.getRoomId());

        log.info("CHAT6 {}", headerAccessor.getSessionAttributes()); // MemberName, roomId가 저장된 sessionAttributes가 찍힘

        chat.setMessage(chat.getMemberName() + " 님 입장하셨습니다.");
        if (chat.getType().equals(ENTER)) {
            template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
        }
        log.info("chatcontroller UserList{}", room.getUserlist());
    }

    // 해당 유저 채팅 보내기
    @MessageMapping("/chat/sendMessage/{roomId}")
    public void sendMessage(@Payload ChatMessage chat,
                            @PathVariable String roomId) {

        log.info("CHAT1 {}", chat);
        log.info("CHAT2 {}", chat.getMessage()); // Hello World
        log.info("CHAT3 {}", roomId);  // chat
        log.info("CHAT5 {}", chat.getRoomId()); // roomId

        chat.setMemberName(chat.getMemberName());
        chat.setMessage(chat.getMessage());

        if (chat.getType().equals(TALK)) {
            template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
        }
    }


    // 유저 퇴장 시에는 EventListener 을 통해서 유저 퇴장을 확인
    @EventListener
    public void webSocketDisconnectListener(SessionDisconnectEvent event) {
        log.info("DisConnEvent {}", event);

        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String memberName = (String) headerAccessor.getSessionAttributes().get("MemberName");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        // 채팅방 유저 -1
        ChatRoom room = chatService.findVerifiedRoomId(roomId);
        room.setRoomId(roomId);
        room.setUserCount(room.getUserCount() - 1);
        room.getUserlist().remove(memberName);
        chatRoomRepository.save(room);

        log.info("headAccessor {}", headerAccessor);

        ChatMessage chatMessage = ChatMessage.builder()
                .type(ChatMessage.MessageType.LEAVE)
                .memberName(memberName)
                .roomId(roomId)
                .message(memberName + "님 퇴장하셨습니다.")
                .build();

        template.convertAndSend("/sub/chat/room/" + chatMessage.getRoomId(), chatMessage);
    }

    @MessageMapping("/chat/leave")
    public void leaveRoom(@Payload ChatMessage chat,
                          @PathVariable String roomId) {
        if (chat.getType().equals(LEAVE)) {
            chat.setMemberName(chat.getMemberName());
            chat.setMessage(chat.getMemberName() + "님 퇴장하셨습니다.");
            log.info("loggigingin {}", chat.getRoomId());
            ChatRoom room = chatService.findVerifiedRoomId(chat.getRoomId());
            room.setRoomId(chat.getRoomId());

            room.setUserCount(room.getUserCount() - 1);
            room.getUserlist().remove(chat.getMemberName());
            chatRoomRepository.save(room);

            template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
        }
    }
}

//재시도하는 로직 브라우저 닫히면 다시 붙을 수 있는 retry 로직 필요
