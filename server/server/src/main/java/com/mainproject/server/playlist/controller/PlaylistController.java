package com.mainproject.server.playlist.controller;

import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.playlist.dto.PlaylistPatchDto;
import com.mainproject.server.playlist.dto.PlaylistPostDto;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.mapper.PlaylistMapper;
import com.mainproject.server.playlist.service.PlaylistService;
import com.mainproject.server.response.MultiResponseDto;
import com.mainproject.server.response.SingleResponseDto;
import com.mainproject.server.tx.NeedMemberId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/playlists")
@Validated
public class PlaylistController {
    private final PlaylistService playlistService;
    private final MemberService memberService;
    private final PlaylistMapper mapper;

    @NeedMemberId
    @PostMapping
    public ResponseEntity postPlaylist(@Valid @RequestBody PlaylistPostDto playlistPostDto, Long authMemberId) throws Exception {

        Member member = memberService.findMember(authMemberId);

        Playlist playlist = mapper.playlistPostDtoToPlaylist(playlistPostDto, member);
        Playlist savedPlaylist = playlistService.createPlaylist(playlist);


        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.playlistToPlaylistResponseDto(savedPlaylist)), HttpStatus.CREATED);
    }

    @NeedMemberId
    @PatchMapping("/{playlist-id}")
    public ResponseEntity patchPlaylist(@PathVariable("playlist-id") @Positive long playlistId,
                                        @Valid @RequestBody PlaylistPatchDto playlistPatchDto, Long authMemberId) {
        playlistPatchDto.setPlaylistId((playlistId));

        Member member = memberService.findMember(authMemberId);

        Playlist playlist = mapper.playlistPatchDtoToPlaylist(playlistPatchDto);
        Playlist savedPlaylist = playlistService.updatePlaylist(playlist);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.playlistToPlaylistResponseDto(savedPlaylist)), HttpStatus.OK);
    }

    //단일 플레이리스트 조회
    @GetMapping("/{playlist-id}")
    public ResponseEntity getPlaylist(@PathVariable("playlist-id") @Positive long playlistId) {
        Playlist playlist = playlistService.findPlaylist(playlistId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.playlistToPlaylistResponseDto(playlist)),HttpStatus.OK);
    }

    //전체 플레이리스트 조회
    @GetMapping
    public ResponseEntity getPlList(@Positive @RequestParam(required = false, defaultValue = "1") int page,
                                    @Positive @RequestParam(required = false, defaultValue = "10") int size) {
        Page<Playlist> pagePlList = playlistService.findPlList(page - 1, size);
        List<Playlist> playlists = pagePlList.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.playlistToPlaylistResponseDtoList(playlists), pagePlList), HttpStatus.OK);

    }


    @DeleteMapping("/{playlist-id}")
    public String deletePlaylist(@PathVariable("playlist-id") @Positive long playlistId) {

        playlistService.deletePlaylist(playlistId);

        return "success playlist deleted";
    }
}