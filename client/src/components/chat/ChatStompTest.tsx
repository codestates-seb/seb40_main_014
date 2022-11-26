import React, { useEffect, useState } from 'react';

import * as StompJS from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const StompChat = () => {
	const [ms, setMs] = useState('');
	const [content, setContent] = useState('');
	const client = new StompJS.Client();

	useEffect(() => {
		connect();
		console.log('연결상태', client.connected);
		return () => wsDisconnect();
	}, []);

	const connect = () => {
		client.configure({
			brokerURL: `${process.env.REACT_APP_STACK_WS_SERVER}/ws/websocket`, // 왜 websocket을 붙여줘야하는거지..?
			// webSocketFactory: () => new SockJS("/ws"),
			connectHeaders: {
				login: 'user',
				password: 'password',
			},
			onConnect: (e) => {
				console.log('onConnect event:', e);
				wsSubscribe();
			},
			debug: function (str) {
				console.log('debug', str);
			},
			webSocketFactory: () =>
				new SockJS(`${process.env.REACT_APP_STACK_SERVER}/ws`),
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
		});
		client.activate();
	};

	const onClick = (message: string) => {
		console.log(client.connected);
		console.log('메세지', message);
		if (!client.connected) {
			console.log('클라이언트 커넥트 상태 : ', client.connected);
			// client.activate();
			return;
		}

		client.publish({
			destination: 'pub/chat/sendMessage',
			body: JSON.stringify({
				message: message,
				type: 'ENTER',
				roomId: 'c399a998-2e6d-46b7-ba09-bfc60a787803',
				memberId: 1,
			}),
		});
	};

	const wsSubscribe = () => {
		client.subscribe(
			'sub/chat/room/c399a998-2e6d-46b7-ba09-bfc60a787803',
			(msg) => {
				const newMessage = JSON.parse(msg.body).message;
				setContent(newMessage);
				console.log('subscribe msg', msg);
			},
			{ id: 'user' },
		);
		console.log('subscribe 함수 작동!');
		console.log('연결상태', client.connected);
	};

	const wsDisconnect = () => {
		client.deactivate();
	};

	const onChange = (e) => {
		e.preventDefault();
		setMs(e.target.value);
	};
	return (
		<>
			<div>
				<div id="menu">
					<p>Welcome,</p>
				</div>
				<div>{content}</div>
				<input onChange={onChange} name={'ms'} />
				<button
					type={'button'}
					onClick={() => {
						onClick(ms);
						setMs('');
					}}>
					전송
				</button>
				<button onClick={wsDisconnect}>연결해제</button>
			</div>
		</>
	);
};

export default StompChat;
