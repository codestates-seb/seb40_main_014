package com.mainproject.server.member.entity;

import com.mainproject.server.auditable.Auditable;
import com.mainproject.server.chatroom.entity.ChatRoom;
import com.mainproject.server.playlist.entity.Playlist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long memberId;

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String picture;

    @Column
    private String content;

    @Column
    private String grade = "SILVER";

    @Column
    private Integer ranking = 0;

    @Column
    private Integer score = 0;

    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    @Builder
    public Member(Long memberId, String email, String name, String picture, Role role, String content) {
        this.memberId = memberId;
        this.email = email;
        this.name = name;
        this.picture = picture;
        this.role = role;
        this.content = content;
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Playlist> playlists = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<ChatRoom> chatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    private List<Follow> follows = new ArrayList<>();

    public String getRoleKey() {
        return this.role.getKey();
    }
}

