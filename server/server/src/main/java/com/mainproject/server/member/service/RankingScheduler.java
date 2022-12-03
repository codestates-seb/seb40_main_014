package com.mainproject.server.member.service;

import com.mainproject.server.member.dto.RankResponseDto;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.entity.RankingList;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.member.repository.RankingListRepository;
import com.mainproject.server.playlist.entity.Playlist;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@EnableScheduling
@Component
public class RankingScheduler {
    private final MemberRepository memberRepository;
    private final FollowService followService;
    private final RankingListRepository rankingListRepository;

    @Transactional
//    @Scheduled(cron = "0 * * * * *") // 매분
    @Scheduled(cron = "0 0/3 * * * *") // 3분
//    @Scheduled(cron = "0 0 * * * *") // 정시
    public void scheduler(){
        List<Member> memberList = memberRepository.findAllByOrderByScoreDesc().stream()
                .limit(7)
                .collect(Collectors.toList());

        List<String> list = new ArrayList<>();
        List<Integer> followList = new ArrayList<>();
        List<Integer> likeList = new ArrayList<>();
        int index = 1;
        for (Member member : memberList) {
            System.out.println("Score = " + member.getName() + member.getScore());
            followService.getGrade(member);
            member.setRanking(index);
            memberRepository.save(member);
            list.add(member.getName());
            followList.add(member.getFollows().size());
            Integer memberLike = 0;
            if (member.getPlaylists().size() != 0) {
                for (Playlist playlist : member.getPlaylists()) {
                    memberLike += playlist.getLikePlus();
                }
                likeList.add(memberLike);
            }
            else {likeList.add(0);}
            index++;
        }

        if (rankingListRepository.existsById(1L)){
            RankingList rankingList = rankingListRepository.findById(1L).get();
            rankingList.setRankingNames(list);
            rankingList.setRankingFollows(followList);
            rankingList.setRankingLikes(likeList);
            rankingListRepository.save(rankingList);
        }
        else {
            RankingList rankingList = new RankingList(1L, list, followList, likeList);
            rankingListRepository.save(rankingList);
        }
        System.out.println("Ranking update");
    }

    public List<RankResponseDto> memberListToRankResponseDtoList(List<Member> memberList) {
        if ( memberList == null ) {
            return null;
        }

        List<RankResponseDto> list = new ArrayList<RankResponseDto>( memberList.size() );
        for (int i=0; i<memberList.size(); i++){
            RankResponseDto rankResponseDto = new RankResponseDto();
            rankResponseDto.setMemberId(memberList.get(i).getMemberId());
            rankResponseDto.setName(memberList.get(i).getName());
            rankResponseDto.setPicture(memberList.get(i).getPicture());
            rankResponseDto.setRank(i+1);
            rankResponseDto.setFollow(rankingListRepository.findById(1L).get().getRankingFollows().get(i));
            rankResponseDto.setLike(rankingListRepository.findById(1L).get().getRankingLikes().get(i));
            rankResponseDto.setContent(memberList.get(i).getContent());
            rankResponseDto.setScore(rankingListRepository.findById(1L).get().getRankingFollows().get(i)+
                    rankingListRepository.findById(1L).get().getRankingLikes().get(i));

            list.add(rankResponseDto);
        }

        return list;
    }
}
