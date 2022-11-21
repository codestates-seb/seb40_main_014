import React, { useEffect, useState } from 'react';

import * as StompJS from '@stomp/stompjs';

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
			onConnect: () => {
				wsSubscribe();
			},
			debug: function (str) {
				console.log('debug', str);
			},
		});
		client.activate();
	};

	const onClick = (message: string) => {
		console.log(client.connected);
		console.log(message);
		if (!client.connected) return;

		// client.publish({
		// 	destination: 'pub/chat/enterUser',
		// 	body: JSON.stringify({
		// 		message: message,
		// 		type: 'ENTER',
		// 		roomId: '2c9f8a2d84986fe90184987e57eb0000',
		// 		memberId: 1,
		// 	}),
		// });
	};

	const wsSubscribe = () => {
		client.subscribe(
			'sub/chat/room/2c9f8a2d84986fe90184987e57eb0000',
			(msg) => {
				const newMessage = JSON.parse(msg.body).message;
				setContent(newMessage);
				console.log('msg', msg);
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
				{/* <button onClick={wsDisconnect}>연결해제</button> */}
			</div>
		</>
	);
};

export default StompChat;
