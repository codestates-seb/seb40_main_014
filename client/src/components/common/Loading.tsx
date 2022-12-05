import spinner from '../../assets/images/spinner.json';
import styled from 'styled-components';
import Lottie from 'lottie-react';

const Loading = () => {
	return (
		<Background>
			<LottieContainer>
				<Lottie animationData={spinner} loop={true}></Lottie>
			</LottieContainer>
		</Background>
	);
};

export default Loading;

const Background = styled.div`
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: #ffffffb7;
	z-index: 9998;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const LottieContainer = styled.div`
	width: 140px;
	height: 140px;
	margin: 0 auto;
	position: absolute;
	z-index: 9999;
`;
