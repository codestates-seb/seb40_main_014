package com.mainproject.server.playlist.dto;


import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
public class PlaylistItemResponseDto {
    private String channelTitle;
    private String thumbnail;
    private String title;
    private String url;
    private String videoId;
}
