package com.mainproject.server.member.entity;

import com.mainproject.server.chatroom.entity.ChatRoom;
import com.mainproject.server.auditable.Auditable;
import com.mainproject.server.playlist.entity.Playlist;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends Auditable implements UserDetails {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long memberId;

    @Column
    private String email;

    @Column
    private String name;

    @Column
    private String pwd;

    @Column
    private String picture;

    @Column
    private String content;

    @Column
    private String grade = "SILVER";

//    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
//    private Ranking ranking;

    @Column
    private Integer ranking;

    @Enumerated(EnumType.STRING)
    @Column
    private Role role;

    @Builder
    public Member(Long memberId, String email, String name, String pwd, String picture, Role role, String content){
        this.memberId = memberId;
        this.email = email;
        this.name = name;
        this.pwd = pwd;
        this.picture = picture;
        this.role = role;
        this.content = content;
    }

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Playlist> playlists = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<ChatRoom> chatRooms = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch = FetchType.EAGER)
    private List<Follow> follows  = new ArrayList<>();

//    @OneToMany(mappedBy = "member")
//    private List<ChatMessage> messages  = new ArrayList<>();

//    public Member update(String name, String picture) {
//        this.name = name;
//        this.picture  = picture;
//
//        return this;
//    }

    public String getRoleKey() {
        return this.role.getKey();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//        List<GrantedAuthority> authorities = new SimpleGrantedAuthority("ROLE_"+this.getRole().toString());
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("ROLE_"+getRole());
        List<GrantedAuthority> authorities = List.of(simpleGrantedAuthority);

        return authorities;
    }

    @Override
    public String getPassword() {
        return this.getPwd();
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

