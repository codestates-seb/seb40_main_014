import Playlist from '../components/home/Playlist';
import { useState, useEffect, useRef, useCallback, Ref } from 'react';
import { DefaultButton } from '../components/common/Button';
import { Link } from 'react-router-dom';
import {
	ButtonWrapper,
	H2,
	ListStyle,
	MinHeightWrapper,
	SwiperStyle,
} from './RoomList';
import { getPlaylists } from '../api/playlistApi';
import { useSelector } from 'react-redux';
import { musicInfoType } from './MakePlayList';
import { myLogin, myValue } from '../slices/mySlice';

// Import Swiper React components
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';

export type PlaylistInfoType = {
	memberId: number;
	name: string;
	title: string;
	playlistItems: Array<musicInfoType>;
	categoryList: Array<string>;
	status: boolean;
	like: number;
	playlistId: number;
	likeState?: boolean;
	bookmarkState?: boolean;
};

const PlaylistList = () => {
	const isLogin = useSelector(myLogin);
	const { memberId } = useSelector(myValue);

	//* 무한 스크롤
	const [playlists, setPlayLists] = useState<PlaylistInfoType[]>([]);
	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	const fetch = useCallback(() => {
		getPlaylists(currentPage.current, 6).then((res) => {
			console.log('getPlaylists res', res);
			const data = res.data;
			const { page, totalPages } = res.pageInfo;
			setPlayLists((prevPlaylists) => [...prevPlaylists, ...data]);
			setHasNextPage(page !== totalPages);
			if (hasNextPage) currentPage.current += 1;
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
		autoplay: { delay: 5000, disableOnInteraction: false },
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

	const swiperRef1 = useRef<SwiperCore>();
	const onInit1 = (Swiper: SwiperCore): void => {
		swiperRef1.current = Swiper;
	};
	const swiperRef2 = useRef<SwiperCore>();
	const onInit2 = (Swiper: SwiperCore): void => {
		swiperRef2.current = Swiper;
	};
	const handleMouseEnter = (ref) => {
		if (ref) {
			if (ref.current) ref.current.autoplay.stop();
		}
	};
	const handleMouseLeave = (ref) => {
		if (ref.current) ref.current.autoplay.start();
	};

	return (
		<MinHeightWrapper>
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
				<SwiperStyle {...settings} onInit={onInit1}>
					{playlists.map((playlist: PlaylistInfoType) => {
						// 본인이 쓴 글
						if (playlist.memberId === memberId) {
							return (
								<SwiperSlide
									key={playlist.playlistId}
									onMouseEnter={() => handleMouseEnter(swiperRef1)}
									onMouseLeave={() => handleMouseLeave(swiperRef1)}>
									<Playlist
										playList={playlist}
										key={playlist.playlistId}
										swiper
									/>
								</SwiperSlide>
							);
						}
						//  남이 쓴 글
						else {
							// 비공개는 보여주지 않는다.
							if (playlist.status) {
								return (
									<SwiperSlide
										key={playlist.playlistId}
										onMouseEnter={() => handleMouseEnter(swiperRef1)}
										onMouseLeave={() => handleMouseLeave(swiperRef1)}>
										<Playlist
											playList={playlist}
											key={playlist.playlistId}
											swiper
										/>
									</SwiperSlide>
								);
							}
						}
					})}
				</SwiperStyle>
			) : null}
			<H2>인기 DJ 플레이리스트</H2>
			{playlists.length ? (
				<SwiperStyle {...settings} onInit={onInit2}>
					{playlists.map((playlist: PlaylistInfoType) => {
						// 본인이 쓴 글
						if (playlist.memberId === memberId) {
							return (
								<SwiperSlide
									key={playlist.playlistId}
									onMouseEnter={() => handleMouseEnter(swiperRef2)}
									onMouseLeave={() => handleMouseLeave(swiperRef2)}>
									<Playlist
										playList={playlist}
										key={playlist.playlistId}
										swiper
									/>
								</SwiperSlide>
							);
						}
						//  남이 쓴 글
						else {
							// 비공개는 보여주지 않는다.
							if (playlist.status) {
								return (
									<SwiperSlide
										key={playlist.playlistId}
										onMouseEnter={() => handleMouseEnter(swiperRef2)}
										onMouseLeave={() => handleMouseLeave(swiperRef2)}>
										<Playlist
											playList={playlist}
											key={playlist.playlistId}
											swiper
										/>
									</SwiperSlide>
								);
							}
						}
					})}
				</SwiperStyle>
			) : null}
			<H2>전체</H2>
			<ListStyle>
				{playlists.length
					? playlists.map((playlist: PlaylistInfoType) => {
							// 본인이 쓴 글
							if (playlist.memberId === memberId) {
								return (
									<Playlist playList={playlist} key={playlist.playlistId} />
								);
							}
							//  남이 쓴 글
							else {
								// 비공개는 보여주지 않는다.
								if (playlist.status) {
									return (
										<Playlist playList={playlist} key={playlist.playlistId} />
									);
								}
							}
					  })
					: null}
				<div ref={observerTargetEl} />
			</ListStyle>
		</MinHeightWrapper>
	);
};

export default PlaylistList;
