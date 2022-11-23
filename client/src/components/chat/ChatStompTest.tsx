import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let client: Client | null = null;

const StompChat = () => {
	const [content, setContent] = useState('');

	const addContent = (message: string) => {
		setContent(content.concat(message));
	};

	const subscribe = () => {
		if (client != null) {
			client.subscribe(
				'sub/chat/room/c399a998-2e6d-46b7-ba09-bfc60a787803',
				(data: any) => {
					const newMessage: string = JSON.parse(data.body).message as string;
					addContent(newMessage);
				},
			);
		}
	};

	const publish = (message: string) => {
		if (client != null) {
			if (!client.connected) return;

			console.log('client.connected', client.connected);

			client.publish({
				destination: 'pub/chat/sendMessage',
				body: JSON.stringify({
					message: message,
					type: 'TALK',
					roomId: 'c399a998-2e6d-46b7-ba09-bfc60a787803',
					memberId: 1,
				}),
			});
		}
	};

	const connect = () => {
		client = new Client({
			brokerURL: `${process.env.REACT_APP_STACK_WS_SERVER}/ws/websocket`,
			debug: function (str) {
				console.log(str);
			},
			onConnect: () => {
				subscribe();
			},
			webSocketFactory: () =>
				new SockJS(`${process.env.REACT_APP_STACK_SERVER}/ws`),
		});

		client.activate();
	};

	const disConnect = () => {
		if (client != null) {
			if (client.connected) client.deactivate();
		}
	};

	useEffect(() => {
		connect();
		return () => disConnect();
	}, []);

	return (
		<>
			<div>
				<div id="menu">
					<p>Welcome,</p>
				</div>
				<div>{content}</div>
				<input
					type="text"
					value={content}
					onChange={(e) => {
						setContent(e.target.value);
					}}
				/>
				<button onClick={() => publish(content)}>전송</button>
				{/* <Container sendMessage={handler} /> */}
			</div>
		</>
	);
};

export default StompChat;
