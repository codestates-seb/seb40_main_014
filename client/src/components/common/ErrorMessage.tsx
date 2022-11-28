import styled from 'styled-components';

type ErrorMessageType = {
	text: string;
	margin?: string;
	center?: boolean;
};

type ErrorMessageStyleProps = {
	margin?: string;
	center?: boolean;
};

const ErrorMessage = ({ text, margin, center }: ErrorMessageType) => {
	return (
		<ErrorMessageStyle margin={margin} center={center}>
			{text}
		</ErrorMessageStyle>
	);
};

export default ErrorMessage;

const ErrorMessageStyle = styled.div<ErrorMessageStyleProps>`
	margin: ${(props) => (props.margin ? props.margin : '20px 0')};
	text-align: ${(props) => props.center && 'center'};
	font-size: ${(props) => props.theme.fontSize.small};
	color: #ff3838;
`;
