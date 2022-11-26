import styled from 'styled-components';
import { PlaylistInfoType } from '../../pages/PlaylistList';

type ContentType = {
	playlist: PlaylistInfoType;
};

const Content = ({ playlist }: ContentType) => {
	return (
		<ContentStyle>
			<Img src={playlist.playlistItems[0].thumbnail} alt="thumbnail" />
			<Name>{playlist.title}</Name>
		</ContentStyle>
	);
};

export default Content;

const ContentStyle = styled.div``;

const Img = styled.img`
	width: 100%;
	margin-bottom: 15px;
	border-radius: ${(props) => props.theme.radius.smallRadius};
`;

const Name = styled.div`
	text-align: center;
	margin-bottom: 45px;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;
