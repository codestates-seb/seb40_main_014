import Playlist from '../components/home/Playlist';
import { useState, useEffect, useRef, useCallback } from 'react';
import { DefaultButton } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { ButtonWrapper, H2, ListStyle } from './RoomList';
import { getPlaylists } from '../api/playlistApi';
import { useSelector } from 'react-redux';
import { myValue } from '../slices/mySlice';
import { musicInfoType } from './MakePlayList';

export type PlaylistInfoType = {
	memberId: string;
	title: string;
	playlist: Array<musicInfoType>;
	categoryList: Array<string>;
	status: boolean;
	like: number;
	playListId: number;
};

function PlaylistList() {
	const { memberId } = useSelector(myValue);

	//* 무한 스크롤
	const [playlists, setPlayLists] = useState<PlaylistInfoType[]>([]);
	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	const fetch = useCallback(() => {
		() => {
			getPlaylists(memberId, currentPage.current, 10).then((res) => {
				const data = res.data;
				const { page, totalPages } = res.pageInfo;

				setPlayLists([...playlists, ...data]);
				// setHasNextPage(data.length === 10);
				setHasNextPage(page !== totalPages);

				// if (data.length) currentPage.current += 1;
				if (hasNextPage) currentPage.current += 1;
			});
		};
	}, []);

	useEffect(() => {
		if (!observerTargetEl.current || !hasNextPage) return;

		const io = new IntersectionObserver((entries, observer) => {
			if (entries[0].isIntersecting) fetch();
		});

		io.observe(observerTargetEl.current);

		return () => {
			io.disconnect();
		};
	}, [fetch, hasNextPage]);

	return (
		<>
			<ButtonWrapper>
				<Link to="/makeplaylist/create">
					<DefaultButton fontSize="16px" width="105px" height="42px">
						플리 만들기
					</DefaultButton>
				</Link>
			</ButtonWrapper>
			<H2>플레이리스트 Top 8</H2>
			<H2>최신 플레이리스트</H2>
			<ListStyle>
				{/* {playlists.length
					? playlists.map((playlist: PlaylistInfoType) => (
							<Playlist playList={playlist} key={playlist.playListId} />
					  ))
					: null} */}
				{playlists.map((playlist: PlaylistInfoType) => (
					<Playlist playlist={playlist} key={playlist.playlistId} />
				))}
				<div ref={observerTargetEl} />
			</ListStyle>
		</>
	);
}

export default PlaylistList;
