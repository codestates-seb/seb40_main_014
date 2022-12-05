package com.mainproject.server.playlist.entity;

import com.mainproject.server.chatroom.entity.ChatRoom;
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

    @Column(nullable = false, updatable = true, unique = false)
    private String plTitle;

    @Column(nullable = false)
    private boolean status;

    @ElementCollection(fetch = FetchType.LAZY)
    @Column
    private List<String> categoryList;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.REMOVE)
    private List<Likes> likes  = new ArrayList<>();

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.REMOVE)
    private List<PlaylistItem> playlistItems = new ArrayList<>();

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.REMOVE)
    private List<Bookmark> bookmarks = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "room_id")
    private ChatRoom chatRoom;

    @Column
    private int likePlus = 0;


}