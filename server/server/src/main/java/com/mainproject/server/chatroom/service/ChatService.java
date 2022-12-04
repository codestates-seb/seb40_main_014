package com.mainproject.server.chatroom.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mainproject.server.chatroom.config.WebSocketTest;
import com.mainproject.server.chatroom.entity.ChatRoom;
import com.mainproject.server.chatroom.repository.ChatRoomRepository;
import com.mainproject.server.exception.BusinessException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.repository.PlaylistRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Getter
@RequiredArgsConstructor
@Service
public class ChatService {

    private final ObjectMapper objectMapper;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberMapper memberMapper;
    private final WebSocketTest webSocketTest;
    private final MemberRepository memberRepository;
    private final PlaylistRepository playlistRepository;

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

    public Page<ChatRoom> findRoomsUserSize(int page, int size) {
        Page<ChatRoom> findAllRooms = chatRoomRepository.findAll(
                PageRequest.of(page, size, Sort.by("userSize").descending()));

        return findAllRooms;
    }

    public Page<ChatRoom> searchChatRooms(String type, String name, int page, int size) {

        List<ChatRoom> searchChatRooms = new ArrayList<>();

        if (type.equals("title")) {
            //해당 타이틀을 포함하는 플레이리스트 목록
            List<ChatRoom> chatRooms = chatRoomRepository.findByTitleContaining(name);
            for (ChatRoom chatRoom : chatRooms) {
                // 방이 온에어 상태라면 추가
//                    if (chatRoom.getOnair().equals(ChatRoom.Onair.ON))
                searchChatRooms.add(chatRoom);
            }
        }
        else if (type.equals("name")) {
            // 멤버 이름이 포함된 member 검색
            List<Member> searchMembers = memberRepository.findByNameContaining(name);
            for (Member member : searchMembers) {
                // 해당 member들이 포함된 방 검색
                List<ChatRoom> chatRooms = chatRoomRepository.findByMember(member);
                for (ChatRoom chatRoom : chatRooms) {
                    // 방이 온에어 상태라면 추가
//                    if (chatRoom.getOnair().equals(ChatRoom.Onair.ON))
                    searchChatRooms.add(chatRoom);
                }
            }
        }
        else if (type.equals("category")) {
            // 해당 카테고리를 포함하는 플레이리스트 목록
//            List<String> search = new ArrayList<>();
//            search.add(name);
//            searchPlaylists = playlistRepository.findByCategoryListContaining(search);

            // 모든 플레이리스트를 조회해서 카테고리랑 일치하면 리스트에 넣기
            // 플레이리스트를 전부 조회하기 때문에 플레이리스트가 많아지면 문제가 있음
            List<Playlist> allPlaylists = playlistRepository.findAll();
            List<ChatRoom> chatRooms = new ArrayList<>();
            ChatRoom findChatRoom = new ChatRoom();
            for (Playlist playlist : allPlaylists){
                for (int i=0; i<playlist.getCategoryList().size(); i++){
                    for (int j=0; j<chatRoomRepository.findByPlaylistId(playlist.getPlaylistId()).size(); j++) {
                        findChatRoom = chatRoomRepository.findByPlaylistId(playlist.getPlaylistId()).get(0);
                    }
                    if (playlist.getCategoryList().get(i).equals(name)
//                    && findChatRoom.getOnair().equals(ChatRoom.Onair.ON)
                    ){
                        chatRooms.add(findChatRoom);
                    }
                }
            }
            // 중복 제거
            searchChatRooms = chatRooms.stream().distinct().collect(Collectors.toList());
        }
        else {throw new BusinessException(ExceptionCode.BAD_REQUEST);
        }
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("userCount").descending());
        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchChatRooms.size());

        Page<ChatRoom> chatRoomPage = new PageImpl<>(searchChatRooms.subList(start, end), pageRequest, searchChatRooms.size());
        return chatRoomPage;
    }
}
