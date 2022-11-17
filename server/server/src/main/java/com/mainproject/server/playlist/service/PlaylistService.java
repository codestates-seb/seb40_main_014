package com.mainproject.server.playlist.service;

import com.mainproject.server.exception.BusinessException;
import com.mainproject.server.exception.ExceptionCode;
import com.mainproject.server.member.entity.Member;
import com.mainproject.server.member.repository.MemberRepository;
import com.mainproject.server.member.service.MemberService;
import com.mainproject.server.playlist.entity.Playlist;
import com.mainproject.server.playlist.repository.PlaylistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlaylistService {

    private final PlaylistRepository playlistRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    // 플리 생성
    public Playlist createPlaylist(Playlist playlist) {
//        verifyMember(member);
//        playlist.setMember(member);

        return playlistRepository.save(playlist);
    }

    //플리 수정
    public Playlist updatePlaylist(Playlist playlist) {
        Playlist findPlaylist = verifiedPlaylist(playlist.getPlaylistId()); //수정할 플리가 있는지 검증

        Optional.ofNullable(playlist.getTitle()) //제목수정
                .ifPresent(title -> findPlaylist.setTitle(title));
        Optional.ofNullable(playlist.getVideoId()) //영상수정
                .ifPresent(videoId -> findPlaylist.setVideoId(videoId));
        Optional.ofNullable(playlist.getCategoryList()) //카테고리 수정
                .ifPresent(categories -> findPlaylist.setCategoryList(categories));

        findPlaylist.setModifiedAt(LocalDateTime.now());

        return playlistRepository.save(findPlaylist);
    }

    //단일 조회
    public Playlist findPlaylist(long playlistId) {

        return verifiedPlaylist(playlistId);
    }

    //전체 조회




    //플리 삭제
    public void deletePlaylist(long playlistId) {
        Playlist findPlaylist = verifiedPlaylist(playlistId);

        playlistRepository.delete(findPlaylist);
    }

    //존재하는 플리인지 검증
    private Playlist verifiedPlaylist(long playlistId) {
        Playlist findPlaylist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new BusinessException(ExceptionCode.PLAYLIST_NOT_EXIST));

        return findPlaylist;
    }

    //존재하는 회원인지 검증
//    private void verifyMember(Playlist playlist) {
//        memberService.verifyExistsMember(playlist.getMember().getMemberId());
//                throw new BusinessException(ExceptionCode.MEMBER_NOT_EXISTS);
//    }
}
