package com.mainproject.server.playlist.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long categoryId;

    @Column
    private String category;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;
}