import styled from 'styled-components';

const ChatContainer = styled.div`
	margin: 10px;
	padding: 10px;
	border-bottom: 1px solid ${(props) => props.theme.colors.gray200};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	background: linear-gradient(0deg, #fff 0%, #f2e5fd 100%);
	box-shadow: 0px 2px 2px 0px #f2e5fd;
`;
const ChatUser = styled.div`
	font-size: ${(props) => props.theme.fontSize.xSmall};
	margin-bottom: 15px;
	/* color: #711abd; */
	color: ${(props) => props.theme.colors.purple};
	font-weight: 700;
`;
const ChatMessage = styled.div`
	font-size: ${(props) => props.theme.fontSize.small};
	line-height: ${(props) => props.theme.fontSize.medium};
`;
const Chatting = () => {
	return (
		<>
			<ChatContainer>
				<ChatUser>문지훈</ChatUser>
				<ChatMessage>안녕하세요</ChatMessage>
			</ChatContainer>
			<ChatContainer>
				<ChatUser>송준모</ChatUser>
				<ChatMessage>여러분</ChatMessage>
			</ChatContainer>
			<ChatContainer>
				<ChatUser>홍유진</ChatUser>
				<ChatMessage>모두</ChatMessage>
			</ChatContainer>
			<ChatContainer>
				<ChatUser>김아리</ChatUser>
				<ChatMessage>화이팅</ChatMessage>
			</ChatContainer>
			<ChatContainer>
				<ChatUser>노영석</ChatUser>
				<ChatMessage>해여</ChatMessage>
			</ChatContainer>
			<ChatContainer>
				<ChatUser>정경은</ChatUser>
				<ChatMessage>^^</ChatMessage>
			</ChatContainer>
			<ChatContainer>
				<ChatUser>송준모</ChatUser>
				<ChatMessage>
					긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트
				</ChatMessage>
			</ChatContainer>
			<ChatContainer>
				<ChatUser>송준모</ChatUser>
				<ChatMessage>
					긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트
				</ChatMessage>
			</ChatContainer>
			<ChatContainer>
				<ChatUser>송준모</ChatUser>
				<ChatMessage>
					긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴 텍스트 테스트 긴
					텍스트 테스트
				</ChatMessage>
			</ChatContainer>
		</>
	);
};

export default Chatting;
