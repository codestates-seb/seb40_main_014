package com.mainproject.server.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class MemberPostDto {

    @NotBlank
    private Long memberId;
}
