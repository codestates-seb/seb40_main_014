package com.mainproject.server.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.mainproject.server.auth.utils.CustomAuthorityUtil;
import com.mainproject.server.member.dto.LoginDto;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.jwt.JwtTokenizer;
import com.mainproject.server.member.jwt.RefreshToken;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.member.repository.TokenRepository;
import com.mainproject.server.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final MemberMapper memberMapper;
    private final MemberRepository memberRepository;
    private final Gson gson;
    private final CustomAuthorityUtil customAuthorityUtil;
    private final TokenRepository tokenRepository;

    //검증이 되지 않은 Authentication을 만들어서 AuthenticationManager에게 넘기고, 리턴으로 검증이 된 Authentication을 넘긴다.
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        ObjectMapper objectMapper = new ObjectMapper();

        LoginDto loginDto;
        try {
            loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        //JWT 토큰 발행 해야함
        Member authenticatedMember = (Member) authResult.getPrincipal();
        String email = authenticatedMember.getEmail();
        List<GrantedAuthority> authorities = customAuthorityUtil.stringToGrantedAuthority("USER");
        String accessToken = delegateAccessToken(email, authorities);
        String refreshToken = delegateRefreshToken(email, authorities);

        //RefreshToken 저장
        RefreshToken newRefreshToken = new RefreshToken();
        newRefreshToken.setRefreshToken(refreshToken);
        tokenRepository.save(newRefreshToken);

        response.setHeader("Authorization", "bearer"+accessToken);
        response.setHeader("RefreshToken", "bearer"+refreshToken);

        //헤더 추가
        response.addHeader("memberId", authenticatedMember.getMemberId().toString());

        //출력용
        System.out.println("Authorization");
        System.out.println("bearer"+accessToken);

        setResponseBody(response, authenticatedMember);
    }


    private void setResponseBody(HttpServletResponse response, Member loginMember) throws IOException {

        SimpleMemberResponseDto responseDto = memberMapper.memberToSimpleMemberResponseDto(loginMember);
        SingleResponseDto singleResponseDto = new SingleResponseDto(responseDto);
        String content = gson.toJson(singleResponseDto);
        response.getWriter().write(content);

    }

    private String delegateAccessToken(String email, List<GrantedAuthority> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("roles", authorities);

        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        Key secretKey = jwtTokenizer.getSecretKeyFromPlainSecretKey();

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, secretKey);

        return accessToken;
    }

    private String delegateRefreshToken(String email, List<GrantedAuthority> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("roles", authorities);

        String subject = email;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        Key secretKey = jwtTokenizer.getSecretKeyFromPlainSecretKey();

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, secretKey);

        return refreshToken;
    }
}
