package com.mainproject.server.ChatRoom.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.ChatRoom.config.WebSocketTest;
import com.mainproject.server.ChatRoom.entity.ChatMessage;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.ChatRoom.repository.ChatRoomRepository;
import com.mainproject.server.exception.BusinessException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.member.mapper.MemberMapper;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.NoSuchMessageException;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;

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

//        String randomId = UUID.randomUUID().toString();
//        chatRoom.setRoomId(randomId);
        if (chatRoom.getPwd() != null) chatRoom.setSecret(true);
        ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);

        return savedChatRoom;
    }

    public ChatRoom updateRoom(ChatRoom chatRoom) {
        ChatRoom verifiedRoom = findVerifiedRoomId(chatRoom.getRoomId());

        Optional.ofNullable(chatRoom.getTitle())
                .ifPresent(title -> verifiedRoom.setTitle(title));
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

    //MessageType : ENTER
    public void plusMemCount(String roomId) {
//        List<Member> members = chatRoom.getRoomMemberlist().stream()
//                .map(roomMember::getMember)
//                .collect(Collectors.toList());
        ChatRoom room = findVerifiedRoomId(roomId);
        room.setUserCount(room.getUserCount() + 1);
    }

    //MessageType : LEAVE
    public void minusMemCount(String roomId) {
//        ChatRoom room = chatRoomMap.get(roomId);
//        room.setUserCount(room.getUserCount() - 1);
        ChatRoom room = findVerifiedRoomId(roomId);
        room.setUserCount(room.getUserCount() - 1);
    }

    public Page<ChatRoom> findChatRooms(int page, int size) {
        Page<ChatRoom> findAllRooms = chatRoomRepository.findAll(
                PageRequest.of(page, size, Sort.by("roomId").descending()));

        return findAllRooms;
    }

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
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(roomId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.ROOM_NOT_EXISTS));
//        ChatRoom chatRoom = new ChatRoom();
//        if (optionalChatRoom.isEmpty()) return chatRoom;
//        ChatRoom findChatRoom =
//                optionalChatRoom.orElseThrow(() -> new NoSuchMessageException("채팅방을 찾을 수 없습니다."));
        return chatRoom;
    }

    public Page<ChatRoom> searchChatRooms(int page, int size, String tab, String q) {
        if (tab.equals("popular")) tab = "chatroom.memberCount";
        Page<ChatRoom> chatRooms = chatRoomRepository.findByTitleContaining(q, PageRequest.of(page, size));
        return chatRooms;
    }

    public void deleteChatRoom(String roomId) {
        ChatRoom room = findVerifiedRoomId(roomId);
        chatRoomRepository.delete(room);
    }
}
