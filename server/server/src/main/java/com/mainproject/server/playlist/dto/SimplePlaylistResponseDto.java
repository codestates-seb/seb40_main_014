package com.mainproject.server.playlist.dto;

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
public class SimplePlaylistResponseDto {
    private long playlistId;

    private String title;

    private String videoId;

    private String category;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

}
