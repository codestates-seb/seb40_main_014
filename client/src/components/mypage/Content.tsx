import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import { MyInitialStateValue } from '../../slices/mySlice';
import { Img, LinkRoom, RoomStyle, Thumbnail } from '../home/Room';

type ContentType = {
	id: number;
	playlist?: PlaylistInfoType;
	userInfo?: MyInitialStateValue;
	followlist?: FollowList;
};

export type FollowList = {
	memberId: number;
	name: string;
	picture: string;
	content: string;
};

const Content = ({ id, playlist, followlist, userInfo }: ContentType) => {
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
							<Detail>
								{followlist.content || '등록된 자기소개가 없습니다.'}
							</Detail>
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
							<Detail>{userInfo.name || playlist.name}</Detail>
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
	line-height: 1.4em;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.small};
	}
`;

export const Detail = styled.div`
	color: ${(props) => props.theme.colors.gray500};
	font-size: ${(props) => props.theme.fontSize.small};
	text-align: center;

	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	word-break: break-all;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.xSmall};
	}
`;
