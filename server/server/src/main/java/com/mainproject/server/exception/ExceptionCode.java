package com.mainproject.server.exception;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.Getter;
import lombok.Setter;
public enum ExceptionCode {

    NAME_ALREADY_EXISTS(402, "중복된 닉네임입니다."),
    MEMBER_NOT_EXISTS(404, "멤버가 존재하지 않습니다"),
    PLAYLIST_NOT_EXIST(404, "플레이리스트가 존재하지 않습니다."),
    Expired_Jwt(404, "만료된 토큰입니다"),
    TOKEN_NOT_AVAILABLE(401, "유효하지 않은 토큰입니다"),
    BAD_REQUEST(400, "잘못된 요청입니다."),
    ROOM_NOT_EXISTS(404, "채팅방이 존재하지 않습니다."),
    EMAIL_ALREADY_EXISTS(404, "중복된 이메일입니다.");

    @Getter
    private int status;
    @Getter
    private String message;
    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
