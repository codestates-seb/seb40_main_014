import { useForm } from 'react-hook-form';
import styled from 'styled-components';

export type MessageInfo = {
	userId?: string;
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

	const onValid = (e) => {
		console.log(e);
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
