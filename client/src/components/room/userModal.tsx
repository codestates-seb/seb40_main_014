import styled from 'styled-components';
import { IoClose } from 'react-icons/io5';
import { ModalBackdrop } from '../home/LoginModal';
import { useEffect } from 'react';

export type roomInfo = {
	title: string;
	password?: string;
	category: string[];
	people: string;
};

const ModalContaincer = styled.div`
	font-size: ${(props) => props.theme.fontSize.small};
	background-color: ${(props) => props.theme.colors.white};
	width: 150px;
	height: 50px;
	box-shadow: 10px 10px 30px rgba(30, 30, 30, 0.185);
	border-radius: ${(props) => props.theme.radius.largeRadius};
	position: fixed;
	top: 75%;
	left: 75%;
	transform: translate(-50%, -50%);
	z-index: 8888;
	display: flex;
	justify-content: center;
	flex-direction: column;
	border: 1px solid gray;
`;
const ModalHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius}
		${(props) => props.theme.radius.largeRadius} 0px 0px;
	margin-bottom: 10px;
`;

const HeaderContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: ${(props) => props.theme.fontSize.xSmall};
`;
// const ModalOverlay = styled.div`
// 	top: 0;
// 	left: 0;
// 	width: 100vw;
// 	height: 100vh;
// 	backdrop-filter: blur(2px);
// 	z-index: 7777;
// 	position: fixed;
// `;

const UserModal = ({ userRef, modalOpen, setModalOpen }) => {
	const onClick = () => {
		setModalOpen(!modalOpen);
		console.log('유저REF', userRef.current);
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
				<HeaderContent>
					<button>페이지 가기</button>
				</HeaderContent>
				<HeaderContent>
					<button>팔로우 하기</button>
				</HeaderContent>
			</ModalContaincer>
			{/* <ModalOverlay /> */}
			<ModalBackdrop
				// 여기
				onClick={(e) => {
					e.preventDefault();
					onClick();
				}}
			/>
		</>
	);
};

export default UserModal;
