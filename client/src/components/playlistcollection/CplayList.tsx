import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';
import ModifyButton from './ModifyButton';
type PlaylistType = {
	playList: PlaylistInfoType;
	key?: number;
};
const CplayList = ({ playList }: PlaylistType) => {
	const { playlistId, title, playlistItems } = playList;

	return (
		<CplayListStyle>
			<div>
				<Img src={playlistItems[0].thumbnail} alt="thumbnail" />
				<Title>
					<Link to={`/playlistdetail/${playlistId}`}>{title}</Link>
				</Title>
			</div>
			<div>
				<ModifyButton playlistId={playlistId} />
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
