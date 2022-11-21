import styled from 'styled-components';

const ModalContainer = styled.div`
	position: fixed;
	top: 30%;
	left: 85%;
	width: 200px;
	height: 400px;
	background-color: ${(props) => props.theme.colors.white};
	box-shadow: #babfc4 0px 5px 12px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	overflow: hidden;
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

const AddModal = () => {
	return (
		<ModalContainer>
			<MyPlaylistHeader>
				<div>나의 플레이리스트</div>
			</MyPlaylistHeader>
			<MyPlaylist>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
			</MyPlaylist>
			<BookmarkPlaylistHeader>
				<div>북마크한 플레이리스트</div>
			</BookmarkPlaylistHeader>
			<BookmarkPlaylist>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
				<div>
					공부하고 일할 때 꼭 필요한 음악 | 3 hour lofi hip hop mix / lofi study
					/ work / chill beats
				</div>
			</BookmarkPlaylist>
		</ModalContainer>
	);
};

export default AddModal;
