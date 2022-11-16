import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import PlaylistPart from '../components/room/Playlist';
import PeoplePart from '../components/room/PeopleList';
import Message from '../components/room/Message';
import Chatting from '../components/room/Chatting';
import { Link } from 'react-router-dom';

const Container = styled.div`
	width: 900px;
	border: 1px solid ${(props) => props.theme.colors.gray300};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
	border: 1px solid ${(props) => props.theme.colors.gray300};
	background-color: ${(props) => props.theme.colors.background};
`;

const ChatRoomContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: ${(props) => props.theme.radius.largeRadius};
`;

const ChatHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 40px;
	color: ${(props) => props.theme.colors.white};
	background-color: ${(props) => props.theme.colors.purple};
	border-radius: ${(props) => props.theme.radius.largeRadius}
		${(props) => props.theme.radius.largeRadius} 0 0;
	padding: 10px;
`;

const ChatFooter = styled.div``;

const ExitBtn = styled.button`
	margin-top: 3px;
`;

const ChatHeaderContent = styled.div``;

const ChatLeft = styled.div`
	height: 600px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	background-color: ${(props) => props.theme.colors.background};
`;

const ChatRight = styled.div``;

const ChatSection = styled.div`
	width: 570px;
	height: 550px;
	background-color: #fff;
	margin: 20px;
	padding: 10px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
	overflow: scroll;
`;

const MessageSection = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 60px;
	background: ${(props) => props.theme.colors.purple};
	border-radius: 0px 0px ${(props) => props.theme.radius.largeRadius} 10px;

	input {
		width: 90%;
	}
`;

const onClick = (e) => {
	console.log(e);
};

const TotalContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Room = () => {
	return (
		<>
			{' '}
			<TotalContainer>
				<Container>
					<ChatHeader>
						<ChatHeaderContent>
							<div>방 제목</div>
						</ChatHeaderContent>
						<ChatHeaderContent>
							<ExitBtn>
								<Link to="/">
									<ImExit onClick={onClick} />
								</Link>
							</ExitBtn>
						</ChatHeaderContent>
					</ChatHeader>
					<ChatRoomContainer>
						<ChatLeft>
							<ChatSection>
								<Chatting></Chatting>
							</ChatSection>
						</ChatLeft>
						<ChatRight>
							<PlaylistPart />
							<PeoplePart />
						</ChatRight>
					</ChatRoomContainer>
					<ChatFooter>
						<MessageSection>
							<Message />
						</MessageSection>
					</ChatFooter>
				</Container>
			</TotalContainer>
		</>
	);
};

export default Room;
