import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import PlaylistPart from '../components/room/Playlist';
import PeoplePart from '../components/room/PeopleList';
import Chatting from '../components/room/Chatting';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import UpdateRoomModal from '../components/room/updateModal';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useForm } from 'react-hook-form';
import instance from '../api/root';
import { checkRoomByName, deleteRoom, getRoomById } from '../api/roomApi';
import * as StompJS from '@stomp/stompjs';
import { myLogin } from '../slices/mySlice';

const TotalContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: -90px;
	height: 90vh;
	@media screen and (max-width: 640px) {
		display: flex;
		justify-content: center;
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
	@media screen and (min-width: 640px) and (max-width: 980px) {
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
	@media screen and (min-width: 640px) and (max-width: 980px) {
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

const ChatHeaderContent = styled.div`
	@media screen and (max-width: 640px) {
		display: flex;
		justify-content: space-between;
		.title {
			width: 100px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		button {
			height: 29px;
			font-size: ${(props) => props.theme.fontSize.xSmall};
		}
	}
`;

const ChatLeft = styled.div`
	height: 600px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	background-color: ${(props) => props.theme.colors.background};

	@media screen and (min-width: 640px) and (max-width: 980px) {
		width: 200px;
	}
	@media screen and (max-width: 640px) {
		width: 98%;
		margin-left: 5px;
		height: 220px;
	}
`;

const ChatRight = styled.div`
	@media screen and (min-width: 640px) and (max-width: 980px) {
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
	@media screen and (min-width: 640px) and (max-width: 980px) {
		width: 90%;
	}
	@media screen and (max-width: 640px) {
		width: 85%;
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
	const isLogin = useSelector(myLogin);
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [playlist, setPlaylist] = useState<PlayListInfoProps[]>([]);
	const [userLength, setUserLength] = useState<number>(0);
	// const [isConnect, setIsConnect] = useState(true);
	const navigate = useNavigate();
	const modalClose = () => {
		if (isAdmin) {
			setModalOpen(!modalOpen);
		} else {
			Swal.fire({
				icon: 'warning',
				text: '방 수정은 방장만 가능합니다!',
			});
			// alert('방 수정은 방장만 가능합니다!');
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

	useEffect(() => {
		if (isLogin) {
			checkRoomByName(roomId, userInfo.name).then((res) => {
				// console.log('니 뭔데', res);
				if (res.response?.status !== 404 && res) {
					navigate('/');
					Swal.fire({
						icon: 'warning',
						text: '이미 참여중인 방입니다!',
					});
				} else {
					getRoomById(roomId)
						.then((res) => {
							setTitle(res.data.title);
							setPlaylist(res.data.playlistResponseDto.playlistItems);
							// if (!client.connected && isConnect) {
							// 	client.activate();
							// }
							wsSubscribe();

							return res;
						})
						.then((res) => {
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
							Swal.fire({
								icon: 'warning',
								title: '존재하지 않는 방',
								text: '해당 방이 존재하지 않습니다!',
							});
							console.log(err);
						});
				}
			});
		} else {
			Swal.fire({
				icon: 'warning',
				text: '채팅방은 로그인 후 입장가능합니다!',
			});
			navigate('/');
		}
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
	if (!client.connected) {
		client.activate();
	}

	const send = () => {
		// setTimeout(
		// 	() =>
		// 		client.publish({
		// 			destination: `/pub/chat/sendMessage/${roomId}`,
		// 			body: JSON.stringify(messageObject),
		// 		}),
		// 	300,
		// );
		client.publish({
			destination: `/pub/chat/sendMessage/${roomId}`,
			body: JSON.stringify(messageObject),
		});

		// console.log('연결 상태', client.connected);
	};

	const message_callback = function (message) {
		const receiveMessage = JSON.parse(message.body).message;
		const receiveUser = JSON.parse(message.body).memberName;
		const receiveType = JSON.parse(message.body).type;
		if (receiveMessage) {
			setReceiveMessageObject((prev) => [
				...prev,
				{ user: receiveUser, message: receiveMessage },
			]);
		}

		console.log('나의 테스트', message.body);
		console.log('subscribe msg', receiveMessage, receiveUser);
		if (receiveType === `ENTER` || receiveType === `LEAVE`) {
			getRoomById(roomId)
				.then((res) => {
					setPeople(res.data.userlist);
					setUserLength(res.data.userlist.length);
				})
				.catch((err) => {
					console.log(err);
				});
		}

		if (receiveType === `LEAVE` && userInfo.name === receiveUser) {
			console.log('ho2');
			client.deactivate();
			console.log(client.connected);
		}
	};

	const wsSubscribe = () => {
		client.subscribe(`/sub/chat/room/${roomId}`, message_callback, {
			id: 'user',
		});
		// console.log('subscribe 함수 작동!');
		// console.log('연결상태', client.connected);
	};
	const leave = () => {
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
	};
	const onClick = (e) => {
		if (userLength !== 1) {
			leave();
			navigate('/');
		} else {
			Swal.fire({
				icon: 'warning',
				text: `방에 유저가 없을 경우 방이 삭제됩니다. 정말 나가시겠습니까?`,
				showCancelButton: true,
				confirmButtonText: '삭제',
				cancelButtonText: '취소',
			}).then((res) => {
				if (res.isConfirmed) {
					leave();
					deleteRoom(roomId).then(() => navigate('/'));
				}
			});
		}
	};

	const preventGoBack = () => {
		history.pushState(null, '', location.href);
		Swal.fire({
			icon: 'warning',
			text: '채팅방에서는 뒤로가기를 할 수 없습니다! 방 나가기를 눌러서 홈페이지로 이동해주세요',
		});
	};

	// 브라우저에 렌더링 시 한 번만 실행하는 코드
	useEffect(() => {
		(() => {
			history.pushState(null, '', location.href);
			window.addEventListener('popstate', preventGoBack);
		})();

		return () => {
			window.removeEventListener('popstate', preventGoBack);
		};
	}, []);

	return (
		<>
			{' '}
			<TotalContainer>
				<Container>
					<ChatHeader>
						<ChatHeaderContent>
							<div className="title">{title}</div>
						</ChatHeaderContent>
						<ChatHeaderContent>
							<UpdateRoomBtn onClick={modalClose}>방 수정</UpdateRoomBtn>

							{modalOpen && (
								<UpdateRoomModal
									title={title}
									setTitle={setTitle}
									modalOpen={modalOpen}
									setModalOpen={setModalOpen}
								/>
							)}
							<ExitBtn>
								<ExitButton onClick={onClick}>방 나가기</ExitButton>
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
									onChange={onChange}
									autoComplete="off"></MessageInput>
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
