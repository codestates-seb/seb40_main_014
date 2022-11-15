import { useState } from 'react';
import styled from 'styled-components';

const Toggle = () => {
	const [toggle, setToggle] = useState<boolean>(false);
	const clickedToggle = () => {
		setToggle((prev) => !prev);
	};
	return (
		<>
			<ToggleBtn onClick={clickedToggle} toggle={toggle}>
				<Circle toggle={toggle} />
			</ToggleBtn>
		</>
	);
};

export default Toggle;

const ToggleBtn = styled.button<{ toggle: boolean }>`
	margin: 0 10px;
	width: 100px;
	height: 40px;
	border-radius: 30px;
	border: 1px solid gray;
	cursor: pointer;
	background-color: ${(props) =>
		!props.toggle ? 'none' : props.theme.colors.purple};
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.5s ease-in-out;
`;
const Circle = styled.div<{ toggle: boolean }>`
	background-color: white;
	width: 33px;
	height: 33px;
	border-radius: 50px;
	position: absolute;
	left: 5%;
	transform: ${(props) => (props.toggle ? 'translate(55px, 0)' : 'none')};
	transition: all 0.5s ease-in-out;
`;
