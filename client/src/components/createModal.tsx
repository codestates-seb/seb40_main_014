import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import RoomCreateForm from './RoomCreateForm';

export type roomInfo = {
	title: string;
	password?: string;
	category: string[];
	content: string;
	people: string;
};

const ModalContaincer = styled.div`
	font-size: var(--x-small);
	background-color: var(--background-color);
	width: 550px;
	height: 500px;
	box-shadow: var(--gray-400) 0px 5px 12px;
	border-radius: var(--radius);
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
`;

const ModalHeader = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: var(--purple);
	color: var(--white);
	border-radius: var(--radius) var(--radius) 0px 0px;
	margin-bottom: 10px;
`;

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 15px;
`;
const ModalOverlay = styled.div`
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(2px);
	z-index: 1;
	position: fixed;
`;

const ExitBtn = styled.button`
	font-size: var(--x-medium);
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
							<ImExit />
						</ExitBtn>
					</HeaderContent>
				</ModalHeader>
				<RoomCreateForm />
			</ModalContaincer>
		</>
	);
};

export default CreateModal;
