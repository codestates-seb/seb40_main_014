import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getRooms } from '../api/roomApi';
import { DefaultButton } from '../components/common/Button';
import Room from '../components/home/Room';
import CreateModal from '../components/room/createModal';
import { myLogin } from '../slices/mySlice';
import { musicInfoType } from './MakePlayList';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export type RoomInfoType = {
	roomId: number;
	member: HostType;
	title: string;
	onair: string;
	pwd: string;
	maxCount: number;
	userCount: number;
	secret: boolean;
	category: Array<string>;
	createdAt: string;
	modifiedAt: string;
	playlist: Array<musicInfoType>;
};

export type HostType = {
	memberId: number;
	playlistId: number;
	name: string;
	roles: string;
	grade: string;
};

const RoomList = () => {
	const isLogin = useSelector(myLogin);

	//* 무한 스크롤
	const [rooms, setRooms] = useState<RoomInfoType[]>([]);

	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	// real
	const fetch = useCallback(() => {
		// getRooms(currentPage.current, 10).then((res) => {
		// console.log('getRooms res', res);
		// 	const data = res.data;
		// 	const { page, totalPages } = res.pageInfo;
		// 	setRooms((prevRooms) => [...prevRooms, ...data]);
		// 	// setHasNextPage(data.length === 10);
		// 	setHasNextPage(page !== totalPages);
		// 	// if (data.length) currentPage.current += 1;
		// 	if (hasNextPage) currentPage.current += 1;
		// });
	}, []);

	// test
	useEffect(() => {
		getRooms(currentPage.current, 10).then((res) => {
			console.log('get rooms res', res);

			setRooms(res);
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
			<PopularListStyle>
				{rooms.length ? (
					<Swiper
						modules={[Pagination, Navigation, Autoplay]}
						// spaceBetween={50}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
						autoplay={{ delay: 5000 }}
						breakpoints={{
							641: {
								slidesPerView: 2,
							},
							981: {
								slidesPerView: 3,
							},
						}}>
						{rooms.map((room: RoomInfoType) => (
							<SwiperSlide key={room.roomId}>
								<Room room={room} key={room.roomId} />
							</SwiperSlide>
						))}
					</Swiper>
				) : null}
			</PopularListStyle>
			<H2>인기 DJ 방송</H2>
			<PopularListStyle>
				{rooms.length ? (
					<Swiper
						modules={[Pagination, Navigation, Autoplay]}
						// spaceBetween={50}
						slidesPerView={3}
						navigation
						pagination={{ clickable: true }}
						autoplay={{ delay: 5000 }}
						breakpoints={{
							641: {
								slidesPerView: 2,
							},
							981: {
								slidesPerView: 3,
							},
						}}>
						{rooms.map((room: RoomInfoType) => (
							<SwiperSlide key={room.roomId}>
								<Room room={room} key={room.roomId} />
							</SwiperSlide>
						))}
					</Swiper>
				) : null}
			</PopularListStyle>
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
`;

export const PopularListStyle = styled.div`
	margin-bottom: 30px;
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
