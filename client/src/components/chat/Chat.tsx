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
			'/chat/room/5d00aadc-e8f0-4020-a2da-f105e2e84d50',
			onMessageReceived,
		);
	};
	const onError = (err) => {
		console.log(err);
	};
	const onMessageReceived = (payload) => {
		const payloadData = JSON.parse(payload.body);
		console.log('payload', payload);
		switch (payloadData.status) {
			case 'MESSAGE':
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
				senderName: userData.username,
				message: userData.message,
				status: 'MESSAGE',
			};
			console.log(chatMessage);
			stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
			setUserData({ ...userData, message: '' });
		}
	};
	return (
		<Container>
			<h1>채팅 테스트</h1>
			<button onClick={registerUser}>연결</button>
		</Container>
	);
};

export default Chat;

const Container = styled.div``;
