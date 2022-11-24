import * as StompJS from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// const Chat = () => {
// 	const [content, setContent] = useState('');
// 	const [msg, setMsg] = useState('');
// 	const [connectCheck, setConnectCheck] = useState(true);
// 	const clinet = useRef({});

// 	const client = new StompJS.Client({
// 		brokerURL: `${process.env.REACT_APP_STACK_WS_SERVER}/ws/websocket`,
// 		connectHeaders: {
// 			login: 'user',
// 			passcode: 'password',
// 		},
// 		debug: function (str) {
// 			console.log(str);
// 		},
// 		reconnectDelay: 5000,
// 		heartbeatIncoming: 4000,
// 		heartbeatOutgoing: 4000,
// 	});

// 	client.onConnect = function (frame) {
// 		console.log('onConnect 함수 : ', frame);
// 		wsSubscribe();
// 	};

// 	client.onStompError = function (frame) {
// 		console.log('Broker reported error: ' + frame.headers['message']);
// 		console.log('Additional details: ' + frame.body);
// 	};

// 	const disconnect = () => {
// 		client.deactivate();
// 	};

// 	client.activate();
// 	const check = () => {
// 		console.log(client.connected);
// 	};

// 	const onChange = (e) => {
// 		setMsg(e.target.value);
// 	};

// 	const send = () => {
// 		client.publish({
// 			destination: '/pub/chat/sendMessage/2c9f8a2d84a337290184a337b6300000',
// 			body: JSON.stringify({
// 				memberName: '송준모',
// 				message: msg,
// 				type: 'TALK',
// 				memberId: 1,
// 				roomString: '2c9f8a2d84a337290184a337b6300000',
// 				roomId: '2c9f8a2d84a337290184a337b6300000',
// 			}),
// 		});
// 		setConnectCheck(!connectCheck);
// 		console.log('연결 상태', client.connected);
// 	};

// 	const message_callback = function (message) {
// 		// called when the client receives a STOMP message from the server

// 		const newMessage = JSON.parse(message.body).message;
// 		const newMessageBody = JSON.parse(message.body);
// 		console.log('바디 정보!!!', newMessageBody);

// 		setContent(newMessage);
// 		console.log('subscribe msg', newMessage);

// 		// if (message.body) {
// 		// 	alert('got message with body ' + message.body);
// 		// } else {
// 		// 	alert('got empty message');
// 		// }
// 	};

// 	// const headers = { ack: 'client' };
// 	// client.subscribe(
// 	// 	'sub/chat/room/2c9f8a2d84a257240184a2b272630006',
// 	// 	message_callback,
// 	// 	headers,
// 	// );

// 	const wsSubscribe = () => {
// 		client.subscribe(
// 			'/sub/chat/room/2c9f8a2d84a337290184a337b6300000',
// 			message_callback,
// 			{ id: 'user' },
// 		);
// 		console.log('subscribe 함수 작동!');
// 		console.log('연결상태', client.connected);
// 	};

// 	return (
// 		<>
// 			<h1>채팅 테스트</h1>
// 			<div>
// 				<button onClick={disconnect}>연결 해제</button>
// 			</div>
// 			<div>
// 				<button onClick={check}>연결 체크</button>
// 			</div>
// 			<div></div>
// 			<Container>
// 				<input onChange={onChange}></input>
// 				<button onClick={send}> 메세지 전송 </button>
// 			</Container>
// 			<Container>
// 				<div>{content}</div>
// 			</Container>
// 		</>
// 	);
// };

const Chat = () => {
	const client = useRef({});
	return null;
};
export default Chat;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;
