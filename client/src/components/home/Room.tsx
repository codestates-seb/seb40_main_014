import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Category from '../common/Category';
import { RoomInfoType } from '../../pages/RoomList';
import { HiUser } from 'react-icons/hi';

type RoomType = {
	room: RoomInfoType;
	key?: string;
	swiper?: boolean;
};

export type SwiperTrueType = {
	swiper?: boolean;
};

const Room = ({ room, swiper }: RoomType) => {
	const { roomId, title, userlist } = room;
	const { memberId, name } = room.memberResponseDto;
	const { categoryList, playlistItems } = room.playlistResponseDto;

	return (
		<RoomStyle>
			<Link to={`/rooms/${roomId}`}>
				<LinkRoom>
					<Thumbnail>
						<Img src={playlistItems[0].thumbnail} alt="thumbnail" />
						<Onair swiper={swiper}>ON AIR</Onair>
					</Thumbnail>
					<Title swiper={swiper}>{title}</Title>
				</LinkRoom>
			</Link>
			<Name swiper={swiper}>
				<Link to={`/mypage/${memberId}`}>{name}</Link>
			</Name>
			<Detail>
				<Categorys>
					{categoryList &&
						categoryList.map((el, idx) => (
							<Category
								category={el}
								margin="0 4px 0 0"
								key={idx}
								swiper={swiper}>
								<Link to={`/search?type1=room&type2=category&q=${el}`}>
									{el}
								</Link>
							</Category>
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

	// 14
	@media screen and (max-width: 1512px) {
		width: calc((100vw - 30vw) * 0.306);
		margin-bottom: calc((100vw - 30vw) * 0.04);
	}
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

export const ThumbnailBackdrop = styled.div`
	display: none;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	text-align: center;
	background-color: #ffffff37;
	border-radius: 3px;
	z-index: 1111;

	div {
		color: ${(props) => props.theme.colors.white};
		padding: 30px;
		margin: calc(100% / 2) 0;
	}
`;

export const LinkRoom = styled.div`
	:hover {
		opacity: 0.75;
	}
`;

export const Thumbnail = styled.div`
	position: relative;
	margin-bottom: 15px;
`;

export const Img = styled.img`
	width: 100%;
	border-radius: 3px;
`;

export const Title = styled.h3<SwiperTrueType>`
	display: inline-block;
	height: 36px;
	margin-bottom: 10px;
	font-weight: 600;
	font-size: 18px;
	cursor: pointer;

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
		height: 28px;
		font-size: ${(props) => (props.swiper ? '14px' : '16px')};
	}
`;

export const Name = styled.h4<SwiperTrueType>`
	font-size: ${(props) => props.theme.fontSize.small};
	color: ${(props) => props.theme.colors.gray600};
	margin-bottom: 15px;

	a:hover {
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
		font-size: ${(props) => props.swiper && '14px'};
	}
	// Mobile
	@media screen and (max-width: 640px) {
		display: ${(props) => (props.swiper ? 'none' : 'block')};
		font-size: 14px;
	}
`;
