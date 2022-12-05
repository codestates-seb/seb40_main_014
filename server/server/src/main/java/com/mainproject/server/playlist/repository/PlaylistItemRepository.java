package com.mainproject.server.playlist.repository;

import com.mainproject.server.playlist.entity.PlaylistItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistItemRepository extends JpaRepository<PlaylistItem, Long> {
}
