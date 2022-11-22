package com.mainproject.server.playlist.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class PlaylistPatchDto {
    private long playlistId;

    private String title;

    private String videoId;

    private String category;

    private boolean status;

}