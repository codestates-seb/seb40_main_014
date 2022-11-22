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

    private long memberId;

    private String name;

    private String title;

    private String videoId;

    private  List<Category> categoryList;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private String thumbnail;

//    private boolean status;

//    private List<PlaylistResponseDto> playlistList;

}