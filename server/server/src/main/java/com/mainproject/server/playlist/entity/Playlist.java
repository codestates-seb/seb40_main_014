package com.mainproject.server.playlist.entity;

import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.auditable.Auditable;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.playlist.dto.PlaylistItemResponseDto;
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

    @Column(nullable = false, updatable = true, unique = false)
    private String title;

    @Column(nullable = false)
    private boolean status;

//    @Column(nullable = false, updatable = true, unique = false)
//    private String videoId;

    @OneToMany(mappedBy = "playlist")
    private List<Category> categoryList = new ArrayList<>();

    @OneToMany(mappedBy = "playlist")
    private List<PlaylistItem> playlistItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;


//    @Enumerated(EnumType.STRING)
//    private PlaylistStatus playlistStatus = PlaylistStatus.PLAYLIST_ACTIVE;


//    public enum PlaylistStatus {
//        PLAYLIST_ACTIVE("활성중"),
//        PLAYLIST_INACTIVE("비활성중");
//

//    }
}