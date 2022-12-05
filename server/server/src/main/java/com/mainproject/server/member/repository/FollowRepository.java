package com.mainproject.server.member.repository;

import com.mainproject.server.member.entity.Follow;
import com.mainproject.server.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByMember(Member member);
    List<Follow> findByFollowerId(Long followerId);

}
