import Playlist from '../components/home/Playlist';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
	ButtonWrapper,
	H2,
	Info,
	InfoText,
	ListStyle,
	MainDefaultButton,
	MinHeightWrapper,
	SwiperStyle,
	Title,
} from './RoomList';
import {
	getPlaylists,
	getPlaylistsByDj,
	getPlaylistsByLike,
} from '../api/playlistApi';
import { useSelector } from 'react-redux';
import { musicInfoType } from './MakePlayList';
import { myLogin, myValue } from '../slices/mySlice';
import { SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import Loading from '../components/common/Loading';
import { AiFillInfoCircle } from 'react-icons/ai';

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
	const infoRef = useRef(null);
	const infoTextRef = useRef(null);

	const isLogin = useSelector(myLogin);
	const { memberId } = useSelector(myValue);

	const [isLoading, setLoading] = useState(true);
	const [playlists, setPlayLists] = useState<PlaylistInfoType[]>([]);
	const [palylistsByLike, setPlaylistsByLike] = useState<PlaylistInfoType[]>(
		[],
	);
	const [playliistsByDj, setPlaylistsByDj] = useState<PlaylistInfoType[]>([]);

	useEffect(() => {
		getPlaylistsByLike(1, 7)
			.then((res) => {
				setPlaylistsByLike(res.data);
			})
			.catch((err) => {
				console.log(err);
			});

		getPlaylistsByDj(1, 7)
			.then((res) => {
				// console.log('Room DJ res', res);
				setPlaylistsByDj(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	//* 무한 스크롤
	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	const fetch = useCallback(() => {
		setLoading(true);

		getPlaylists(currentPage.current, 6)
			.then((res) => {
				const data = res.data;
				const { page, totalPages } = res.pageInfo;
				setPlayLists((prevPlaylists) => [...prevPlaylists, ...data]);
				setHasNextPage(page !== totalPages);
				if (hasNextPage) currentPage.current += 1;

				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		if (!observerTargetEl.current || !hasNextPage) return;

		const io = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) fetch();
		});

		io.observe(observerTargetEl.current);

		return () => {
			io.disconnect();
		};
	}, [fetch, hasNextPage]);

	//* 인기 DJ 정보창 오픈
	const handleOpenInfoText = ({ target }) => {
		if (!infoRef.current) return;

		if (infoRef.current.contains(target)) {
			infoTextRef.current.style.display = 'block';
		} else {
			infoTextRef.current.style.display = 'none';
		}
	};

	useEffect(() => {
		window.addEventListener('mouseover', handleOpenInfoText);
		return () => {
			window.removeEventListener('mouseover', handleOpenInfoText);
		};
	});

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
						<MainDefaultButton fontSize="16px" width="105px" height="42px">
							플리 만들기
						</MainDefaultButton>
					</Link>
				</ButtonWrapper>
			)}
			<H2>가장 많은 좋아요를 받은 플레이리스트</H2>
			{palylistsByLike && (
				<SwiperStyle {...settings} onInit={onInit1}>
					{palylistsByLike.map((playlist: PlaylistInfoType) => {
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
			)}
			<Title>
				<H2>인기 DJ 플레이리스트</H2>
				<Info ref={infoRef}>
					<AiFillInfoCircle color="#a3a3a3" cursor="pointer" />
					<InfoText ref={infoTextRef}>
						인기 DJ는 랭킹을 기준으로 계산됩니다. (유저당 1개)
					</InfoText>
				</Info>
			</Title>
			{playliistsByDj && (
				<SwiperStyle {...settings} onInit={onInit2}>
					{playliistsByDj.map((playlist: PlaylistInfoType) => {
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
			)}
			<H2>전체</H2>
			<ListStyle>
				{playlists &&
					playlists.map((playlist: PlaylistInfoType) => {
						// 본인이 쓴 글
						if (playlist.memberId === memberId) {
							return <Playlist playList={playlist} key={playlist.playlistId} />;
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
					})}
				<div ref={observerTargetEl} />
			</ListStyle>
			{isLoading && <Loading />}
		</MinHeightWrapper>
	);
};

export default PlaylistList;
