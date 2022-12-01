import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { Img, LinkRoom, RoomStyle, Thumbnail } from '../home/Room';

type ContentType = {
	id: number;
	playlist?: PlaylistInfoType;
	followlist?: any;
};

const Content = ({ id, playlist, followlist }: ContentType) => {
	return (
		<>
			{id === 3 ? (
				<RoomStyle>
					<Link to={`/mypage/${followlist.memberId}`}>
						<LinkRoom>
							<FollowThumbnail>
								<FollowImg src={followlist.picture} alt="프로필" />
							</FollowThumbnail>
							<Name>{followlist.name}</Name>
							<Intro>
								{followlist.content || '등록된 자기소개가 없습니다.'}
							</Intro>
						</LinkRoom>
					</Link>
				</RoomStyle>
			) : (
				<RoomStyle>
					<Link to={`/playlistdetail/${playlist.playlistId}`}>
						<LinkRoom>
							<Thumbnail>
								<Img src={playlist.playlistItems[0].thumbnail} alt="썸네일" />
							</Thumbnail>
							<Name>{playlist.title}</Name>
						</LinkRoom>
					</Link>
				</RoomStyle>
			)}
		</>
	);
};

export default Content;

const FollowThumbnail = styled(Thumbnail)`
	display: flex;
	justify-content: center;
`;

const FollowImg = styled(Img)`
	width: 80%;
	max-width: 200px;
	border-radius: 50%;

	// Tablet, Mobile
	@media screen and (max-width: 980px) {
		max-width: 180px;
	}
`;

const Name = styled.div`
	text-align: center;
	margin-bottom: 10px;
	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;

export const Intro = styled.div`
	color: ${(props) => props.theme.colors.gray500};
	font-size: 14px;
	text-align: center;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 12px;
	}
`;
