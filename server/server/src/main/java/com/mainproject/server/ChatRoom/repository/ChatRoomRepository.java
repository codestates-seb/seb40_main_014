package com.mainproject.server.ChatRoom.repository;

import com.mainproject.server.ChatRoom.dto.ResponseChatRoomDto;
import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    Optional<ChatRoom> findByRoomId(String roomId);
    Page<ChatRoom> findByTitleContaining(String keyword, Pageable pageable);
    List<ChatRoom> findByTitleContaining(String title);
    List<ChatRoom> findByMember(Member member);
    List<ChatRoom> findByPlaylistId(Long playlistId);
}
