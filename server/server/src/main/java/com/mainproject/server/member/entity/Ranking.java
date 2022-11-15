package com.mainproject.server.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Ranking {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long rankId;

    @Column
    private Integer rank = 0;

    @OneToOne(mappedBy = "ranking", cascade = CascadeType.ALL)
    private Member member;
}
