import React, { useEffect, useState } from 'react';

const Chattest = () => {
	// chatting 토클 상태
	const [live, setLive] = useState(false);
	// 메세지 유저 및 내용
	const [message, setMessage] = useState('');
	//서버 url
	const [serverUrl, setServerUrl] = useState<any>('');
	// 서버로 부터 받아온 내용
	const [chat, setChat] = useState([]);

	const [sockjs, setSockjs] = useState<any>();
	const [receivedData, setReceivedData] = useState('');

	// useEffect(() => {
	// 	console.log(chat);
	// }, [chat]);

	useEffect(() => {
		if (receivedData === '') return;
		setChat([...chat, { name: 'Server', message: receivedData }]);
	}, [receivedData]);

	const onClickConnectBtn = () => {
		const sock = new WebSocket(`${process.env.REACT_APP_STACK_WS_SERVER}/chat`);
		sock.onmessage = function (e) {
			setReceivedData(e.data);
			console.log('server로 받은 데이터', e.data);
		};
		setSockjs(sock);
		setChat([...chat, { name: 'testUser', message: '님이 입장하셨습니다.' }]);
		setLive(true);
		console.log('sock', sock);
	};
	const onClickDisconnectBtn = () => {
		setLive(false);
	};
	const inputMessage = (e) => {
		setMessage(e.target.value);
	};
	const sendMessage = () => {
		if (message === '') return;
		setChat([...chat, { name: 'testUser', message: message }]);
		console.log('message', message);
		console.log('sockjs', sockjs);
		sockjs.send(message);
		setMessage('');
	};
	const onEnter = (e) => {
		if (e.keyCode === 13) {
			sendMessage();
		}
	};
	const renderChat = () => {
		console.log(chat);
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<>
					{name}: <>{message}</>
				</>
			</div>
		));
	};

	return (
		<div className="chatting_container">
			{!live && (
				<>
					<>Chrome Extension Chatting Application</>
					<input
						className="chatting_urlInput"
						type="text"
						placeholder="URL을 입력해주세요"
						onChange={setServerUrl}
						value={serverUrl}
					/>
					<button className="chatting_connectBtn" onClick={onClickConnectBtn}>
						연결
					</button>
				</>
			)}
			{live && (
				<>
					<div className="chatting_Room">{renderChat()}</div>
					<input
						className="chatting_messageInput"
						type="text"
						placeholder="메세지를 입력해주세요"
						onChange={inputMessage}
						onKeyDown={onEnter}
						value={message}
					/>
					<button className="chatting_sendMessage" onClick={sendMessage}>
						전송
					</button>
					<br />
					<button
						className="chatting_disConnectBtn"
						onClick={onClickDisconnectBtn}>
						연결 끊기
					</button>
				</>
			)}
		</div>
	);
};

export default Chattest;
