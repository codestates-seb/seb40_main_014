import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { root } from '../../api/root';
import { useEffect } from 'react';

type LoginModalType = {
	handleOpenModal: () => void;
};

const LoginModal = ({ handleOpenModal }: LoginModalType) => {
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
		<ModalStyle>
			<WhiteBox>
				<H2>로그인</H2>
				<GoogleLogin>
					<a href={`${root}/oauth2/authorization/google`}>
						<FcGoogle className="google-icon" /> 구글로 로그인하기
					</a>
				</GoogleLogin>
			</WhiteBox>
			<ModalBackdrop
				onClick={(e) => {
					e.preventDefault();
					handleOpenModal();
				}}
			/>
		</ModalStyle>
	);
};

export default LoginModal;

export const ModalStyle = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5555;
`;

export const WhiteBox = styled.div`
	width: 500px;
	padding: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	background-color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	z-index: 5555;

	// Tablet
	@media screen and (max-width: 980px) {
		width: 400px;
		padding: 50px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		width: 300px;
		padding: 35px;
	}
`;

const H2 = styled.h2`
	margin-bottom: 40px;
	font-size: 26px;
	font-weight: 600;

	// Tablet
	@media screen and (max-width: 980px) {
		margin-bottom: 35px;
		font-size: 24px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		margin-bottom: 30px;
		font-size: 22px;
	}
`;

const GoogleLogin = styled.button`
	margin-bottom: 55px;
	background-color: ${(props) => props.theme.colors.white};
	border: 1.5px solid ${(props) => props.theme.colors.gray300};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	font-size: 18px;
	transition: 0.2s;

	:hover {
		background-color: ${(props) => props.theme.colors.gray50};
	}

	> a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px 85px;
		width: 100%;
	}

	.google-icon {
		font-size: 30px;
		margin-right: 20px;
	}

	// Tablet
	@media screen and (max-width: 980px) {
		margin-bottom: 50px;
		> a {
			padding: 15px 55px;
		}
	}
	// Mobile
	@media screen and (max-width: 640px) {
		margin-bottom: 45px;
		font-size: ${(props) => props.theme.fontSize.medium};

		> a {
			padding: 13px 30px;
		}

		.google-icon {
			font-size: 26px;
			margin-right: 15px;
		}
	}
`;

export const ModalBackdrop = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 4444;
`;
