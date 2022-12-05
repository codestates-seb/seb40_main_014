package com.mainproject.server.exception;

import lombok.Getter;

public class BusinessException extends RuntimeException{

    @Getter
    private ExceptionCode exceptionCode;

    public BusinessException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }
}
