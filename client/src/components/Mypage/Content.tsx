import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';

type ContentType = {
	playlist: PlaylistInfoType;
};

const Content = ({ playlist }: ContentType) => {
	return (
		<ContentStyle>
			<div className="imageBox">
				<img src={playlist.playlistItems[0].thumbnail} alt="이미지" />
			</div>
			<Name>{playlist.title}</Name>
		</ContentStyle>
	);
};

export default Content;

const ContentStyle = styled.div`
	.imageBox {
		padding: 5%;
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 60%;
			object-fit: cover;
			border-radius: 50%;
		}
	}
`;
const Name = styled.div`
	margin-bottom: 20px;
	padding-bottom: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
