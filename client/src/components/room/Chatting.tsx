import { useState } from 'react';
import * as StompJS from '@stomp/stompjs';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ChatContainer = styled.div`
	margin: 10px;
	padding: 10px;
	border: 2px solid ${(props) => props.theme.colors.gray200};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0px 2px 2px 0px #f2e5fd;
`;
const ChatUser = styled.div`
	font-size: ${(props) => props.theme.fontSize.xSmall};
	margin-bottom: 15px;
	color: ${(props) => props.theme.colors.purple};
	font-weight: 600;
`;
const ChatMessage = styled.div`
	font-size: ${(props) => props.theme.fontSize.small};
	line-height: ${(props) => props.theme.fontSize.large};
`;

const Chatting = ({ receiveMessageObject }) => {
	return (
		<>
			{receiveMessageObject.map((e, index) => {
				return (
					<ChatContainer key={index}>
						<ChatUser>{e.user}</ChatUser>
						<ChatMessage>{e.message}</ChatMessage>
					</ChatContainer>
				);
			})}
		</>
	);
};

export default Chatting;
