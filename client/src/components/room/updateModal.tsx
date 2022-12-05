import styled from 'styled-components';
import RoomUpdateForm from './RoomUpdateForm';
import { ModalBackdrop } from '../home/LoginModal';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

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
	font-size: ${(props) => props.theme.fontSize.small};
`;

export const ExitBtn = styled.button`
	font-size: ${(props) => props.theme.fontSize.medium};
`;

const UpdateRoomModal = ({ modalOpen, setModalOpen, setTitle, title }) => {
	const onClick = () => {
		setModalOpen(!modalOpen);
	};

	// 모달 오픈시 스크롤 막기
	useEffect(() => {
		document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100vw;`;
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
							<IoClose />
						</ExitBtn>
					</HeaderContent>
				</ModalHeader>
				<RoomUpdateForm
					title={title}
					setTitle={setTitle}
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
				/>
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
