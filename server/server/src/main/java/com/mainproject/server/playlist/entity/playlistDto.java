package com.mainproject.server.playlist.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class playlistDto {
    @Getter
    @Setter
    @AllArgsConstructor
    public static class myPage {
        private long playlistId;
        private String title;
        private String content;
    }
}
