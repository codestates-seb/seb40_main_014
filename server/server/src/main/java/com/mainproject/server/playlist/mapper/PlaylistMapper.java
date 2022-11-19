package com.mainproject.server.playlist.mapper;

import com.mainproject.server.playlist.dto.PlaylistPatchDto;
import com.mainproject.server.playlist.dto.PlaylistPostDto;
import com.mainproject.server.playlist.dto.PlaylistResponseDto;
import com.mainproject.server.playlist.entity.Playlist;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlaylistMapper {

    List<PlaylistResponseDto> playlistToPlaylistResponseDtoList(List<Playlist> playlistList);

    default Playlist playlistPostDtoToPlaylist(PlaylistPostDto playlistPostDto) {
        if (playlistPostDto == null) {
            return null;
        } else {
            Playlist playlist = new Playlist();
            playlist.setTitle(playlistPostDto.getTitle());
            playlist.setVideoId(playlistPostDto.getVideoId());
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
            playlist.setVideoId(playlistPatchDto.getVideoId());
            return playlist;
        }
    }

    default PlaylistResponseDto playlistToPlaylistResponseDto(Playlist playlist) {
        if (playlist == null) {
            return null;
        } else {
            PlaylistResponseDto.PlaylistResponseDtoBuilder playlistResponseDto = PlaylistResponseDto.builder();
            playlistResponseDto.playlistId(playlist.getPlaylistId());
            playlistResponseDto.title(playlist.getTitle());
            playlistResponseDto.videoId(playlist.getVideoId());
            playlistResponseDto.createdAt(playlist.getCreatedAt());
            playlistResponseDto.modifiedAt(playlist.getModifiedAt());
            return playlistResponseDto.build();
        }
    }
}