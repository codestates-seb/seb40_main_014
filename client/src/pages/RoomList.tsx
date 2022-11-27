import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getRooms } from '../api/roomApi';
import { DefaultButton } from '../components/common/Button';
import Room from '../components/home/Room';
import CreateModal from '../components/room/createModal';
import { myLogin } from '../slices/mySlice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { PlaylistInfoType } from './PlaylistList';

export type RoomInfoType = {
	maxCount: number;
	memberResponseDto: HostType;
	playlistResponseDto: PlaylistInfoType;
	pwd: string;
	roomId: string;
	secreat: boolean;
	title: string;
	userCount: number;
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
	// const prevRef = useRef(null);
	// const nextRef = useRef(null);

	const isLogin = useSelector(myLogin);

	//* 무한 스크롤
	const [rooms, setRooms] = useState<RoomInfoType[]>([]);

	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	// real
	const fetch = useCallback(() => {
		getRooms(currentPage.current, 6).then((res) => {
			console.log('getRooms res', res);
			const data = res.data;
			const { page, totalPages } = res.pageInfo;
			setRooms((prevRooms) => [...prevRooms, ...data]);
			// setHasNextPage(data.length === 10);
			setHasNextPage(page !== totalPages);
			// if (data.length) currentPage.current += 1;
			if (hasNextPage) currentPage.current += 1;
		});
	}, []);

	// test
	// useEffect(() => {
	// 	getRooms(currentPage.current, 10).then((res) => {
	// 		console.log('getRooms res', res);

	// 		setRooms(res);
	// 	});
	// }, []);

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
		// navigation: { prevEl: prevRef.current, newtEl: nextRef.current },
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
		// onBeforeInit: (swiper) => {
		// 	swiper.params.navigation.prevEl = prevRef.current;
		// 	swiper.params.navigation.nextEl = nextRef.current;
		// 	swiper.navigation.update();
		// },
	};

	return (
		<>
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
			{rooms.length ? (
				<SwiperStyle {...settings}>
					{rooms.map((room: RoomInfoType) => (
						<SwiperSlide key={room.roomId}>
							<Room room={room} key={room.roomId} swiper />
						</SwiperSlide>
					))}
					{/* <PrevButton ref={prevRef}>
						<IoIosArrowBack />
					</PrevButton>
					<NextButton ref={nextRef}>
						<IoIosArrowForward />
					</NextButton> */}
				</SwiperStyle>
			) : null}
			<H2>인기 DJ 방송</H2>
			{rooms.length ? (
				<SwiperStyle {...settings}>
					{rooms.map((room: RoomInfoType) => (
						<SwiperSlide key={room.roomId}>
							<Room room={room} key={room.roomId} swiper />
						</SwiperSlide>
					))}
					{/* <PrevButton ref={prevRef}>
						<IoIosArrowBack />
					</PrevButton>
					<NextButton ref={nextRef}>
						<IoIosArrowForward />
					</NextButton> */}
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
		</>
	);
};

export default RoomList;

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
	/* background-color: red; */
	padding: 0 50px;
	margin-bottom: 30px;
	> div {
		/* background-color: blue; */
	}
	> div > div {
		/* background-color: green; */
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
		padding: 0 25px;
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

	/* > div:not(:nth-of-type(4n)) {
		margin-right: calc((100vw - 30vw) * 0.03);
	}
	> div:nth-of-type(4n) {
		margin-right: 0;
	} */
	> div:not(:nth-of-type(3n)) {
		margin-right: calc((100vw - 30vw) * 0.04);
	}
	> div:nth-of-type(3n) {
		margin-right: 0;
	}
	// 14
	@media screen and (max-width: 1512px) {
		> div:not(:nth-of-type(3n)) {
			margin-right: calc((100vw - 30vw) * 0.04);
		}
		> div:nth-of-type(3n) {
			margin-right: 0;
		}
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
