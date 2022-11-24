import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { IoMdHeartEmpty } from 'react-icons/io';
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
	playList: PlaylistInfoType;
	key?: number;
};

function Playlist({ playList }: PlaylistType) {
	const { playListId, title, categoryList, like, memberId, playlist } =
		playList;

	return (
		<PlaylistStyle>
			<Thumbnail>
				<img src={playlist[0].thumbnail} alt="thumbnail" />
				<Link to={`/playlistdetail/${playListId}`}>
					<ThumbnailBackdrop />
				</Link>
			</Thumbnail>
			<Title>
				<Link to={`/playlistdetail/${playListId}`}>{title}</Link>
			</Title>
			<Name>{memberId}</Name>
			<Detail>
				<Categorys>
					{categoryList.map((el, idx) => (
						<Category category={el} margin="0 4px 0 0" key={idx}>
							{el}
						</Category>
					))}
				</Categorys>
				<Like>
					<IoMdHeartEmpty />
					{like}
				</Like>
			</Detail>
		</PlaylistStyle>
	);
}

export default Playlist;

export const PlaylistStyle = styled.div`
	width: calc((100vw - 30vw) * 0.225);
	margin-bottom: calc((100vw - 30vw) * 0.03);
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
	background-color: #ffffff3b;
	border-radius: ${(props) => props.theme.radius.smallRadius};
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
		border-radius: ${(props) => props.theme.radius.smallRadius};
	}
`;

export const Title = styled.h3`
	display: inline-block;
	margin-bottom: 10px;
	font-weight: 600;
	font-size: 18px;
	cursor: pointer;

	:hover {
		color: ${(props) => props.theme.colors.gray600};
	}
`;

export const Name = styled.h4`
	font-size: ${(props) => props.theme.fontSize.small};
	color: ${(props) => props.theme.colors.gray500};
	margin-bottom: 15px;
`;

export const Detail = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const Categorys = styled.div``;

const Like = styled.button`
	> *:first-of-type {
		margin-right: 4px;
		font-size: 18px;
	}
	display: flex;
	align-items: center;
`;
