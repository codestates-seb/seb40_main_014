import { useState } from 'react';
import CreateModal from '../components/room/createModal';
import styled from 'styled-components';
import { DefaultButton } from '../components/common/Button';

const Container = styled.div`
	width: 100%;
	height: 1000px;
	display: flex;
	align-items: center;
	font-size: ${(props) => props.theme.fontSize.large};
	background-color: ${(props) => props.theme.colors.gray400};
`;

const Modaltest = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const modalClose = () => {
		setModalOpen(!modalOpen);
	};

	return (
		<Container>
			<h1>h</h1>
			<DefaultButton width="100px" onClick={modalClose}>
				모달 테스트
			</DefaultButton>

			{modalOpen && (
				<CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
			)}
		</Container>
	);
};

export default Modaltest;
