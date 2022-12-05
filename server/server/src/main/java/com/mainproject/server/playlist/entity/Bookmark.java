package com.mainproject.server.playlist.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Bookmark {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long bookmarkId;

    @Column // 북마크 버튼을 누르는 MemberId
    private Long bookmarkMemberId;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;

    public void addPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }
}
