package com.mainproject.server.member.repository;

import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.entity.RankingList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RankingListRepository extends JpaRepository<RankingList, Long> {

    Optional<RankingList> findById(Long rankingListId);
    boolean existsById(Long rankingListId);
}
