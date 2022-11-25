package com.mainproject.server.playlist.repository;

import com.mainproject.server.playlist.entity.PlaylistItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface playlistItemRepository extends JpaRepository<PlaylistItem, Long> {
}
