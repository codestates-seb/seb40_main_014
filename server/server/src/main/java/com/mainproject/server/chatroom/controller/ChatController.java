package com.mainproject.server.chatroom.controller;

import com.mainproject.server.chatroom.dto.ResponseChatRoomDto;
import com.mainproject.server.chatroom.entity.ChatMessage;
import com.mainproject.server.chatroom.entity.ChatRoom;
import com.mainproject.server.chatroom.mapper.ChatRoomMapper;
import com.mainproject.server.chatroom.repository.ChatRoomRepository;
import com.mainproject.server.chatroom.service.ChatService;
import com.mainproject.server.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.net.SocketAddress;

import static com.mainproject.server.chatroom.entity.ChatMessage.MessageType.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChatController {

    private final SimpMessagingTemplate template;
    private final ChatService chatService;
    private final ChatRoomRepository chatRoomRepository;

    private final ChatRoomMapper chatRoomMapper;

    // MessageMapping 을 통해 webSocket 로 들어오는 메시지를 발신 처리한다.
    // 이때 클라이언트에서는 /pub/chat/~ 로 요청하게 되고 이것을 controller 가 받아서 처리한다.
    // 처리가 완료되면 /sub/chat/room/roomId 로 메시지가 전송된다.
    @MessageMapping("/chat/enterUser")
    public void enterUser(@Payload ChatMessage chat,
                          SimpMessageHeaderAccessor headerAccessor) {
//                            SimpMessageHeaderAccessor headerAccessor) throws IOException {

        chat.setMessage(chat.getMessage());

        // 채팅방 유저+1
        ChatRoom room = chatService.findVerifiedRoomId(chat.getRoomId());
        room.setRoomId(chat.getRoomId());
        boolean isContains = room.getUserlist().contains(chat.getMemberName());
        if (!isContains) {
            room.getUserlist().add(chat.getMemberName());
            room.setUserlist(room.getUserlist());
            room.setUserSize(room.getUserlist().size());
            chat.setMessage(chat.getMemberName() + " 님 입장하셨습니다.");
            if (chat.getType().equals(ENTER)) {
                template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
            }
            chatRoomRepository.save(room);
        }

        chatRoomRepository.save(room);

        // 세션 disconnect 되는 이슈 해결 위한 timeout 설정
//        String IP = "oauth-1.ckoylwknnufz.ap-northeast-2.rds.amazonaws.com";
//        int PORT = 13306;
//        int Timeout = 4000;
//        Socket clientSocket= new Socket();
//        SocketAddress socketAddress = new InetSocketAddress(IP, PORT);
//        clientSocket.connect(socketAddress, Timeout);

        // 반환 결과를 socket session 에 memName 으로 저장
        headerAccessor.getSessionAttributes().put("MemberName", chat.getMemberName());
        headerAccessor.getSessionAttributes().put("roomId", chat.getRoomId());

        log.info("CHAT6 {}", headerAccessor.getSessionAttributes()); // MemberName, roomId가 저장된 sessionAttributes가 찍힘
    }

    // 해당 유저 채팅 보내기
    @MessageMapping("/chat/sendMessage/{roomId}")
    public void sendMessage(@Payload ChatMessage chat,
                            @PathVariable String roomId) {

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
        room.getUserlist().remove(memberName);
        room.setUserlist(room.getUserlist());
        room.setUserSize(room.getUserlist().size());
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
    public void leaveRoom(@Payload ChatMessage chat) {
        if (chat.getType().equals(LEAVE)) {
            chat.setMemberName(chat.getMemberName());
//            chat.setMessage(chat.getMemberName() + "님 퇴장하셨습니다.");
            ChatRoom room = chatService.findVerifiedRoomId(chat.getRoomId());
            room.setRoomId(chat.getRoomId());

            room.getUserlist().remove(chat.getMemberName());
            room.setUserSize(room.getUserlist().size());
//            room.getUserlist().remove(String.valueOf(chat.getMemberId()));
            chatRoomRepository.save(room);

            template.convertAndSend("/sub/chat/room/" + chat.getRoomId(), chat);
        }
    }

    @GetMapping("/rooms/chat/{roomId}")
    @ResponseBody
    public Boolean chatRoom(@PathVariable String roomId, @RequestParam String memberName, Member member) {
        ChatRoom chatRoom = chatService.findVerifiedRoomId(roomId);
        ResponseChatRoomDto responseChatRoomDto = chatRoomMapper.chatRoomResponseDtoToChatRoom(chatRoom, member);
        if (responseChatRoomDto.getUserlist().contains(memberName)) {
            return true;
        } else return false;
    }

}
//재시도하는 로직 브라우저 닫히면 다시 붙을 수 있는 retry 로직 필요
