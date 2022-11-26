package com.mainproject.server.playlist.dto;

import com.mainproject.server.playlist.entity.Category;
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
public class LikePlaylistResponseDto {

    private long playlistId;

    private long memberId;

    private String name;

    private boolean status;

    private String title;

    private int like;

    private Boolean likeState;

    private Boolean bookmarkState;

    private List<PlaylistItemResponseDto> playlistItems;

    private List<String> category;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}
