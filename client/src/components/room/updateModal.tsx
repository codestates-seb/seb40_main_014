import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import RoomCreateForm from './RoomCreateForm';
import RoomUpdateForm from './RoomUpdateForm';
import { ModalBackdrop } from '../home/LoginModal';
import { useEffect } from 'react';

export type roomInfo = {
	title: string;
	password?: string;
	category: string[];
	people: string;
};

const ModalContaincer = styled.div`
	font-size: ${(props) => props.theme.fontSize.xSmall};
	background-color: ${(props) => props.theme.colors.background};
	width: 550px;
	height: 500px;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	border-radius: ${(props) => props.theme.radius.largeRadius};
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 8888;
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
	font-size: ${(props) => props.theme.fontSize.small};
`;
// const ModalOverlay = styled.div`
// 	top: 0;
// 	left: 0;
// 	width: 100vw;
// 	height: 100vh;
// 	backdrop-filter: blur(2px);
// 	z-index: 1;
// 	position: fixed;
// `;

export const ExitBtn = styled.button`
	font-size: ${(props) => props.theme.fontSize.medium};
`;

const UpdateRoomModal = ({ modalOpen, setModalOpen }) => {
	const onClick = () => {
		setModalOpen(!modalOpen);
	};

	useEffect(() => {
		document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
		return () => {
			const scrollY = document.body.style.top;
			document.body.style.cssText = '';
			window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
		};
	}, []);

	return (
		<>
			<ModalContaincer>
				<ModalHeader>
					<HeaderContent>
						<div>방 수정하기</div>
					</HeaderContent>
					<HeaderContent>
						<ExitBtn onClick={onClick}>
							<ImExit />
						</ExitBtn>
					</HeaderContent>
				</ModalHeader>
				<RoomUpdateForm />
			</ModalContaincer>
			<ModalBackdrop
				onClick={(e) => {
					e.preventDefault();
					onClick();
				}}
			/>
		</>
	);
};

export default UpdateRoomModal;
