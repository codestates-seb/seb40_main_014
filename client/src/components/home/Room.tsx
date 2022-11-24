import styled from 'styled-components';
import ThumbnailImg from '../../assets/images/thumbnail.png';
import { Link } from 'react-router-dom';
import Category from '../common/Category';
import { RoomInfoType } from '../../pages/RoomList';
import {
	ThumbnailBackdrop,
	Categorys,
	Detail,
	Name,
	PlaylistStyle,
	Thumbnail,
	Title,
} from './Playlist';

// export type roomInfoType = {
// 	roomId: 1;
// 	member: hostType;
// 	title: string;
// 	content: string;
// 	onair: string;
// 	pwd: string;
// 	secret: boolean;
// 	category: string[];
// 	createdAt: string;
// 	modifiedAt: string;
// curMember: number;
// totalMember: number;
// };

// export type hostType = {
// 	memberId: number;
// 	roomId: number;
// 	name: string;
// 	roles: string;
// 	grade: string;
// };

type RoomType = {
	room: RoomInfoType;
	key?: number;
};

function Room({ room }: RoomType) {
	const { roomId, title, category, member, onair, curMember, totalMember } =
		room;

	return (
		<PlaylistStyle>
			<Thumbnail>
				<img src={ThumbnailImg} alt="thumbnail" />
				<Link to={`/room/${roomId}`}>
					<ThumbnailBackdrop />
				</Link>
				{onair === 'ON' && <Onair>On Air</Onair>}
			</Thumbnail>
			<Title>
				<Link to={`/room/${roomId}`}>{title}</Link>
			</Title>
			<Name>{member.name}</Name>
			<Detail>
				<Categorys>
					{category.map((el, idx) => (
						<Category category={el} margin="0 4px 0 0" key={idx}>
							{el}
						</Category>
					))}
				</Categorys>
				<Like>
					{curMember} / {totalMember}
				</Like>
			</Detail>
		</PlaylistStyle>
	);
}

export default Room;

const Onair = styled.div`
	position: absolute;
	top: 15px;
	left: 15px;
	padding: 5px;
	background-color: #ff4444;
	color: ${(props) => props.theme.colors.white};
	font-size: ${(props) => props.theme.fontSize.small};
	border-radius: ${(props) => props.theme.radius.smallRadius};
`;

const Like = styled.div``;
