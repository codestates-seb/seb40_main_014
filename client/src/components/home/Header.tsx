import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../../assets/images/header-logo.png';
import { useCallback, useState, useEffect, useRef } from 'react';
import LoginModal, { Backdrop } from './LoginModal';
import PcUl from './PcUl';
import MobileUl from './MobileUl';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { myLogout, myValue } from '../../slices/mySlice';
import { logout } from '../../api/authApi';
import ProfileImg from '../../assets/images/profile.jpg';
import { BiUser } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { BsFillTriangleFill } from 'react-icons/bs';

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const profileRef = useRef<HTMLDivElement>(null);
	const profileUlRef = useRef<HTMLUListElement>(null);

	const { name } = useSelector(myValue);

	const [isOpenModal, setOpenModal] = useState(false);
	const [isOpenSide, setOpenSide] = useState(false);
	const [currentMenu, setCurrentMenu] = useState('');

	const handleOpenProfileUl = ({ target }) => {
		if (profileRef.current.contains(target)) {
			profileUlRef.current.style.display = 'block';
		} else {
			profileUlRef.current.style.display = 'none';
		}
	};

	useEffect(() => {
		window.addEventListener('mouseover', handleOpenProfileUl);
		return () => {
			window.removeEventListener('mouseover', handleOpenProfileUl);
		};
	});

	// 로그아웃
	const handleLogout = () => {
		// logout().then((res) => {
		// 	console.log('logout res', res);

		// 	localStorage.removeItem('accessToken');
		// 	dispatch(myLogout());
		// 	navigate('/');
		// });
		localStorage.removeItem('accessToken');
		dispatch(myLogout());
		navigate('/');
	};

	const handleOpenModal = useCallback(() => {
		setOpenModal(!isOpenModal);
	}, [isOpenModal]);

	const handleOpenSide = useCallback(() => {
		setOpenSide(!isOpenSide);
	}, [isOpenSide]);

	useEffect(() => {
		if (pathname === '/') setCurrentMenu('room');
		else setCurrentMenu(pathname.slice(1));
	}, [pathname]);

	return (
		<>
			<HeaderStyle>
				<Logo>
					<Link to="/">
						<img src={LogoImg} alt="logo" />
					</Link>
				</Logo>
				<div className="on-pc">
					<PcUl currentMenu={currentMenu} />
				</div>
				{isOpenSide && (
					<div className="on-mobile">
						<MobileUl
							currentMenu={currentMenu}
							setOpenModal={setOpenModal}
							handleOpenSide={handleOpenSide}
						/>
					</div>
				)}
				{name ? (
					<>
						<Profile ref={profileRef}>
							<Img>
								<img src={ProfileImg} alt="profile" />
							</Img>
							<div className="on-pc">{name}</div>
							<ProfileUl ref={profileUlRef}>
								<Triangle>
									<BsFillTriangleFill />
								</Triangle>
								<MyPageLink>
									<Link to="/mypage">
										<BiUser />
										<span>마이페이지</span>
									</Link>
								</MyPageLink>
								<LogoutButton onClick={handleLogout}>
									<MdLogout />
									<span>로그아웃</span>
								</LogoutButton>
							</ProfileUl>
						</Profile>
					</>
				) : (
					<LoginButton onClick={handleOpenModal} className="on-pc">
						로그인
					</LoginButton>
				)}
				<Hambuger className="on-mobile" onClick={handleOpenSide}>
					{isOpenSide ? <RiMenuUnfoldLine /> : <RiMenuFoldLine />}
				</Hambuger>
			</HeaderStyle>
			{isOpenModal && <LoginModal handleOpenModal={handleOpenModal} />}
			{isOpenSide && (
				<Backdrop
					onClick={(e) => {
						e.preventDefault();
						handleOpenSide();
					}}
				/>
			)}
		</>
	);
}

export default Header;

const HeaderStyle = styled.div`
	/* position: relative; */
	position: fixed;
	top: 0;
	width: 100vw;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 17px 15vw;
	background-color: ${(props) => props.theme.colors.headerBackground};
	font-size: 18px;
	z-index: 6666;

	.on-pc {
		display: block;
	}
	.on-mobile {
		display: none;
	}

	// Tablet
	@media screen and (max-width: 980px) {
		padding: 20px 80px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		padding: 20px 40px;
		font-size: ${(props) => props.theme.fontSize.medium};
		z-index: 9999;

		.on-pc {
			display: none;
		}
		.on-mobile {
			display: block;
		}
	}
`;

const Logo = styled.div`
	img {
		width: 110px;
		border-radius: 50%;
	}
`;

export const LoginButton = styled.button`
	color: ${(props) => props.theme.colors.gray400};

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		color: ${(props) => props.theme.colors.gray800};
		&:hover {
			color: ${(props) => props.theme.colors.purple};
		}
	}
`;

const Hambuger = styled.div`
	color: ${(props) => props.theme.colors.gray400};
	font-size: ${(props) => props.theme.fontSize.large};
	transition: 0.1s;
	cursor: pointer;

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;

const Profile = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.gray400};
	font-size: ${(props) => props.theme.fontSize.medium};
	cursor: pointer;

	// Mobile
	@media screen and (max-width: 640px) {
		position: absolute;
		right: 68px;
	}
`;

const Img = styled.div`
	width: 35px;
	border-radius: 50%;
	overflow: hidden;
	margin-right: 15px;

	img {
		width: 100%;
		height: 100%;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		width: 30px;
	}
`;

const ProfileUl = styled.ul`
	display: none;
	position: absolute;
	top: 50px;
	left: -30px;
	padding: 20px;
	width: 150px;
	background-color: ${(props) => props.theme.colors.background};
	color: ${(props) => props.theme.colors.gray900};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	box-shadow: 1px 1px 10px 2px rgba(30, 30, 30, 0.185);

	> * {
		padding: 5px;

		span {
			margin-left: 10px;
		}

		&:hover {
			color: ${(props) => props.theme.colors.gray700};
		}
	}

	// Mobile
	@media screen and (max-width: 640px) {
		top: 47px;
		left: -54px;
		padding: 17px;
		width: 135px;
		font-size: ${(props) => props.theme.fontSize.small};
	}
`;

const Triangle = styled.div`
	position: absolute;
	top: -15px;
	left: 63px;
	width: 150px;
	color: ${(props) => props.theme.colors.background};
	font-size: ${(props) => props.theme.fontSize.small};

	&:hover {
		color: ${(props) => props.theme.colors.background};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		top: -14px;
		left: 57px;
		width: 135px;
	}
`;

const MyPageLink = styled.div``;

const LogoutButton = styled.button`
	margin-top: 8px;
`;
