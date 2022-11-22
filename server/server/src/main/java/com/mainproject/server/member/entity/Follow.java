package com.mainproject.server.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Follow {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long followId;

    @Column // 팔로우 버튼을 누르는 Member
    private Long followerId;
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void addMember(Member member) {
        this.member = member;
    }

}
