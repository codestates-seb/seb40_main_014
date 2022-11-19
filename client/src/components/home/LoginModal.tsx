import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { getUserInfo } from '../../api/userApi';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { myInfo } from '../../slices/mySlice';
// import { login } from '../../api/authApi';
import { root } from '../../api/root';
import { Link } from 'react-router-dom';

type LoginModalType = {
	handleOpenModal: () => void;
};

function LoginModal({ handleOpenModal }: LoginModalType) {
	const dispatch = useDispatch();

	const [memberId, setMemberId] = useState();

	// const onSubmit = () => {
	// 	login()
	// 		.then((res) => {
	// 			console.log('login res', res);
	// 			// { memberId: 1 }

	// 			setMemberId(res.memberId);
	// 		})
	// 		.finally(() => {
	// 			getUserInfo({ memberId }).then((res) => {
	// 				console.log('getMyInfo res', res);
	// 				// {
	// 				// 	memberId: 1,
	// 				// 	follow: 10,
	// 				// 	like: 10,
	// 				// 	name: 'nickname',
	// 				// 	createdAt: '회원 생성 시간',
	// 				// 	modifiedAt: '회원 수정 시간',
	// 				// 	grade: 'LUVIP',
	// 				// 	rank: 1,
	// 				// }

	// 				dispatch(myInfo(res));
	// 			});
	// 		});
	// };

	return (
		<LoginModalStyle>
			<WhiteBox>
				<H2>로그인</H2>
				<GoogleLogin>
					<a href={`${root}/login/oauth2/code/google`}>
						<FcGoogle className="google-icon" /> 구글로 로그인하기
					</a>
				</GoogleLogin>
			</WhiteBox>
			<Backdrop
				onClick={(e) => {
					e.preventDefault();
					handleOpenModal();
				}}
			/>
		</LoginModalStyle>
	);
}

export default LoginModal;

const LoginModalStyle = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 8888;
`;

const WhiteBox = styled.div`
	width: 500px;
	height: 300px;
	padding: 46px 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	background-color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	z-index: 8888;

	// Tablet
	@media screen and (max-width: 980px) {
		width: 400px;
		padding: 46px 50px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		width: 300px;
		height: 250px;
		padding: 37px 30px;
	}
`;

const H2 = styled.h2`
	font-size: ${(props) => props.theme.fontSize.xLarge};
	font-weight: 700;
	margin-bottom: 46px;

	// Mobile
	@media screen and (max-width: 640px) {
		margin-bottom: 37px;
		font-size: 24px;
	}
`;

const GoogleLogin = styled.button`
	background-color: ${(props) => props.theme.colors.white};
	border: 1.5px solid ${(props) => props.theme.colors.gray300};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	font-size: 18px;
	transition: 0.2s;

	&:hover {
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
		> a {
			padding: 15px 55px;
		}
	}
	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.medium};

		> a {
			padding: 13px 35px;
		}

		.google-icon {
			font-size: 26px;
			margin-right: 15px;
		}
	}
`;

export const Backdrop = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	background-color: rgba(0, 0, 0, 0.4);
	z-index: 7777;
`;
