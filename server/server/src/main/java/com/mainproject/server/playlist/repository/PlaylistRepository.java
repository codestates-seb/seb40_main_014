package com.mainproject.server.playlist.repository;

import com.mainproject.server.member.entity.Member;
import com.mainproject.server.playlist.entity.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {


    List<Playlist> findByMember(Member member);
//    Page<Playlist> findByPlTitleContaining(String plTitle, Pageable pageable);
    List<Playlist> findByPlTitleContaining(String plTitle);
//    List<Playlist> findByCategoryListContaining(List<String> categoryList);
    boolean existsByPlaylistId(Long playlistId);

}