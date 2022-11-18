import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

type ToggleType = {
	state: boolean;
	setState: Dispatch<SetStateAction<boolean>>;
};
const Toggle = (props: ToggleType) => {
	const clickedToggle = () => {
		props.setState((prev) => !prev);
	};
	return (
		<>
			<ToggleBtn onClick={clickedToggle} toggle={props.state}>
				<Circle toggle={props.state} />
			</ToggleBtn>
		</>
	);
};

export default Toggle;

const ToggleBtn = styled.button<{ toggle: boolean }>`
	margin: 0 10px;
	min-width: 70px;
	height: 30px;
	border-radius: 30px;
	cursor: pointer;
	background-color: ${(props) =>
		!props.toggle ? props.theme.colors.gray400 : props.theme.colors.purple};
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.5s ease-in-out;
`;
const Circle = styled.div<{ toggle: boolean }>`
	background-color: white;
	width: 24px;
	height: 24px;
	border-radius: 50px;
	position: absolute;
	left: 5%;
	transform: ${(props) => (props.toggle ? 'translate(38px, 0)' : 'none')};
	transition: all 0.5s ease-in-out;
`;
