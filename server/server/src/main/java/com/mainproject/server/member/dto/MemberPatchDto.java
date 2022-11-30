package com.mainproject.server.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class MemberPatchDto {

    private String name;
    private String content;

}
