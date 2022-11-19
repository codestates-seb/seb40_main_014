package com.mainproject.server.playlist.repository;

import com.mainproject.server.member.entity.Member;
import com.mainproject.server.playlist.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {


    List<Playlist> getPlaylistsByMember(Member member);

}