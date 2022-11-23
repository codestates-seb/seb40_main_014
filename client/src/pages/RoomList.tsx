import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRooms } from '../api/roomApi';
import { getMyInfo } from '../api/userApi';
import { DefaultButton } from '../components/common/Button';
import Room from '../components/home/Room';
import CreateModal from '../components/room/createModal';
import { myInfo, myLogin } from '../slices/mySlice';

export type RoomInfoType = {
	roomId: 1;
	member: HostType;
	title: string;
	content: string;
	onair: string;
	pwd: string;
	secret: boolean;
	category: string[];
	createdAt: string;
	modifiedAt: string;
	curMember: number;
	totalMember: number;
};

export type HostType = {
	memberId: number;
	playlistId: number;
	name: string;
	roles: string;
	grade: string;
};

function RoomList() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLogin = useSelector(myLogin);

	//* 구글 로그인
	const accessToken = new URL(location.href).searchParams.get('access_token');
	const refreshToken = new URL(location.href).searchParams.get('refresh_token');
	const memberId = new URL(location.href).searchParams.get('member_id');

	useEffect(() => {
		if (accessToken && refreshToken) {
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);

			getMyInfo(Number(memberId), accessToken).then((res) => {
				console.log('getMyInfo res', res);
				// {
				// 	memberId: 1,
				// 	follow: 10,
				// 	like: 10,
				// 	name: 'nickname',
				// 	createdAt: '회원 생성 시간',
				// 	modifiedAt: '회원 수정 시간',
				// 	grade: 'LUVIP',
				// 	rank: 1,
				// }
				dispatch(myInfo(res.data));

				navigate('/');
			});
		}
	}, []);

	//* 무한 스크롤
	const [rooms, setRooms] = useState<RoomInfoType[]>([]);

	const [hasNextPage, setHasNextPage] = useState(true);
	const currentPage = useRef<number>(1);
	const observerTargetEl = useRef<HTMLDivElement>(null);

	const fetch = useCallback(() => {
		// getRooms(currentPage.current, 10).then((res) => {
		// 	const data = res.data;
		// 	const { page, totalPages } = res.pageInfo;
		// 	setRooms((prevRooms) => [...prevRooms, ...data]);
		// 	// setHasNextPage(data.length === 10);
		// 	setHasNextPage(page !== totalPages);
		// 	// if (data.length) currentPage.current += 1;
		// 	if (hasNextPage) currentPage.current += 1;
		// });
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

	// 방 만들기 모달
	const [modalOpen, setModalOpen] = useState(false);

	const modalClose = () => {
		setModalOpen(!modalOpen);
	};

	return (
		<>
			<ButtonWrapper>
				{isLogin && (
					<DefaultButton
						fontSize="16px"
						width="105px"
						height="42px"
						onClick={modalClose}>
						방 만들기
					</DefaultButton>
				)}
				{modalOpen && (
					<CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
				)}
			</ButtonWrapper>
			<H2>방 Top 8</H2>
			<H2>최신 방</H2>
			<ListStyle>
				{/* {rooms.length
					? rooms.map((room: RoomInfoType) => (
							<Room room={room} key={room.roomId} />
					  ))
					: null} */}
				{rooms &&
					rooms.map((room: RoomInfoType) => (
						<Room room={room} key={room.roomId} />
					))}
				<div ref={observerTargetEl} />
			</ListStyle>
		</>
	);
}

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

export const ListStyle = styled.div`
	display: flex;
	flex-wrap: wrap;
	z-index: 1111;

	> div:not(:nth-of-type(4n)) {
		margin-right: calc((100vw - 30vw) * 0.03);
	}
	> div:nth-of-type(4n) {
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
