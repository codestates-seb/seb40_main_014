package com.mainproject.server.playlist.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class PlaylistPostDto {

    @NotBlank(message = "제목을 입력하세요.")
    private String title;

    @NotBlank(message = "영상을 추가하세요.")
    private String videoId;

    private String category;

    //공개, 비공개 미구현
}