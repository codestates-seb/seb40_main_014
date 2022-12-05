package com.mainproject.server.member.dto;

import com.mainproject.server.member.entity.Role;
import com.mainproject.server.playlist.dto.SimplePlaylistResponseDto;
import com.mainproject.server.response.MultiResponseDto;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MemberResponseDto {

    private Long memberId;

    private String email;

    private String name;

    private String picture;

    private String grade;

    private Integer follow;

    private Boolean followState;

    private Integer rank;

    private Role role;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private MultiResponseDto<SimplePlaylistResponseDto> playlist;

    private String content;

}
