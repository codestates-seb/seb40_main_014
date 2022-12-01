import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { LinkRoom, Thumbnail } from '../home/Room';

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
					<Link to={`/mypage/${followlist.memberId}`}>
						<LinkRoom>
							<Thumbnail>
								<Img src={followlist.picture} alt="thumbnail" follow />
							</Thumbnail>
							<Name>{followlist.name}</Name>
						</LinkRoom>
					</Link>
				</ContentStyle>
			) : (
				<ContentStyle>
					<Link to={`/playlistdetail/${playlist.playlistId}`}>
						<LinkRoom>
							<Thumbnail>
								<Img
									src={playlist.playlistItems[0].thumbnail}
									alt="thumbnail"
								/>
							</Thumbnail>
							<Name>{playlist.title}</Name>
						</LinkRoom>
					</Link>
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

	text-align: center;
	margin-bottom: 45px;
	cursor: pointer;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;
