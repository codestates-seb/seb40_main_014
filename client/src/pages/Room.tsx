import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import PlaylistPart from '../components/room/Playlist';
import PeoplePart from '../components/room/PeopleList';
import Chatting from '../components/room/Chatting';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
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
	margin-top: -100px;
	@media screen and (max-width: 640px) {
		width: 300px;
	}
`;

const Container = styled.div`
	width: 900px;
	border: 1px solid ${(props) => props.theme.colors.gray300};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
	border: 1px solid ${(props) => props.theme.colors.gray300};
	background-color: ${(props) => props.theme.colors.background};
	margin-bottom: 40px;
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

const ExitButton = styled.button`
	padding: 3px 7px;
	margin-left: 12px;
	background-color: ${(props) => props.theme.colors.white};
	color: ${(props) => props.theme.colors.purple};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	transition: 0.1s;
`;

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
	::-webkit-scrollbar {
		display: none;
	}
	:hover {
		::-webkit-scrollbar {
			display: block;
			width: 8px;
		}

		::-webkit-scrollbar-thumb {
			height: 30%;
			background-color: ${(props) => props.theme.colors.gray300};

			border-radius: 10px;
		}

		::-webkit-scrollbar-track {
			background: rgba(33, 122, 244, 0.1);
			border-radius: 10px;
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
	padding: 3px 7px;
	margin-left: 12px;
	background-color: ${(props) => props.theme.colors.white};
	color: ${(props) => props.theme.colors.purple};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	transition: 0.1s;
`;

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

type PlayListInfoProps = {
	channelTitle?: string;
	thumbnail: string;
	title: string;
	url: string;
	videoId: string;
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

const ExitBtn = styled.button``;

const Room = () => {
	const { register, handleSubmit, reset } = useForm<MessageInfo>();
	const userInfo = useSelector((state: RootState) => state.my.value);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [playlist, setPlaylist] = useState<PlayListInfoProps[]>([]);
	const [isConnect, setIsConnect] = useState(true);
	const navigate = useNavigate();
	const modalClose = () => {
		if (isAdmin) {
			setModalOpen(!modalOpen);
		} else {
			alert('방 수정은 방장만 가능합니다!');
		}
	};
	const [people, setPeople] = useState<string[]>([]);
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

	const enterMessage: MessageObjectType = {
		memberName: `${userInfo.name}`,
		message: '님이 입장하셨습니다.',
		type: 'ENTER',
		memberId: NumberMemberId,
		roomString: `${roomId}`,
		roomId: `${roomId}`,
	};

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
		reset();
		send();
	};
	// useEffect(() => {
	// 	getRoomById(roomId).then((res) => {
	// 		setTitle(res.data.title);
	// 		setPeople((prev) => [
	// 			...prev,
	// 			{ name: userInfo.name, id: NumberMemberId },
	// 		]);
	// 	});
	// }, []);
	useEffect(() => {
		getRoomById(roomId)
			.then((res) => {
				setTitle(res.data.title);
				setPlaylist(res.data.playlistResponseDto.playlistItems);
				if (!client.connected && isConnect) {
					client.activate();
				}
				wsSubscribe();

				return res;
			})
			.then((res) => {
				// setTimeout(
				// 	() =>

				// 	500,
				// );
				client.publish({
					destination: `/pub/chat/enterUser`,
					body: JSON.stringify(enterMessage),
				});
				return res;
			})
			.then((res) => {
				// 유저리스트에 추가, 방장인지 확인
				getRoomById(roomId)
					.then(() => {
						console.log('퍼블리시 보내고 난 후에 데이터', res.data);
						setPeople(res.data.userlist);
						NumberMemberId === res.data.memberResponseDto.memberId
							? setIsAdmin(true)
							: setIsAdmin(false);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				navigate('/');
				alert('해당 방이 존재하지 않습니다!');
				console.log(err);
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
		reconnectDelay: 200,
		heartbeatIncoming: 4000,
		heartbeatOutgoing: 4000,
	});

	client.onStompError = function (frame) {
		console.log('Broker reported error: ' + frame.headers['message']);
		console.log('Additional details: ' + frame.body);
	};
	if (!client.connected && isConnect) {
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

		// console.log('연결 상태', client.connected);
	};

	const message_callback = function (message) {
		const receiveMessage = JSON.parse(message.body).message;
		const receiveUser = JSON.parse(message.body).memberName;
		setReceiveMessageObject((prev) => [
			...prev,
			{ user: receiveUser, message: receiveMessage },
		]);
		console.log('subscribe msg', receiveMessage, receiveUser);
		if (receiveMessage.slice(-8) === '입장하셨습니다.') {
			console.log('ho');
		}
	};

	const wsSubscribe = () => {
		client.subscribe(`/sub/chat/room/${roomId}`, message_callback, {
			id: 'user',
		});
		console.log('subscribe 함수 작동!');
		console.log('연결상태', client.connected);
	};

	const onClick = (e) => {
		client.publish({
			destination: `/pub/chat/leave`,
			body: JSON.stringify({
				memberName: `${userInfo.name}`,
				message: '',
				type: 'LEAVE',
				memberId: NumberMemberId,
				roomString: `${roomId}`,
				roomId: `${roomId}`,
			}),
		});
		client.deactivate();
		setIsConnect(false);
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
									setTitle={setTitle}
									modalOpen={modalOpen}
									setModalOpen={setModalOpen}
								/>
							)}
							<ExitBtn>
								<Link to="/">
									<ExitButton onClick={onClick}>방 나가기</ExitButton>
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
							<PlaylistPart playlist={playlist} />
							<PeoplePart roomId={roomId} people={people} isAdmin={isAdmin} />
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
