import styled from 'styled-components';

type ButtonProps = {
	width?: string;
	height?: string;
	children?: any;
	fontSize?: string;
	onClick?: () => void;
};

export const DefaultButton = (props: ButtonProps) => {
	return <DefaultBtn {...props} />;
};

const DefaultBtn = styled.button<ButtonProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--purple);
	color: var(--white);
	width: ${({ width }) => (width ? width : '70px')};
	height: ${({ height }) => (height ? height : '40px')};
	font-size: ${({ fontSize }) => (fontSize ? fontSize : 'var(--x-small)')};
	border-radius: var(--radius);

	:hover {
		cursor: pointer;
	}
`;
