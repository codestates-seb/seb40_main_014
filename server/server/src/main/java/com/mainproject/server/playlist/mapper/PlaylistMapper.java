package com.mainproject.server.playlist.mapper;

import com.mainproject.server.member.entity.Member;
import com.mainproject.server.playlist.dto.*;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.entity.PlaylistItem;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PlaylistMapper {

    List<PlaylistResponseDto> playlistToPlaylistResponseDtoList(List<Playlist> playlistList);

    List<SimplePlaylistResponseDto> playlistToSimplePlaylistResponseDtoList(List<Playlist> playlistList);

    default Playlist playlistPostDtoToPlaylist(PlaylistPostDto playlistPostDto, Member member) {
        if (playlistPostDto == null) {
            return null;
        } else {
            Playlist playlist = new Playlist();
            playlist.setTitle(playlistPostDto.getTitle());
//            playlist.setVideoId(playlistPostDto.getVideoId());
            List<PlaylistItem> playlistItems = playlistPostDto.getPlaylistItems().stream()
                    .map(playlistItemDto -> {
                        PlaylistItem playlistItem = new PlaylistItem();
                        playlistItem.setUrl(playlistItemDto.getUrl());
                        playlistItem.setChannelTitle(playlistItemDto.getChannelTitle());
                        playlistItem.setTitle(playlistItemDto.getTitle());
                        playlistItem.setThumbnail(playlistItemDto.getThumbnail());
                        playlistItem.setVideoId(playlistItemDto.getVideoId());
//                        playlistItem.addPlaylist(playlist);
                        return playlistItem;
                    }).collect(Collectors.toList());
            playlist.setMember(member);
            playlist.setPlaylistItems(playlistItems);

            return playlist;
        }
    }

    default Playlist playlistPatchDtoToPlaylist(PlaylistPatchDto playlistPatchDto) {
        if (playlistPatchDto == null) {
            return null;
        } else {
            Playlist playlist = new Playlist();
            playlist.setPlaylistId(playlistPatchDto.getPlaylistId());
            playlist.setTitle(playlistPatchDto.getTitle());
//            playlist.setVideoId(playlistPatchDto.getVideoId());
            return playlist;
        }
    }

    default PlaylistResponseDto playlistToPlaylistResponseDto(Playlist playlist) {
        if (playlist == null) {
            return null;
        } else {
            PlaylistResponseDto.PlaylistResponseDtoBuilder playlistResponseDto = PlaylistResponseDto.builder();
            List<PlaylistItem> playlistItems = playlist.getPlaylistItems();
            playlistResponseDto.playlistId(playlist.getPlaylistId());
            playlistResponseDto.title(playlist.getTitle());
//            playlistResponseDto.videoId(playlist.getVideoId());
            playlistResponseDto.createdAt(playlist.getCreatedAt());
            playlistResponseDto.modifiedAt(playlist.getModifiedAt());
            playlistResponseDto.memberId(playlist.getMember().getMemberId());
            playlistResponseDto.name(playlist.getMember().getName());
            playlistResponseDto.playlistItems(playlistItemsToPlaylistItemResponseDto(playlistItems));
            return playlistResponseDto.build();
        }
    }

    default List<PlaylistItemResponseDto> playlistItemsToPlaylistItemResponseDto(List<PlaylistItem> playlistItems) {
        return  playlistItems
                .stream()
                .map(playlistItem -> PlaylistItemResponseDto
                        .builder()
                        .url(playlistItem.getUrl())
                        .build())
                .collect(Collectors.toList());
    }
}
