import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';

type ContentType = {
	id: number;
	playlist?: PlaylistInfoType;
	followlist?: any;
};

const Content = ({ id, playlist, followlist }: ContentType) => {
	const navigate = useNavigate();
	const moveDetail = () => {
		navigate(`/playlistdetail/${playlist.playlistId}`);
	};
	const moveUserPage = () => {
		navigate(`/mypage/${followlist.memberId}`);
		window.location.reload();
	};
	return (
		<ContentStyle>
			{id === 3 ? (
				<>
					<Img src={followlist.picture} alt="userPicture" />
					<Name onClick={moveUserPage}>{followlist.name}</Name>
				</>
			) : (
				<>
					<Img src={playlist.playlistItems[0].thumbnail} alt="thumbnail" />
					<Name onClick={moveDetail}>{playlist.title}</Name>
				</>
			)}
		</ContentStyle>
	);
};

export default Content;

const ContentStyle = styled.div``;

const Img = styled.img`
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
	margin-bottom: 15px;
	border-radius: ${(props) => props.theme.radius.smallRadius};
`;

const Name = styled.div`
	text-align: center;
	margin-bottom: 45px;
	cursor: pointer;
	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;
