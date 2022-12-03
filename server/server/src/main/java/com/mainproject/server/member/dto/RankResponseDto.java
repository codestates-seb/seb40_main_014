package com.mainproject.server.member.dto;

import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RankResponseDto {

    private Long memberId;

    private String name;

    private String picture;

    private Integer follow;

    private Integer rank;

    private Integer like;

    private Integer score;

    private String content;

    private LocalDateTime modifiedAt;
}
