import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { getRooms } from '../api/listApi';
import { getUserInfo } from '../api/userApi';
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

	// 구글 로그인
	const gAccessToken = new URL(location.href).searchParams.get('access_token');
	const gRefreshToken = new URL(location.href).searchParams.get(
		'refresh_token',
	);
	const memberId = Number(new URL(location.href).searchParams.get('member_id'));

	useEffect(() => {
		if (gAccessToken && gRefreshToken) {
			localStorage.setItem('accessToken', gAccessToken);
			localStorage.setItem('refreshToken', gRefreshToken);

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

	const [rooms, setRooms] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);

	const modalClose = () => {
		setModalOpen(!modalOpen);
	};

	useEffect(() => {
		getRooms().then((res) => {
			// console.log('#1', res);
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
				{rooms.length
					? rooms.map((room: RoomInfoType) => (
							<Room room={room} key={room.roomId} />
					  ))
					: null}
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
