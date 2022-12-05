package com.mainproject.server.playlist.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Likes {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long likeId;

    @Column // 팔로우 버튼을 누르는 MemberId
    private Long likeMemberId;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;

    public void addPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }
}
