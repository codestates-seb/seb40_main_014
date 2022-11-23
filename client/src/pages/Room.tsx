import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import PlaylistPart from '../components/room/Playlist';
import PeoplePart from '../components/room/PeopleList';
import Message from '../components/room/Message';
import Chatting from '../components/room/Chatting';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import UpdateRoomModal from '../components/room/updateModal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useForm } from 'react-hook-form';

const TotalContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: -80px;
`;

const Container = styled.div`
	width: 900px;
	border: 1px solid ${(props) => props.theme.colors.gray300};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
	border: 1px solid ${(props) => props.theme.colors.gray300};
	background-color: ${(props) => props.theme.colors.background};
	@media screen and (max-width: 980px) {
		width: 500px;
	}
	@media screen and (max-width: 640px) {
		width: 300px;
	}
`;

const ChatRoomContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	@media screen and (max-width: 980px) {
		flex-direction: row;
	}
	@media screen and (max-width: 640px) {
		display: block;
	}
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

const ExitBtn = styled.button``;

const ChatHeaderContent = styled.div``;

const ChatLeft = styled.div`
	height: 600px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	background-color: ${(props) => props.theme.colors.background};

	@media screen and (max-width: 980px) {
		width: 200px;
	}
	@media screen and (max-width: 640px) {
		margin-left: 5px;
		height: 220px;
	}
`;

const ChatRight = styled.div`
	@media screen and (max-width: 980px) {
		width: 200px;
		margin: auto;
	}
	@media screen and (max-width: 640px) {
		display: flex;
		flex-direction: column;

		align-items: center;
	}
`;

const ChatSection = styled.div`
	width: 570px;
	height: 550px;
	background-color: #fff;
	margin: 20px;
	padding: 10px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
	overflow-y: scroll;
	:hover {
		::-webkit-scrollbar {
			width: 8px;
		}

		::-webkit-scrollbar-thumb {
			height: 30%;
			background-color: ${(props) => props.theme.colors.gray300};

			border-radius: 10px;
		}

		::-webkit-scrollbar-track {
			background: rgba(33, 122, 244, 0.1);
		}
	}
	@media screen and (max-width: 980px) {
		width: 90%;
	}
	@media screen and (max-width: 640px) {
		width: 125%;
		height: 200px;
	}
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

const UpdateRoomBtn = styled.button`
	margin: 15px;
	border-radius: ${(props) => props.theme.radius.smallRadius};
	padding: 5px;
	border: 1px solid ${(props) => props.theme.colors.gray200};
`;

const onClick = (e) => {
	console.log(e);
};

export type MessageInfo = {
	memberId?: string;
	message?: string;
};

export type MessageObjectType = {
	memberId: number;
	username: string;
	message: string;
	roomId: string;
};

const MessageForm = styled.form`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MessageInput = styled.input`
	width: 700px;
	height: 35px;
	border: 1px solid ${(props) => props.theme.colors.gray500};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	padding: 0px 10px 0px 10px;
	:focus {
		outline: 0.1px solid ${(props) => props.theme.colors.purple};
		box-shadow: ${(props) => props.theme.colors.purple} 0px 0px 0px 1px;
		border: none;
	}
`;
const Room = () => {
	const { register, handleSubmit, reset } = useForm<MessageInfo>();
	const userInfo = useSelector((state: RootState) => state.my.value);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const modalClose = () => {
		setModalOpen(!modalOpen);
	};
	const [title, setTitle] = useState<string>('존재하지 않는 방입니다.');
	const params = useParams();
	const [messageObject, setMessageObject] = useState<any>([]);

	const roomInfo = useSelector((state: RootState) => state.room);

	console.log('현재 룸 상태', roomInfo);

	const onValid = (e) => {
		const MessageObj: MessageObjectType = {
			roomId: params.id,
			username: userInfo.name,
			memberId: userInfo.memberId,
			message: e.message,
		};
		setMessageObject((prev) => [...prev, MessageObj]);

		reset();
	};
	console.log('메세지 상태', messageObject);
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_STACK_SERVER}/rooms/${params.id}`)
			.then((res) => {
				setTitle(res.data.title);
			})
			.catch((err) => console.log('방이 없어'));
	}, []);

	return (
		<>
			{' '}
			<TotalContainer>
				<Container>
					<ChatHeader>
						<ChatHeaderContent>
							<div>{title}</div>
						</ChatHeaderContent>
						<ChatHeaderContent>
							<UpdateRoomBtn onClick={modalClose}>Edit</UpdateRoomBtn>
							{modalOpen && (
								<UpdateRoomModal
									modalOpen={modalOpen}
									setModalOpen={setModalOpen}
								/>
							)}
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
								<Chatting messageObject={messageObject}></Chatting>
							</ChatSection>
						</ChatLeft>
						<ChatRight>
							<PlaylistPart />
							<PeoplePart />
						</ChatRight>
					</ChatRoomContainer>
					<ChatFooter>
						<MessageSection>
							<MessageForm onSubmit={handleSubmit(onValid)}>
								<MessageInput
									{...register('message', { required: true })}
									placeholder="하고 싶은 말을 입력하세요!"></MessageInput>
							</MessageForm>
						</MessageSection>
					</ChatFooter>
				</Container>
			</TotalContainer>
		</>
	);
};

export default Room;
