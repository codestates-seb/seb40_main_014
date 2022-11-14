import { useState } from 'react';
import CreateModal from '../components/createModal';
import styled from 'styled-components';
import { DefaultButton } from '../components/common/Button';

const Container = styled.div`
	width: 100%;
	height: 1000px;
	display: flex;
	align-items: center;
	font-size: var(--x-large);
	background-color: var(--gray-600);
`;

const Modaltest = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const modalClose = () => {
		setModalOpen(!modalOpen);
	};

	return (
		<Container>
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
