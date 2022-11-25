package com.mainproject.server.member.dto;

import com.mainproject.server.member.entity.Role;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RankResponseDto {

    private String name;

    private String picture;

    private Integer follow;

    private Integer rank;

    private Integer like;
}
