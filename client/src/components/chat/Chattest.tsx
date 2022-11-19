import React, { useEffect, useState, useCallback, useRef } from 'react';
import SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

const ChatTest = () => {
	// const [ms, setMs] = useState('');
	// const [content, setContent] = useState('');
	// const client = new StompJS.Client();

	// useEffect(() => {
	// 	connect();
	// 	return () => wsDisconnect();
	// }, []);

	// const connect = () => {
	// 	client.configure({
	// 		brokerURL: 'ws://localhost:8001/ws/websocket', // 왜 websocket을 붙여줘야하는거지..?
	// 		// webSocketFactory: () => new SockJS("/ws"),
	// 		connectHeaders: {
	// 			login: 'user',
	// 			password: 'password',
	// 		},
	// 		onConnect: () => {
	// 			wsSubscribe();
	// 		},
	// 		debug: function (str) {
	// 			console.log(str);
	// 		},
	// 	});

	// 	client.activate();
	// };

	// const onClick = (message: string) => {
	// 	console.log(client.connected);
	// 	console.log(message);
	// 	if (!client.connected) return;

	// 	client.publish({
	// 		destination: '/app/hello',
	// 		body: JSON.stringify({
	// 			message: message,
	// 		}),
	// 	});
	// };

	// const wsSubscribe = () => {
	// 	client.subscribe(
	// 		'/topic/message',
	// 		(msg) => {
	// 			const newMessage = JSON.parse(msg.body).message;
	// 			setContent(newMessage);
	// 		},
	// 		{ id: 'user' },
	// 	);
	// };

	// const wsDisconnect = () => {
	// 	client.deactivate();
	// };

	return null;
};

export default ChatTest;
