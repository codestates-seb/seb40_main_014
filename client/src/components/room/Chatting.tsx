import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

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
	font-weight: 700;
`;
const ChatMessage = styled.div`
	font-size: ${(props) => props.theme.fontSize.small};
	line-height: ${(props) => props.theme.fontSize.large};
`;

const Chatting = ({ messageObject }) => {
	return (
		<>
			{messageObject.map((e, index) => {
				return (
					<ChatContainer key={index}>
						<ChatUser>{e.username}</ChatUser>
						<ChatMessage>{e.message}</ChatMessage>
					</ChatContainer>
				);
			})}
		</>
	);
};

export default Chatting;
