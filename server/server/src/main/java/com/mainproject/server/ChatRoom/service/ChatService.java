package com.mainproject.server.ChatRoom.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.ChatRoom.config.WebSocketTest;
import com.mainproject.server.ChatRoom.dto.ResponseChatRoomDto;
import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.repository.ChatRoomRepository;
import com.mainproject.server.roomMember.entity.roomMember;
import com.mainproject.server.member.mapper.MemberMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.NoSuchMessageException;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Getter
@RequiredArgsConstructor
@Service
public class ChatService {

    private final ObjectMapper objectMapper;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberMapper memberMapper;
    private final WebSocketTest webSocketTest;

    public ChatRoom createRoom(ChatRoom chatRoom) {

        String randomId = UUID.randomUUID().toString();
        chatRoom.setRoomId(randomId);
        if (chatRoom.getPwd() != null) chatRoom.setSecret(true);
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

        return savedChatRoom;
    }

    public ChatRoom updateRoom(ChatRoom chatRoom) {
        ChatRoom verifiedRoom = findVerifiedRoomId(chatRoom.getRoomId());

        Optional.ofNullable(chatRoom.getTitle())
                .ifPresent(title -> verifiedRoom.setTitle(title));
        Optional.ofNullable(chatRoom.getContent())
                .ifPresent(content -> verifiedRoom.setContent(content));
        Optional.ofNullable(chatRoom.getPwd())
                .ifPresent(pwd -> verifiedRoom.setPwd(pwd));

        if (verifiedRoom.getPwd() != null) verifiedRoom.setSecret(true);

        return chatRoomRepository.save(verifiedRoom);
    }

    public List<ChatRoom> findAllRoom() {
        //채팅방 최근 생성 순으로 반환
//        List<ChatRoom> result = new ArrayList<>(chatRooms.values());
//        Collections.reverse(result);

        return chatRoomRepository.findAll();
    }

    public ChatRoom findChatRoom(String roomId) {
        return findVerifiedRoomId(roomId);
    }


    //MessageType : ENTER
    public int plusMemCount(String roomId) {
        ResponseChatRoomDto chatRoom = new ResponseChatRoomDto();
//        List<Member> members = chatRoom.getRoomMemberlist().stream()
//                .map(roomMember::getMember)
//                .collect(Collectors.toList());
        chatRoom.setRoomId(roomId);
        return chatRoom.getRoomMemberlist() + 1; //responsedto에서 memberlist type을 int로 지정해서
    }

    //MessageType : LEAVE
    public int minusMemCount(String roomId) {
        ResponseChatRoomDto chatRoom = new ResponseChatRoomDto();
        return chatRoom.getRoomMemberlist() - 1;

    }
    public void addMem(String roomId) {
        ChatRoom verifiedRoom = findVerifiedRoomId(roomId);
        verifiedRoom.setRoomMemberList((List<roomMember>) verifiedRoom.getMember());
    }

    // 채팅방 memName 조회

    public <T> void sendMessage(WebSocketSession session, T message) {
        //webSocketTest.onMessage("");
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }
        catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    public ChatRoom findVerifiedRoomId(String roomId){
        Optional<ChatRoom> optionalChatRoom= chatRoomRepository.findChatRoomByRoomId(roomId);
        ChatRoom chatRoom = new ChatRoom();
        if (optionalChatRoom.isEmpty()) return chatRoom;
        ChatRoom findChatRoom =
                optionalChatRoom.orElseThrow(() -> new NoSuchMessageException("채팅방을 찾을 수 없습니다."));
        return findChatRoom;
    }

    public Page<ChatRoom> searchChatRooms(int page, int size, String tab, String q) {
        if (tab.equals("popular")) tab = "chatroom.memberCount";
        Page<ChatRoom> chatRooms = chatRoomRepository.findByTitleContaining(q, PageRequest.of(page, size));
        return chatRooms;
    }

    public void deleteChatRoom(String roomId) {
        chatRoomRepository.deleteById(roomId);
    }
}
