package com.mainproject.server.playlist.repository;

import com.mainproject.server.playlist.entity.Likes;
import com.mainproject.server.playlist.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Long> {
    List<Likes> findByPlaylist(Playlist playlist);
}
