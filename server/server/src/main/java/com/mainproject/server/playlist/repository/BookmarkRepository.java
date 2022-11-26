package com.mainproject.server.playlist.repository;

import com.mainproject.server.playlist.entity.Bookmark;
import com.mainproject.server.playlist.entity.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    List<Bookmark> findByPlaylist(Playlist playlist);
    List<Bookmark> findByBookmarkMemberId(Long bookmarkMemberId);
}
