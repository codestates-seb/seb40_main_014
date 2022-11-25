import Playlist from '../components/home/Playlist';
import { useState, useEffect, useRef, useCallback } from 'react';
import { DefaultButton } from '../components/common/Button';
import { Link } from 'react-router-dom';
import { ButtonWrapper, H2, ListStyle, SwiperStyle } from './RoomList';
import { getPlaylists } from '../api/playlistApi';
import { useSelector } from 'react-redux';
import { musicInfoType } from './MakePlayList';
import { myLogin, myValue } from '../slices/mySlice';

// Import Swiper React components
import { SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';

export type PlaylistInfoType = {
	memberId: number;
	name: string;
	title: string;
	playlist: Array<musicInfoType>;
	categoryList: Array<string>;
	status: boolean;
	like: number;
	playListId: number;
};

const PlaylistList = () => {
	const { memberId } = useSelector(myValue);
	const isLogin = useSelector(myLogin);

	//* 무한 스크롤
	const [playlists, setPlayLists] = useState<PlaylistInfoType[]>([]);
	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	// real
	const fetch = useCallback(() => {
		// getPlaylists(memberId, currentPage.current, 10).then((res) => {
		// 	console.log('getPlaylists res', res);
		// 	const data = res.data;
		// 	const { page, totalPages } = res.pageInfo;
		// 	setPlayLists((prevPlaylists) => [...prevPlaylists, ...data]);
		// 	// setHasNextPage(data.length === 10);
		// 	setHasNextPage(page !== totalPages);
		// 	// if (data.length) currentPage.current += 1;
		// 	if (hasNextPage) currentPage.current += 1;
		// });
	}, []);

	// test
	useEffect(() => {
		getPlaylists(memberId, currentPage.current, 10).then((res) => {
			console.log('getPlaylists res', res);

			setPlayLists(res);
		});
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

	//* Swiper
	const settings = {
		modules: [Pagination, Navigation, Autoplay],
		slidesPerView: 2,
		spaceBetween: 1,
		navigation: true,
		pagination: { clickable: true },
		autoplay: { delay: 5000 },
		breakpoints: {
			641: {
				slidesPerView: 3,
				spaceBetween: 19,
			},
			981: {
				slidesPerView: 3,
				spaceBetween: 44,
			},
		},
	};

	return (
		<>
			{isLogin && (
				<ButtonWrapper>
					<Link to="/makeplaylist/create">
						<DefaultButton fontSize="16px" width="105px" height="42px">
							플리 만들기
						</DefaultButton>
					</Link>
				</ButtonWrapper>
			)}
			<H2>가장 많은 좋아요를 받은 플레이리스트</H2>
			{playlists.length ? (
				<SwiperStyle {...settings}>
					{playlists.map((playlist: PlaylistInfoType) => (
						<SwiperSlide key={playlist.name}>
							<Playlist playList={playlist} key={playlist.playListId} swiper />
						</SwiperSlide>
					))}
				</SwiperStyle>
			) : null}
			<H2>인기 DJ 플레이리스트</H2>
			{playlists.length ? (
				<SwiperStyle {...settings}>
					{playlists.map((playlist: PlaylistInfoType) => (
						<SwiperSlide key={playlist.name}>
							<Playlist playList={playlist} key={playlist.playListId} swiper />
						</SwiperSlide>
					))}
				</SwiperStyle>
			) : null}
			<H2>전체</H2>
			<ListStyle>
				{playlists.length
					? playlists.map((playlist: PlaylistInfoType) => (
							<Playlist playList={playlist} key={playlist.playListId} />
					  ))
					: null}
				<div ref={observerTargetEl} />
			</ListStyle>
		</>
	);
};

export default PlaylistList;
