package com.mainproject.server.playlist.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
@Setter
public class PlaylistPostDto {

    @NotBlank(message = "제목을 입력하세요.")
    private String title;

    private List<PlaylistItemDto> playlistItems;

    private String category;

    private boolean status;
}