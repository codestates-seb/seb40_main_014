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
            playlist.setMember(member);

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
                        .channelTitle(playlistItem.getChannelTitle())
                        .thumbnail(playlistItem.getThumbnail())
                        .videoId(playlistItem.getVideoId())
                        .title(playlistItem.getTitle())
                        .build())
                .collect(Collectors.toList());
    }
}
