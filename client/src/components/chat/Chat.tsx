import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { over } from 'stompjs';
import { useState } from 'react';
import styled from 'styled-components';

const Chat = () => {
	let stompClient = null;
	const [publicChats, setPublicChats] = useState([]);
	const [userData, setUserData] = useState({
		username: '',
		receivername: '',
		connected: false,
		message: '',
	});
	const connect = () => {
		const Sock = new SockJS(
			'http://ec2-3-36-120-103.ap-northeast-2.compute.amazonaws.com:8080/ws',
		);
		stompClient = over(Sock);
		stompClient.connect({}, onConnected, onError);
		console.log('Stomp Client : ', stompClient);
	};

	const onConnected = () => {
		setUserData({ ...userData, connected: true });
		stompClient.subscribe(
			'/chat/room/2c9f8a2d84986fe90184987e57eb0000',
			onMessageReceived,
		);
	};
	const onError = (err) => {
		console.log(err);
	};
	const onMessageReceived = (payload) => {
		const payloadData = JSON.parse(payload.body);
		console.log('payload', payload);
		switch (payloadData.type) {
			case 'ENTER':
				publicChats.push(payloadData);
				setPublicChats([...publicChats]);
				break;
		}
	};

	const registerUser = () => {
		connect();
	};

	const handleMessage = (event) => {
		const { value } = event.target;
		setUserData({ ...userData, message: value });
	};

	const sendValue = () => {
		if (stompClient) {
			const chatMessage = {
				senderName: '송준모',
				message: userData.message,
				type: 'ENTER',
			};
			console.log(chatMessage);
			stompClient.send('/chat/enterUser', {}, JSON.stringify(chatMessage));
			setUserData({ ...userData, message: '' });
		}
	};
	return (
		<Container>
			<h1>채팅 테스트</h1>
			<button onClick={registerUser}>연결</button>
			<div className="send-message">
				<input
					type="text"
					className="input-message"
					placeholder="enter the message"
					value={userData.message}
					onChange={handleMessage}
				/>
				<button type="button" className="send-button" onClick={sendValue}>
					send
				</button>
			</div>
		</Container>
	);
};

export default Chat;

const Container = styled.div``;
