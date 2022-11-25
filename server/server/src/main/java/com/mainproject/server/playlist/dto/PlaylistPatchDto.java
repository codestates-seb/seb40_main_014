package com.mainproject.server.playlist.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlaylistPatchDto {
    private long playlistId;

    private String title;

    private String category;

    private boolean status;

}