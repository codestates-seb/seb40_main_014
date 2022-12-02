import styled from 'styled-components';

type ButtonProps = {
	width?: string;
	height?: string;
	children?: string;
	fontSize?: string;
	onClick?: () => void;
	margin?: string;
	mobileWidth?: boolean;
};

export const DefaultButton = (props: ButtonProps) => {
	return <DefaultBtn {...props} type="button" />;
};

export const DefaultBtn = styled.button<ButtonProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: ${(props) => props.margin};
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	width: ${({ width }) => (width ? width : '70px')};
	height: ${({ height }) => (height ? height : '40px')};
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '16px')};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
		7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);

	:hover {
		cursor: pointer;
		background: linear-gradient(
			0deg,
			rgba(96, 9, 240, 1) 0%,
			rgba(129, 5, 240, 1) 100%
		);
	}

	// Mobile
	@media screen and (max-width: 640px) {
		width: ${(props) => props.mobileWidth && '100%'};
	}
`;
