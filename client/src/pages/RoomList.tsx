import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
<<<<<<< HEAD
import { getRooms } from '../api/listApi';
import { getUserInfo } from '../api/userApi';
=======
import { getRooms } from '../api/roomApi';
import { getMyInfo } from '../api/userApi';
>>>>>>> 99f5d6e93823c5d943ed40eadb67c659614a6bac
import { DefaultButton } from '../components/common/Button';
import Room from '../components/home/Room';
import CreateModal from '../components/room/createModal';
import { myInfo } from '../slices/mySlice';

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

	const [page, setPage] = useState(0);
	const [size, setSize] = useState(16);
	const [rooms, setRooms] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	// 구글 로그인
	const gAccessToken = new URL(location.href).searchParams.get('access_token');
	const gRefreshToken = new URL(location.href).searchParams.get(
		'refresh_token',
	);
	const memberId = Number(new URL(location.href).searchParams.get('member_id'));

	const modalClose = () => {
		setModalOpen(!modalOpen);
	};

	useEffect(() => {
<<<<<<< HEAD
		if (gAccessToken && gRefreshToken) {
			localStorage.setItem('accessToken', gAccessToken);
			localStorage.setItem('refreshToken', gRefreshToken);
=======
		if (accessToken && refreshToken) {
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
>>>>>>> 99f5d6e93823c5d943ed40eadb67c659614a6bac

			getUserInfo(memberId).then((res) => {
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
			});
		}
	}, []);

	useEffect(() => {
		getRooms(page, size).then((res) => {
			console.log('getRooms res', res);

<<<<<<< HEAD
	useEffect(() => {
		getRooms().then((res) => {
			// console.log('#1', res);
=======
>>>>>>> 99f5d6e93823c5d943ed40eadb67c659614a6bac
			setRooms(res);
		});
	}, []);

	return (
		<>
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
			<H2>방 Top 8</H2>
			<H2>최신 방</H2>
			<ListStyle>
				{/* {rooms.length
					? rooms.map((room: RoomInfoType) => (
							<Room room={room} key={room.roomId} />
					  ))
					: null} */}
				{rooms.map((room: RoomInfoType) => (
					<Room room={room} key={room.roomId} />
				))}
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
