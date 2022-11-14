package com.mainproject.server.playlist.entity;

import com.mainproject.server.auditable.Auditable;
import com.mainproject.server.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Playlist extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long playlistId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    //@ManyToOne
    //@JoinColumn(name = "room_id")
    //private Room room;

    @Column(nullable = false, updatable = true, unique = false)
    private String title;

    @Column(nullable = false, updatable = true, unique = false)
    private String content;

    @Enumerated(EnumType.STRING)
    private PlaylistStatus playlistStatus = PlaylistStatus.PLAYLIST_ACTIVE;

    //카테고리
    // private List<Category> categories = new ArrayList<>();

    public enum PlaylistStatus {
        PLAYLIST_ACTIVE("활성중"),
        PLAYLIST_INACTIVE("비활성중");

        @Getter
        private String status;

        PlaylistStatus(String status){
            this.status = status;
        }
    }
}
