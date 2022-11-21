package com.mainproject.server.roomMember.entity;

import com.mainproject.server.ChatRoom.entity.ChatRoom;
import com.mainproject.server.auditable.Auditable;
import com.mainproject.server.member.entity.Member;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class roomMember extends Auditable {
    @Id
    private String roomMemberid;

    @ManyToOne
    @JoinColumn(name = "chatRoom_id")
    private ChatRoom chatRoom;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
