import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';

type ContentType = {
	id: number;
	playlist?: PlaylistInfoType;
	followlist?: any;
};

type ImgProps = {
	follow?: boolean;
};

const Content = ({ id, playlist, followlist }: ContentType) => {
	return (
		<>
			{id === 3 ? (
				<ContentStyle>
					<Thumbnail>
						<Img src={followlist.picture} alt="thumbnail" follow />
						<Link to={`/mypage/${followlist.memberId}`}>
							<ThumbnailBackdrop follow />
						</Link>
					</Thumbnail>
					<Name>
						<Link to={`/mypage/${followlist.memberId}`}>{followlist.name}</Link>
					</Name>
				</ContentStyle>
			) : (
				<ContentStyle>
					<Thumbnail>
						<Img src={playlist.playlistItems[0].thumbnail} alt="thumbnail" />
						<Link to={`/playlistdetail/${playlist.playlistId}`}>
							<ThumbnailBackdrop />
						</Link>
					</Thumbnail>
					<Name>
						<Link to={`/playlistdetail/${playlist.playlistId}`}>
							{playlist.title}
						</Link>
					</Name>
				</ContentStyle>
			)}
		</>
	);
};

export default Content;

const ContentStyle = styled.div`
	display: flex;
	flex-direction: column;
`;

export const ThumbnailBackdrop = styled.div<ImgProps>`
	display: none;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background-color: #ffffff48;
	border-radius: ${(props) =>
		props.follow ? '50%' : props.theme.radius.smallRadius};
	z-index: 1111;
`;

export const Thumbnail = styled.div`
	position: relative;
	margin-bottom: 15px;

	:hover {
		${ThumbnailBackdrop} {
			display: block;
		}
	}
`;

const Img = styled.img<ImgProps>`
	width: 230px;
	@media screen and (max-width: 1350px) {
		width: 170px;
	}
	@media screen and (max-width: 1034px) {
		width: 140px;
	}
	@media screen and (max-width: 668px) {
		width: 110px;
	}
	@media screen and (max-width: 550) {
		width: 70px;
	}
	border-radius: ${(props) =>
		props.follow ? '50%' : props.theme.radius.smallRadius};
`;

const Name = styled.div`
	text-align: center;
	margin-bottom: 45px;
	cursor: pointer;

	:hover {
		color: ${(props) => props.theme.colors.gray700};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;
