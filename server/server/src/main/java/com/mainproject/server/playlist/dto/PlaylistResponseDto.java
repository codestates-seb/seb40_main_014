package com.mainproject.server.playlist.dto;

import com.mainproject.server.playlist.entity.Category;
import com.mainproject.server.playlist.entity.Playlist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Builder
public class PlaylistResponseDto {
    private long playlistId;

    private String name;

    private String title;

    private String videoId;

    private  List<Category> categoryList;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private String thumbnail;

//    private List<PlaylistResponseDto> playlistList;


//    @Builder -> 이거 쓸거면 위에 Builder 빼야 함
//    public PlaylistResponseDto(Playlist playlist) {
//        this.playlistId = playlist.getPlaylistId();
//        this.name = playlist.getTitle();
//        this.thumbnail = playlist.getThumbnail();
//        this.title = playlist.getTitle();
//        this.videoId = playlist.getVideoId();
//        this.categoryList = playlist.getCategoryList();
//        this.createdAt = playlist.getCreatedAt();
//        this.modifiedAt = playlist.getModifiedAt();
//    }
}