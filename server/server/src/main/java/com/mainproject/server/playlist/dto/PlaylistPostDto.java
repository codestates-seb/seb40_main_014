package com.mainproject.server.playlist.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class PlaylistPostDto {

    @NotBlank(message = "제목을 입력하세요.")
    private String title;

    private List<PlaylistItemDto> playlistItems;

    private List<String> categoryList;

    private boolean status;
}