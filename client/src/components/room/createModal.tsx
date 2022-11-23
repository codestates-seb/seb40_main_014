import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import RoomCreateForm from './RoomCreateForm';
import { IoClose } from 'react-icons/io5';

export type roomInfo = {
	title: string;
	password?: string;
	category: string[];
	people: string;
};

const ModalContaincer = styled.div`
	font-size: ${(props) => props.theme.fontSize.small};
	background-color: ${(props) => props.theme.colors.background};
	width: 550px;
	height: 500px;
	box-shadow: ${(props) => props.theme.colors.gray400} 0px 5px 12px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 8888;

	@media screen and (max-width: 640px) {
		width: 350px;
		height: 500px;
	}
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius}
		${(props) => props.theme.radius.largeRadius} 0px 0px;
	margin-bottom: 10px;
`;

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 15px;
	font-size: ${(props) => props.theme.fontSize.medium};
`;
const ModalOverlay = styled.div`
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(2px);
	z-index: 7777;
	position: fixed;
`;

export const ExitBtn = styled.button`
	font-size: ${(props) => props.theme.fontSize.large};
`;

const CreateModal = ({ modalOpen, setModalOpen }) => {
	const onClick = () => {
		setModalOpen(!modalOpen);
	};

	return (
		<>
			<ModalOverlay></ModalOverlay>
			<ModalContaincer>
				<ModalHeader>
					<HeaderContent>
						<div>방 만들기</div>
					</HeaderContent>
					<HeaderContent>
						<ExitBtn onClick={onClick}>
							<IoClose />
						</ExitBtn>
					</HeaderContent>
				</ModalHeader>
				<RoomCreateForm />
			</ModalContaincer>
		</>
	);
};

export default CreateModal;
