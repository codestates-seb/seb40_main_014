import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import ThumbnailImg from '../../assets/images/playlist-thumbnail.png';
import { HiOutlineHeart } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import Category from '../common/Category';

// export type PlaylistInfoType = {
// 	playlistId: number;
// 	title: string;
// 	status: string;
// 	videoId: string[];
// 	category: string[];
// 	like: number;
// 	createdAt: string;
// 	modifiedAt: string;
// 	name: string;
// };

type PlaylistType = {
	playlist: PlaylistInfoType;
	key?: number;
};

function Playlist({ playlist }: PlaylistType) {
	const { playlistId, title, category, like, name } = playlist;

	return (
		<PlaylistStyle>
			<Thumbnail>
				<img src={ThumbnailImg} alt="thumbnail" />
				<Backdrop>
					<Link to={`/playlist/${playlistId}`}>
						<div>자세히 보기</div>
					</Link>
				</Backdrop>
			</Thumbnail>
			<Title>{title}</Title>
			<Name>{name}</Name>
			<Detail>
				<Categorys>
					{category.map((el, idx) => (
						<Category category={el} margin="0 4px 0 0" key={idx}>
							{el}
						</Category>
					))}
				</Categorys>
				<Like>
					<HiOutlineHeart />
					{like}
				</Like>
			</Detail>
		</PlaylistStyle>
	);
}

export default Playlist;

const PlaylistStyle = styled.div`
	position: relative;
	margin: 0 30px 30px 0;
	padding: 20px;
	/* background-color: ${(props) => props.theme.colors.gray50}; */
	border-radius: ${(props) => props.theme.radius.smallRadius};
	box-shadow: 1px 1px 10px #4d0bd120;
	z-index: 1111;
`;

const Backdrop = styled.div`
	display: none;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	text-align: center;
	background-color: #4d0bd183;
	border-radius: ${(props) => props.theme.radius.smallRadius};
	z-index: 1111;

	div {
		color: ${(props) => props.theme.colors.white};
		padding: 30px;
		margin: calc(100% / 2) 0;
	}
`;

const Thumbnail = styled.div`
	margin-bottom: 20px;
	cursor: pointer;

	&:hover {
		${Backdrop} {
			display: block;
		}
	}

	img {
		width: 200px;
		border-radius: ${(props) => props.theme.radius.smallRadius};
	}
`;

const Title = styled.h3`
	margin-bottom: 10px;
`;

const Name = styled.h4`
	font-size: ${(props) => props.theme.fontSize.small};
	color: ${(props) => props.theme.colors.gray400};
	margin-bottom: 20px;
`;

const Detail = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Categorys = styled.div``;

const Like = styled.button`
	> *:first-of-type {
		margin-right: 5px;
	}
	display: flex;
	align-items: center;
`;
