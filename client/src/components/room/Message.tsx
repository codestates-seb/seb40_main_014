import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import axios from 'axios';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef } from 'react';

export type MessageInfo = {
	memberId?: string;
	message?: string;
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
const Message = () => {
	const { register, handleSubmit, reset } = useForm<MessageInfo>();
	const userInfo = useSelector((state: RootState) => state.my.value);

	const client = new StompJs.Client({
		brokerURL:
			'ws://ec2-3-36-120-103.ap-northeast-2.compute.amazonaws.com:8080/',
		connectHeaders: {
			login: 'user',
			passcode: 'password',
		},
		debug: function (str) {
			console.log('str', str);
		},
		reconnectDelay: 5000, //자동 재 연결
		heartbeatIncoming: 4000,
		heartbeatOutgoing: 4000,
	});

	client.onConnect = function (frame) {
		console.log('success', frame);
	};

	client.onStompError = function (frame) {
		console.log('Broker reported error: ' + frame.headers['message']);
		console.log('Additional details: ' + frame.body);
	};

	// client.activate();

	const onValid = (e) => {
		const MessageObj = {
			type: 'ENTER',
			roomId: 'sadad',
			memberId: 1,
			message: e.message,
		};
		console.log('mes_obj', JSON.stringify(MessageObj));
		console.log(`${process.env.REACT_APP_STACK_WS_SERVER}`);
		axios
			.post(
				`${process.env.REACT_APP_STACK_WS_SERVER}/chat`,
				JSON.stringify(MessageObj),
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
		console.log(e.message);
		reset();
	};

	return (
		<>
			<MessageForm onSubmit={handleSubmit(onValid)}>
				<MessageInput
					{...register('message', { required: true })}
					placeholder="하고 싶은 말을 입력하세요!"></MessageInput>
			</MessageForm>
		</>
	);
};

export default Message;
