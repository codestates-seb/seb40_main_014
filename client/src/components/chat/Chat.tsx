import * as SockJS from 'sockjs-client';
import * as StompJS from '@stomp/stompjs';

// const Chat = () => {
// const client = new StompJS.Client({
// 	brokerURL: 'ws://localhost:8001/ws',
// 	connectHeaders: {
// 		login: 'user',
// 		passcode: 'password',
// 	},
// 	debug: function (str) {
// 		console.log(str);
// 	},
// 	reconnectDelay: 5000, //자동 재 연결
// 	heartbeatIncoming: 4000,
// 	heartbeatOutgoing: 4000,
// });

// 	client.onConnect = function (frame) {
// 		// Do something, all subscribes must be done is this callback
// 		// This is needed because this will be executed after a (re)connect
// 	};

// 	client.onStompError = function (frame) {
// 		// Will be invoked in case of error encountered at Broker
// 		// Bad login/passcode typically will cause an error
// 		// Complaint brokers will set `message` header with a brief message. Body may contain details.
// 		// Compliant brokers will terminate the connection after any error
// 		console.log('Broker reported error: ' + frame.headers['message']);
// 		console.log('Additional details: ' + frame.body);
// 	};

// 	client.deactivate();

// 	client.publish({
// 		destination: '/topic/general',
// 		body: 'Hello world',
// 		headers: { priority: '9' },
// 	});

// 	const callback = (message) => {
// 		// called when the client receives a STOMP message from the server
// 		if (message.body) {
// 			alert('got message with body ' + message.body);
// 		} else {
// 			alert('got empty message');
// 		}
// 	};

// 	const subscription = client.subscribe('/queue/test', callback);

// 	return null;
// };

// export default Chat;
