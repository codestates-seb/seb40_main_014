package com.mainproject.server.auth.handler;

import com.mainproject.server.auth.utils.ErrorResponder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        try {
            if (request.getHeader("Authorization").startsWith("bearer")) {
                ErrorResponder.sendErrorResponse(response, HttpStatus.UNAUTHORIZED);
            } else {
                ErrorResponder.sendErrorResponse(response, HttpStatus.BAD_REQUEST);
            }
        } catch (NullPointerException e) {
            ErrorResponder.sendErrorResponse(response, HttpStatus.BAD_REQUEST);
        }
    }
}

// 토큰이 잘못됐을 때, 만료됐을 때
