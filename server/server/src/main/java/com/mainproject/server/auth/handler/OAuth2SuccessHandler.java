package com.mainproject.server.auth.handler;

import com.google.gson.Gson;
import com.mainproject.server.auth.utils.CustomAuthorityUtil;
import com.mainproject.server.member.dto.SimpleMemberResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.jwt.JwtTokenizer;
import com.mainproject.server.member.jwt.RefreshToken;
import com.mainproject.server.member.mapper.MemberMapper;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.member.repository.TokenRepository;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.response.SingleResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

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

@Transactional
@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final MemberMapper memberMapper;
    private final Gson gson;
    private final TokenRepository tokenRepository;
    private final CustomAuthorityUtil customAuthorityUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal();

        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        Member loginMember = memberRepository.findByEmail(email).get();
        List<GrantedAuthority> authorities = customAuthorityUtil.stringToGrantedAuthority(loginMember.getRole().toString());

        String accessToken = delegateAccessToken(email, authorities);
        String refreshToken = delegateRefreshToken(email, authorities);

        //RefreshToken 저장
        RefreshToken newRefreshToken = new RefreshToken();
        newRefreshToken.setRefreshToken(refreshToken);
        tokenRepository.save(newRefreshToken);

        response.setHeader("Authorization", "bearer"+accessToken);
        response.setHeader("RefreshToken", "bearer"+refreshToken);

        //헤더 추가
        response.addHeader("memberId", loginMember.getMemberId().toString());

        //출력용
        System.out.println("Authorization");
        System.out.println("bearer"+accessToken);

        setResponseBody(response, loginMember);

        redirect(request, response, email, authorities);
    }

    private void setResponseBody(HttpServletResponse response, Member loginMember) throws IOException{

        SimpleMemberResponseDto responseDto = memberMapper.memberToSimpleMemberResponseDto(loginMember);
        SingleResponseDto singleResponseDto = new SingleResponseDto(responseDto);
        String content = gson.toJson(singleResponseDto);
        response.getWriter().write(content);

    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<GrantedAuthority> authorities) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username, authorities);

        String uri = createURI(accessToken, refreshToken, username).toString();
        getRedirectStrategy().sendRedirect(request, response, uri);
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

    private URI createURI(String accessToken, String refreshToken, String email) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        String memberId = memberRepository.findByEmail(email).get().getMemberId().toString();
        queryParams.add("access_token", "bearer"+accessToken);
        queryParams.add("refresh_token", "bearer"+refreshToken);
        queryParams.add("member_id", memberId);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost")
//                .scheme("https")
//                .host("luvpli.link")
                .port(3000)
                .path("/loginCallback")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

}