import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import ModifyButton from './ModifyButton';
type PlaylistType = {
	playList?: PlaylistInfoType;
	followList?: any;
	id: number;
	userId: number;
	memberId: number;
};
const CplayList = ({
	playList,
	followList,
	id,
	userId,
	memberId,
}: PlaylistType) => {
	return (
		<CplayListStyle>
			<div>
				{id === 3 ? (
					<>
						<Img src={followList.picture} alt="userPicture" />
						<Title>
							<Link to={`/mypage/${followList.memberId}`}>
								{followList.name}
							</Link>
						</Title>
					</>
				) : (
					<>
						<Img src={playList.playlistItems[0].thumbnail} alt="thumbnail" />
						<Title>
							<Link to={`/playlistdetail/${playList.playlistId}`}>
								{playList.title}
							</Link>
						</Title>
					</>
				)}
			</div>
			<div>
				{id === 1 && userId === memberId && (
					<ModifyButton playlistId={playList.playlistId} />
				)}
			</div>
		</CplayListStyle>
	);
};

export default CplayList;

const CplayListStyle = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px 30px;
	background-color: ${(props) => props.theme.colors.white};

	> div:first-of-type {
		display: flex;
		align-items: center;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		flex-direction: column;
		align-items: flex-start;
		padding: 20px;
		> div:first-of-type {
			margin-bottom: 10px;
		}
		> div:last-of-type {
			width: 100%;
		}
	}
`;

const Img = styled.img`
	width: 80px;
	border-radius: 3px;
	margin-right: 20px;

	// Mobile
	@media screen and (max-width: 640px) {
		width: 50px;
		margin-right: 10px;
	}
`;

const Title = styled.h4`
	:hover {
		color: ${(props) => props.theme.colors.gray600};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;
