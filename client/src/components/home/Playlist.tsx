import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { IoMdHeart } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Category from '../common/Category';
import {
	Categorys,
	Detail,
	Name,
	RoomStyle,
	Thumbnail,
	ThumbnailBackdrop,
	Title,
} from './Room';

type PlaylistType = {
	playList: PlaylistInfoType;
	key?: number;
};

const Playlist = ({ playList }: PlaylistType) => {
	const { playListId, title, categoryList, like, memberId, name, playlist } =
		playList;

	return (
		<RoomStyle>
			<Thumbnail>
				<img src={playlist[0].thumbnail} alt="thumbnail" />
				<Link to={`/playlistdetail/${playListId}`}>
					<ThumbnailBackdrop />
				</Link>
			</Thumbnail>
			<Title>
				<Link to={`/playlistdetail/${playListId}`}>{title}</Link>
			</Title>
			<Name>
				<Link to={`/mypage/${memberId}`}>{name}</Link>
			</Name>
			<Detail>
				<Categorys>
					{categoryList.map((el, idx) => (
						<Category category={el} margin="0 4px 0 0" key={idx}>
							{el}
						</Category>
					))}
				</Categorys>
				<Like>
					<IoMdHeart />
					{like}
				</Like>
			</Detail>
		</RoomStyle>
	);
};

export default Playlist;

const Like = styled.span`
	> *:first-of-type {
		margin-right: 4px;
		font-size: 18px;
	}
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.gray600};
`;
