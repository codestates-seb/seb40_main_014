import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ModalContainer = styled.div`
	position: fixed;
	top: 30%;
	left: 85%;
	width: 200px;
	height: 400px;
	background-color: ${(props) => props.theme.colors.white};
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	border-radius: ${(props) => props.theme.radius.largeRadius};
	overflow: hidden;

	@media screen and (min-width: 640px) and (max-width: 980px) {
		top: 60%;
		left: 70%;
		height: 300px;
	}

	@media screen and (max-width: 640px) {
		top: 60%;
		left: 50%;
		height: 300px;
	}
`;

const MyPlaylistHeader = styled.div`
	display: flex;
	justify-content: center;
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius}
		${(props) => props.theme.radius.largeRadius} 0px 0px;
	margin-bottom: 10px;

	div {
		display: flex;
		align-items: center;
		height: 30px;
	}
`;

const MyPlaylist = styled.div`
	height: 200px;
	overflow: scroll;
	div {
		margin: 0px 10px 10px 10px;
	}
	@media screen and (min-width: 640px) and (max-width: 980px) {
		height: 100px;
	}
	@media screen and (max-width: 640px) {
		height: 100px;
	}
`;
const BookmarkPlaylistHeader = styled(MyPlaylistHeader)`
	border-radius: 0px;
`;

const BookmarkPlaylist = styled.div`
	height: 100px;
	overflow: scroll;
	div {
		margin: 0px 10px 10px 10px;
	}
`;

const PlaylistDiv = styled.div`
	margin: 5px;
	padding-bottom: 5px;
	border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
	line-height: 18px;
	:hover {
		cursor: pointer;
	}
`;

const AddModal = ({
	playlist,
	setSelectedPlaylist,
	bookMarkPlaylist,
	addModalOpen,
	setAddModalOpen,
}) => {
	const handlePlaylist = (e) => {
		const choice = playlist.filter(
			(el) => String(el.playlistId) === e.target.id,
		);
		setSelectedPlaylist(choice[0]);
		setAddModalOpen(!addModalOpen);
	};

	const handleBookMarkPlaylist = (e) => {
		const choice = bookMarkPlaylist.filter(
			(el) => String(el.playlistId) === e.target.id,
		);
		setSelectedPlaylist(choice[0]);
	};

	const navigate = useNavigate();
	const linkToCreatePlaylist = () => {
		navigate('/makeplaylist/create');
	};

	return (
		<ModalContainer>
			<MyPlaylistHeader>
				<div>나의 플레이리스트</div>
			</MyPlaylistHeader>
			<MyPlaylist>
				{playlist.length === 0 ? (
					<PlaylistDiv onClick={linkToCreatePlaylist}>
						플레이리스트를 생성한 후 방을 생성해주세요!
					</PlaylistDiv>
				) : (
					playlist.map((e) => {
						return (
							<PlaylistDiv
								onClick={handlePlaylist}
								key={e.playlistId}
								id={e.playlistId}>
								{e.title}
							</PlaylistDiv>
						);
					})
				)}
			</MyPlaylist>
			<BookmarkPlaylistHeader>
				<div>보관한 플레이리스트</div>
			</BookmarkPlaylistHeader>
			<BookmarkPlaylist>
				{bookMarkPlaylist.length === 0 ? (
					<PlaylistDiv>상대방의 플레이리스트를 보관해보세요!</PlaylistDiv>
				) : (
					bookMarkPlaylist.map((e) => {
						return (
							<PlaylistDiv
								onClick={handleBookMarkPlaylist}
								key={e.playlistId}
								id={e.playlistId}>
								{e.title}
							</PlaylistDiv>
						);
					})
				)}
			</BookmarkPlaylist>
		</ModalContainer>
	);
};

export default AddModal;
