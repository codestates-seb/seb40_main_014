package com.mainproject.server.member.jwt;

import com.mainproject.server.member.repository.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtTokenizer {
    @Getter
    @Value("${jwt.secret.key}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    private final TokenRepository tokenRepository;

//    public String encodeBase64SecretKey(String secretKey) {
//        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
//    }

    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      Key secretkey) {;

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(secretkey)
                .compact();
    }

    public String generateRefreshToken(String subject,
                                       Date expiration,
                                       Key secretkey) {

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(secretkey)
                .compact();
    }

    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

//    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
//        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
//        Key key = Keys.hmacShaKeyFor(keyBytes);
//
//        return key;
//    }

    public String getUserEmail(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    // 토큰의 유효성 + 만료일자 확인
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (ExpiredJwtException e) {
            log.info(e.getMessage());
            return false;
        }
    }

    // RefreshToken 존재유무 확인
    public boolean existsRefreshToken(String refreshToken) {
        return tokenRepository.existsByRefreshToken(refreshToken);
    }

    public Map<String, Object> verifyJws(String jws) {
        Jws<Claims> jwsClaims = getClaims(jws);
        Map<String, Object> claims = jwsClaims.getBody();
        return claims;
    }

    public Key getSecretKeyFromPlainSecretKey() {


        byte[] bytes = secretKey.getBytes();
        SecretKey key = Keys.hmacShaKeyFor(bytes);
        return key;
    }

    public Jws<Claims> getClaims(String jws) {

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(getSecretKeyFromPlainSecretKey())
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

}
