package com.mainproject.server.member.repository;

import com.mainproject.server.member.jwt.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByRefreshToken(String token);
    boolean existsByRefreshToken(String token);
}
