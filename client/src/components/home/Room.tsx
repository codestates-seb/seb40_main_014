import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Category from '../common/Category';
import { HiUser } from 'react-icons/hi';
import { RoomInfoType } from '../../pages/RoomList';
import { useSelector } from 'react-redux';
import { myLogin } from '../../slices/mySlice';
import Swal from 'sweetalert2';
import { AiTwotoneLock } from 'react-icons/ai';

type RoomType = {
	room: RoomInfoType;
	key?: string;
	swiper?: boolean;
};

export type SwiperTrueType = {
	swiper?: boolean;
};

const Room = ({ room, swiper }: RoomType) => {
	const navigate = useNavigate();
	const isLogin = useSelector(myLogin);

	const { roomId, title, userlist, pwd } = room;
	const { memberId, name } =
		room.memberResponseDto || room.rankChatRoomSimpleDto;
	const { categoryList, playlistItems } = room.playlistResponseDto;

	const onClickLinkRoom = () => {
		if (!isLogin) {
			Swal.fire({
				icon: 'warning',
				text: '로그인 후 입장하실 수 있습니다.',
			});
		} else {
			if (pwd) {
				Swal.fire({
					text: '비밀번호가 존재하는 방입니다.\n방 비밀번호를 입력해주세요.',
					input: 'text',
					inputAttributes: {
						autocapitalize: 'off',
					},
					confirmButtonText: '확인',
					showCancelButton: true,
					cancelButtonText: '취소',
					showLoaderOnConfirm: true,
					preConfirm: (password) => {
						return password;
					},
					allowOutsideClick: () => !Swal.isLoading(),
				}).then((result) => {
					if (result.value === pwd) {
						navigate(`/rooms/${roomId}`);
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						return;
					} else {
						Swal.fire({
							text: '비밀번호를 다시 확인하세요.',
						});
					}
				});
			} else {
				navigate(`/rooms/${roomId}`);
			}
		}
	};

	const onClickLinkName = () => {
		if (!isLogin) {
			Swal.fire({
				icon: 'warning',
				text: '로그인 후 이동하실 수 있습니다.',
			});
		} else {
			navigate(`/mypage/${memberId}`);
		}
	};

	return (
		<RoomStyle>
			<LinkRoom onClick={onClickLinkRoom}>
				<Thumbnail>
					<Img src={playlistItems[0].thumbnail} alt="썸네일" />
					<Onair swiper={swiper}>ON AIR</Onair>
					<Lock className="lock">
						{pwd ? (
							<span>
								<AiTwotoneLock className="lock" />
							</span>
						) : null}
					</Lock>
				</Thumbnail>
				<Title swiper={swiper}>{title}</Title>
			</LinkRoom>

			<Name swiper={swiper} onClick={onClickLinkName}>
				{name}
			</Name>

			<Detail>
				<Categorys>
					{categoryList &&
						categoryList.map((el, idx) => (
							<Link key={idx} to={`/search?type1=room&type2=category&q=${el}`}>
								<Category category={el} margin="0 4px 0 0" swiper={swiper}>
									{el}
								</Category>
							</Link>
						))}
				</Categorys>
				<RoomCount swiper={swiper}>
					<HiUser color="#3cc13c" />
					{userlist.length}
				</RoomCount>
			</Detail>
		</RoomStyle>
	);
};

export default Room;

export const RoomStyle = styled.div`
	width: calc((100vw - 30vw) * 0.306);
	margin-bottom: calc((100vw - 30vw) * 0.04);
	padding: 7px;
	z-index: 1111;

	// Tablet
	@media screen and (max-width: 980px) {
		width: calc((100vw - 160px) * 0.47);
		margin-bottom: calc((100vw - 160px) * 0.06);
	}
	// Mobile
	@media screen and (max-width: 640px) {
		width: 100%;
		margin-bottom: 30px;
	}
`;

export const LinkRoom = styled.div`
	cursor: pointer;
	:hover {
		opacity: 0.75;
	}
`;

export const Thumbnail = styled.div`
	position: relative;
	margin-bottom: 15px;
	display: flex;
`;

export const Img = styled.img`
	width: 100%;
	border-radius: 3px;
`;

export const Title = styled.h3<SwiperTrueType>`
	text-align: left;
	height: 50.396px;
	margin-bottom: 10px;
	font-weight: 600;
	font-size: 18px;
	cursor: pointer;
	line-height: 1.4em;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;

	// Tablet
	@media screen and (max-width: 980px) {
		font-size: ${(props) => props.swiper && '16px'};
	}
	// Mobile
	@media screen and (max-width: 640px) {
		height: 44.792px;
		font-size: ${(props) => (props.swiper ? '14px' : '16px')};
	}
`;

export const Name = styled.button<SwiperTrueType>`
	font-size: ${(props) => props.theme.fontSize.small};
	color: ${(props) => props.theme.colors.gray600};
	margin-bottom: 15px;

	:hover {
		opacity: 0.75;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => (props.swiper ? '12px' : '14px')};
	}
`;

export const Detail = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Categorys = styled.div``;

export const Onair = styled.div<SwiperTrueType>`
	position: absolute;
	top: 15px;
	left: 15px;
	padding: 5px;
	background-color: #ff000099;
	color: ${(props) => props.theme.colors.white};
	font-size: ${(props) => props.theme.fontSize.small};
	border-radius: ${(props) => props.theme.radius.smallRadius};

	// Tablet
	@media screen and (max-width: 980px) {
		top: ${(props) => (props.swiper ? '10px' : '15px')};
		left: ${(props) => (props.swiper ? '10px' : '15px')};
	}
	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.swiper && '10px'};
		top: ${(props) => (props.swiper ? '7px' : '15px')};
		left: ${(props) => (props.swiper ? '7px' : '15px')};
	}
`;

const RoomCount = styled.div<SwiperTrueType>`
	> *:first-of-type {
		margin-right: 4px;
		font-size: 17px;
	}
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.gray600};
	// Tablet
	@media screen and (max-width: 980px) {
		> *:first-of-type {
			margin-right: 4px;
			font-size: ${(props) => props.swiper && '15px'};
		}
		display: ${(props) => (props.swiper ? 'none' : 'block')};
		font-size: ${(props) => props.swiper && '14px'};
	}
	// Mobile
	@media screen and (max-width: 640px) {
		display: ${(props) => (props.swiper ? 'none' : 'block')};
		font-size: ${(props) => props.theme.fontSize.small};
	}
`;
const Lock = styled.div`
	position: absolute;
	top: 15px;
	right: 15px;
	font-size: 23px;
	.lock {
		color: #f7ff04;
	}

	@media screen and (max-width: 980px) {
		top: 12px;
		right: 12px;
		font-size: ${(props) => props.theme.fontSize.large};
	}
	@media screen and (max-width: 640px) {
		top: 8px;
		right: 8px;
		font-size: 15px;
	}
`;
