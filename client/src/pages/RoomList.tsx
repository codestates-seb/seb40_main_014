import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	deleteRoom,
	getRooms,
	getRoomsByDj,
	getRoomsByView,
} from '../api/roomApi';
import { DefaultButton } from '../components/common/Button';
import Room from '../components/home/Room';
import CreateModal from '../components/room/createModal';
import { myLogin } from '../slices/mySlice';
import { PlaylistInfoType } from './PlaylistList';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export type RoomInfoType = {
	maxCount: number;
	rankChatRoomSimpleDto?: HostType;
	memberResponseDto?: HostType;
	playlistResponseDto: PlaylistInfoType;
	pwd: string;
	roomId: string;
	secreat: boolean;
	title: string;
	userCount: number;
	userlist: any;
};

export type HostType = {
	createdAt: string;
	email: string;
	follow: number;
	grade: string;
	memberId: number;
	modifiedAt: string;
	name: string;
	picture: string;
	rank: number;
	role: string;
};

const RoomList = () => {
	const isLogin = useSelector(myLogin);

	const [rooms, setRooms] = useState<RoomInfoType[]>([]);
	const [roomsByView, setRoomsByView] = useState<RoomInfoType[]>([]);
	const [roomsByDj, setRoomsByDj] = useState<RoomInfoType[]>([]);

	useEffect(() => {
		getRoomsByView(1, 7)
			.then((res) => {
				return res.data.filter((e) => {
					if (!e.playlistResponseDto) {
						deleteRoom(e.roomId);
					}
					return e.playlistResponseDto !== null;
				});
			})
			.then((data) => {
				console.log('getRoomsByView res', data);
				setRoomsByView(data);
			});

		getRoomsByDj(1, 7)
			.then((res) => {
				return res.data.filter((e) => {
					if (!e.playlistResponseDto) {
						deleteRoom(e.roomId);
					}
					return e.playlistResponseDto !== null;
				});
			})
			.then((data) => {
				console.log('getRoomsByViewDj res', data);
				setRoomsByDj(data);
			});

		// getRoomsByView(1, 7).then((res) => {
		// 	console.log('rooms by view res', res.data);
		// 	setRoomsByView(res.data);
		// });
		// getRoomsByDj(1, 7).then((res) => {
		// 	console.log('rooms by dj res', res);
		// 	setRoomsByDj(res.data);
		// });
	}, []);

	//* 무한 스크롤
	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	const fetch = useCallback(() => {
		getRooms(currentPage.current, 6)
			.then((res) => {
				const filterData = res.data.filter((e) => {
					if (!e.playlistResponseDto) {
						deleteRoom(e.roomId);
					}
					return e.playlistResponseDto !== null;
				});

				return { data: filterData, pageInfo: res.pageInfo };
			})
			.then((res) => {
				console.log('getRooms res', res);
				const data = res.data;
				const { page, totalPages } = res.pageInfo;
				setRooms((prevRooms) => [...prevRooms, ...data]);
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

	//* 방 만들기 모달
	const [modalOpen, setModalOpen] = useState(false);

	const modalClose = () => {
		setModalOpen(!modalOpen);
	};

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
					<DefaultButton
						fontSize="16px"
						width="105px"
						height="42px"
						onClick={modalClose}>
						방 만들기
					</DefaultButton>
					{modalOpen && (
						<CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
					)}
				</ButtonWrapper>
			)}
			<H2>가장 많은 청취자가 있는 방송</H2>
			{roomsByView.length ? (
				<SwiperStyle {...settings} onInit={onInit1}>
					{roomsByView.map((room: RoomInfoType) => (
						<SwiperSlide
							key={room.roomId}
							onMouseEnter={() => handleMouseEnter(swiperRef1)}
							onMouseLeave={() => handleMouseLeave(swiperRef1)}>
							<Room room={room} key={room.roomId} swiper />
						</SwiperSlide>
					))}
				</SwiperStyle>
			) : null}
			<H2>인기 DJ 방송</H2>
			{roomsByDj.length ? (
				<SwiperStyle {...settings} onInit={onInit2}>
					{roomsByDj.map((room: RoomInfoType) => (
						<SwiperSlide
							key={room.roomId}
							onMouseEnter={() => handleMouseEnter(swiperRef2)}
							onMouseLeave={() => handleMouseLeave(swiperRef2)}>
							<Room room={room} key={room.roomId} swiper />
						</SwiperSlide>
					))}
				</SwiperStyle>
			) : null}
			<H2>전체</H2>
			<ListStyle>
				{rooms.length
					? rooms.map((room: RoomInfoType) => (
							<Room room={room} key={room.roomId} />
					  ))
					: null}
				<div ref={observerTargetEl} />
			</ListStyle>
		</MinHeightWrapper>
	);
};

export default RoomList;

export const MinHeightWrapper = styled.div`
	min-height: calc(100vh - 74px - 120px - 234px);

	// Tablet
	@media screen and (max-width: 980px) {
		min-height: calc(100vh - 72.406px - 120px - 234px);
	}
	// Mobile
	@media screen and (max-width: 640px) {
		min-height: calc(100vh - 72.406px - 120px - 212px);
	}
`;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 40px;
`;

export const H2 = styled.h2`
	margin-bottom: 30px;
	font-size: 22px;
	font-weight: 500;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 18px;
	}
`;

export const SwiperStyle = styled(Swiper)`
	padding: 0 50px !important;
	margin-bottom: 30px;

	> div > div {
		display: flex;
		justify-content: center;
	}

	.swiper-button-prev,
	.swiper-button-next {
		color: ${(props) => props.theme.colors.purple};
	}
	.swiper-button-prev {
		left: 0;
	}
	.swiper-button-next {
		right: 0;
	}
	.swiper-button-prev:after,
	.swiper-button-next:after {
		font-size: 28px;
		font-weight: 900;

		// Tablet, Mobile
		@media screen and (max-width: 980px) {
			font-size: 20px;
		}
	}

	.swiper-button-disabled {
		color: #4d0bd1be;
	}

	.swiper-pagination-bullet {
		background-color: ${(props) => props.theme.colors.gray600};
	}
	.swiper-pagination-bullet-active {
		background-color: ${(props) => props.theme.colors.purple};
	}

	// Tablet, Mobile
	@media screen and (max-width: 980px) {
		padding: 0 25px !important;
	}
`;

export const PrevButton = styled.button`
	position: absolute;
	top: 50%;
	left: 10px;
	color: ${(props) => props.theme.colors.purple};
	font-size: 24px;
`;

export const NextButton = styled.button`
	position: absolute;
	top: 50%;
	right: 10px;
	color: ${(props) => props.theme.colors.purple};
	font-size: 24px;
`;

export const ListStyle = styled.div`
	display: flex;
	flex-wrap: wrap;
	z-index: 1111;

	> div:not(:nth-of-type(3n)) {
		margin-right: calc((100vw - 30vw) * 0.04);
	}
	> div:nth-of-type(3n) {
		margin-right: 0;
	}

	// Tablet
	@media screen and (max-width: 980px) {
		> div:not(:nth-of-type(2n)) {
			margin-right: calc((100vw - 160px) * 0.06);
		}
		> div:nth-of-type(2n) {
			margin-right: 0;
		}
	}
	// Mobile
	@media screen and (max-width: 640px) {
		> div {
			margin-right: 0 !important;
		}
	}
`;
