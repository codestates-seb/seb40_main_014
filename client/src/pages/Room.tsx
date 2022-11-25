import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import PlaylistPart from '../components/room/Playlist';
import PeoplePart from '../components/room/PeopleList';
import Chatting from '../components/room/Chatting';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import UpdateRoomModal from '../components/room/updateModal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useForm } from 'react-hook-form';
import instance from '../api/root';
import { getRoomById } from '../api/roomApi';
import * as StompJS from '@stomp/stompjs';

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
	memberName: string;
	message: string;
	type: string;
	memberId: number;
	roomString: string;
	roomId: string;
};

export type receiveMessageObjectType = {
	message: string;
	user: string;
};

export type peopleType = {
	name: string;
	id: number;
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
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [people, setPeople] = useState<peopleType[]>([]);
	const modalClose = () => {
		setModalOpen(!modalOpen);
	};

	const [receiveMessageObject, setReceiveMessageObject] = useState<
		receiveMessageObjectType[]
	>([]);
	const [title, setTitle] = useState<string>('존재하지 않는 방입니다.');
	const params = useParams();
	const roomId = params.id;
	const NumberMemberId = Number(userInfo.memberId);
	const [messageObject, setMessageObject] = useState<MessageObjectType>({
		memberName: `${userInfo.name}`,
		message: '님이 입장하셨습니다.',
		type: 'TALK',
		memberId: NumberMemberId,
		roomString: `${roomId}`,
		roomId: `${roomId}`,
	});

	const onChange = useCallback((e) => {
		const MessageObj: MessageObjectType = {
			memberName: `${userInfo.name}`,
			message: e.target.value,
			type: 'TALK',
			memberId: NumberMemberId,
			roomString: `${roomId}`,
			roomId: `${roomId}`,
		};
		setMessageObject(MessageObj);
	}, []);
	const onValid = (e) => {
		// const MessageObj: MessageObjectType = {
		// 	memberName: `${userInfo.name}`,
		// 	message: e.message,
		// 	type: 'TALK',
		// 	memberId: NumberMemberId,
		// 	roomString: `${roomId}`,
		// 	roomId: `${roomId}`,
		// };
		// console.log('e.message!!!!', e.message);

		// setMessageObject(MessageObj);
		reset();
		send();
	};

	useEffect(() => {
		// instance
		// 	.get(`${process.env.REACT_APP_STACK_SERVER}/rooms/${params.id}`)
		// 	.then((res) => {
		// 		setTitle(res.data.title);
		// 	})
		// 	.catch((err) => console.log('방이 없어'));
		getRoomById(roomId)
			.then((res) => {
				setTitle(res.data.title);
				setPeople((prev) => [
					...prev,
					{ name: userInfo.name, id: NumberMemberId },
				]);
			})
			.then(
				() =>
					(client.onConnect = function (frame) {
						console.log('서버 연결완료');
						wsSubscribe();
					}),
			)
			.catch((err) => {
				navigate('/');
				alert('해당 방이 존재하지 않습니다!');
			});
	}, []);
	const client = new StompJS.Client({
		brokerURL: `${process.env.REACT_APP_STACK_WS_SERVER}/ws/websocket`,
		connectHeaders: {
			login: 'user',
			passcode: 'password',
		},
		// debug: function (str) {
		// 	console.log(str);
		// },
		reconnectDelay: 5000,
		heartbeatIncoming: 4000,
		heartbeatOutgoing: 4000,
	});

	client.onStompError = function (frame) {
		console.log('Broker reported error: ' + frame.headers['message']);
		console.log('Additional details: ' + frame.body);
	};
	if (!client.connected) {
		client.activate();
	}

	const send = () => {
		setTimeout(
			() =>
				client.publish({
					destination: `/pub/chat/sendMessage/${roomId}`,
					body: JSON.stringify(messageObject),
				}),
			300,
		);

		// client.unsubscribe('user');
		console.log('연결 상태', client.connected);
	};

	// useEffect(() => {
	// 	send();
	// }, [messageObject]);

	const message_callback = function (message) {
		console.log('메세지콜백 바디', message.body);
		const receiveMessage = JSON.parse(message.body).message;
		const receiveUser = JSON.parse(message.body).memberName;
		setReceiveMessageObject((prev) => [
			...prev,
			{ user: receiveUser, message: receiveMessage },
		]);
		// client.unsubscribe('user');
		console.log('subscribe msg', receiveMessage, receiveUser);
	};

	const wsSubscribe = () => {
		client.subscribe(`/sub/chat/room/${roomId}`, message_callback, {
			id: 'user',
		});
		console.log('subscribe 함수 작동!');
		console.log('연결상태', client.connected);
	};

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
								<Chatting
									receiveMessageObject={receiveMessageObject}></Chatting>
							</ChatSection>
						</ChatLeft>
						<ChatRight>
							<PlaylistPart />
							<PeoplePart people={people} />
						</ChatRight>
					</ChatRoomContainer>
					<ChatFooter>
						<MessageSection>
							<MessageForm onSubmit={handleSubmit(onValid)}>
								<MessageInput
									{...register('message')}
									placeholder="하고 싶은 말을 입력하세요!"
									onChange={onChange}></MessageInput>
								{/* <MessageInput
									{...register('message', { required: true })}
									placeholder="하고 싶은 말을 입력하세요!"></MessageInput> */}
							</MessageForm>
						</MessageSection>
					</ChatFooter>
				</Container>
			</TotalContainer>
		</>
	);
};

export default Room;
