import { useState } from 'react';
import CreateModal from '../components/common/createModal';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: var(--x-large);
	background-color: #d9d9d9;
`;

const Modaltest = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const modalClose = () => {
		setModalOpen(!modalOpen);
	};
	return (
		<Container>
			<button onClick={modalClose}>modaltest</button>
			{modalOpen && (
				<CreateModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
			)}
		</Container>
	);
};

export default Modaltest;
