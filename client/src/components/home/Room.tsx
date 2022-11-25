import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Category from '../common/Category';
import { RoomInfoType } from '../../pages/RoomList';

type RoomType = {
	room: RoomInfoType;
	key?: number;
};

const Room = ({ room }: RoomType) => {
	const {
		roomId,
		title,
		category,
		member,
		onair,
		userCount,
		maxCount,
		playlist,
	} = room;

	return (
		<RoomStyle>
			<Thumbnail>
				<img src={playlist[0].thumbnail} alt="thumbnail" />
				<Link to={`/room/${roomId}`}>
					<ThumbnailBackdrop />
				</Link>
				{onair === 'ON' && <Onair>ON AIR</Onair>}
			</Thumbnail>
			<Title>
				<Link to={`/room/${roomId}`}>{title}</Link>
			</Title>
			<Name>
				<Link to={`/mypage/${member.memberId}`}>{member.name}</Link>
			</Name>
			<Detail>
				<Categorys>
					{category.map((el, idx) => (
						<Category category={el} margin="0 4px 0 0" key={idx}>
							{el}
						</Category>
					))}
				</Categorys>
				<RoomCount>
					{userCount} / {maxCount}
				</RoomCount>
			</Detail>
		</RoomStyle>
	);
};

export default Room;

export const RoomStyle = styled.div`
	/* width: calc((100vw - 30vw) * 0.225);
	margin-bottom: calc((100vw - 30vw) * 0.03); */
	width: calc((100vw - 30vw) * 0.306);
	margin-bottom: calc((100vw - 30vw) * 0.04);
	padding: 7px;
	/* background-color: ${(props) => props.theme.colors.gray50}; */
	/* border-radius: ${(props) => props.theme.radius.smallRadius}; */
	/* box-shadow: 1px 1px 10px #4d0bd133; */
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
	/* background-color: #4d0bd16e; */
	background-color: #ffffff48;
	border-radius: 3px;
	z-index: 1111;

	div {
		color: ${(props) => props.theme.colors.white};
		padding: 30px;
		margin: calc(100% / 2) 0;
	}
`;

export const Thumbnail = styled.div`
	position: relative;
	margin-bottom: 15px;
	cursor: pointer;

	:hover {
		${ThumbnailBackdrop} {
			display: block;
		}
	}

	img {
		width: 100%;
		border-radius: 3px;
	}
`;

export const Title = styled.h3`
	display: inline-block;
	margin-bottom: 10px;
	font-weight: 600;
	font-size: 18px;
	cursor: pointer;

	:hover {
		color: ${(props) => props.theme.colors.gray700};
	}
`;

export const Name = styled.h4`
	font-size: ${(props) => props.theme.fontSize.small};
	color: ${(props) => props.theme.colors.gray600};
	margin-bottom: 15px;

	a:hover {
		color: ${(props) => props.theme.colors.gray500};
	}
`;

export const Detail = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Categorys = styled.div``;

const Onair = styled.div`
	position: absolute;
	top: 15px;
	left: 15px;
	padding: 5px;
	background-color: #ff000099;
	color: ${(props) => props.theme.colors.white};
	font-size: ${(props) => props.theme.fontSize.small};
	border-radius: ${(props) => props.theme.radius.smallRadius};
`;

const RoomCount = styled.div`
	color: ${(props) => props.theme.colors.gray600};
`;
