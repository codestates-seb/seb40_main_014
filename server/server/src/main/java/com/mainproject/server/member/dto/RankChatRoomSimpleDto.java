package com.mainproject.server.member.dto;

import com.mainproject.server.member.entity.Role;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RankChatRoomSimpleDto {
    private Long memberId;

    private String email;

    private String name;

    private String picture;

    private String grade;

    private Integer follow;

    private Role role;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private String content;
}
