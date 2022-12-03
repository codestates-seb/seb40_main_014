package com.mainproject.server.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class RankingList {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long rankingListId;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<String> rankingNames;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<Integer> rankingFollows;

    @ElementCollection(fetch = FetchType.LAZY)
    private List<Integer> rankingLikes;

    @Column
    private LocalDateTime modifiedAt;
}
