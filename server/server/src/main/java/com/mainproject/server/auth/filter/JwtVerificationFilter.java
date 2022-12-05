package com.mainproject.server.auth.filter;

import com.mainproject.server.auth.utils.CustomAuthorityUtil;
import com.mainproject.server.auth.utils.MemberIdAuthenticationToken;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.jwt.JwtTokenizer;
import com.mainproject.server.member.repository.MemberRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {

    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;
    private final CustomAuthorityUtil customAuthorityUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String accessToken = resolveAccessToken(request);

        Map<String, Object> claims = null;

        //토큰 검증단계
        try {
            Jws<Claims> getClaims = Jwts.parserBuilder()
                    .setSigningKey(jwtTokenizer.getSecretKeyFromPlainSecretKey())
                    .build()
                    .parseClaimsJws(accessToken);
            claims = getClaims.getBody();

            // 만료된 경우 다음 단계로 EntryPoint에서 Error Response
        } catch (ExpiredJwtException e){
        }

        // AccessToken 유효하다면 컨텍스트에 저장
        if (accessToken != null && jwtTokenizer.validateToken(accessToken)) {
            if ( jwtTokenizer.validateToken(accessToken) )
//                response.setHeader("Authorization", "bearer"+accessToken);
                setSecurityContext(claims);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("bearer");
    }

    private void setSecurityContext(Map<String, Object> claims) {

        String username = claims.get("email").toString();
        Member loginMember = memberRepository.findByEmail(username).get();
        Long memberId = loginMember.getMemberId();
        List<GrantedAuthority> authorities = customAuthorityUtil.stringToGrantedAuthority(loginMember.getRole().toString());

        MemberIdAuthenticationToken memberIdAuthenticationToken = new MemberIdAuthenticationToken(username, null, authorities, memberId);

//        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);

        SecurityContextHolder.getContext().setAuthentication(memberIdAuthenticationToken);
    }

    public String resolveAccessToken(HttpServletRequest request) {
        if (request.getHeader("Authorization") != null)
            return request.getHeader("Authorization").substring(6);
        return null;
    }

    public String resolveRefreshToken(HttpServletRequest request) {
        if (request.getHeader("RefreshToken") != null)
            return request.getHeader("RefreshToken").substring(6);
        return null;
    }
}

