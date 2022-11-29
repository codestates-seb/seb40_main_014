package com.mainproject.server.playlist.entity;

import com.mainproject.server.auditable.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class PlaylistItem extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long playlistItemId;

    @Column(nullable = false)
    private String url;

    private String channelTitle;

    private String thumbnail;

    private String itemTitle;
    private String videoId;

    @ManyToOne
    @JoinColumn(name = "Playlist_id")
    private Playlist playlist;

//    public void addPlaylist(Playlist playlist) {
//        this.playlist = playlist;
//        if (!this.playlist.getPlaylistItems().contains(this)) {
//            this.playlist.getPlaylistItems().add(this);
//        }
//    }

}
