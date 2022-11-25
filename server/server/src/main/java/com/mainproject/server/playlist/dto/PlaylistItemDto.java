package com.mainproject.server.playlist.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class PlaylistItemDto {

    @NotBlank(message = "영상을 추가하세요.")
    private String url;
    private String channelTitle;
    private String thumbnail;
    private String title;
    private String videoId;
}
