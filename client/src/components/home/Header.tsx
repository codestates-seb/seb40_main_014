import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../../assets/images/header-logo.png';
import { useCallback, useState, useEffect } from 'react';
import LoginModal, { Backdrop } from './LoginModal';
import PcUl from './PcUl';
import MobileUl from './MobileUl';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';

function Header() {
	const { pathname } = useLocation();
	const [position, setPosition] = useState('fixed');
	const location = useLocation();
	const [isOpenModal, setOpenModal] = useState(false);
	const [currentMenu, setCurrentMenu] = useState('');

	const [isOpenSide, setOpenSide] = useState(false);

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

	useEffect(() => {
		if (location.pathname.slice(0, 6) === '/rooms') {
			setPosition('relative');
		} else {
			setPosition('fixed');
		}
	});

	return (
		<>
			<HeaderStyle position={position}>
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
				<LoginButton onClick={handleOpenModal} className="on-pc">
					로그인
				</LoginButton>
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

const HeaderStyle = styled.div<{ position: string }>`
	position: ${(props) =>
		props.position === 'relative' ? 'relative' : 'fixed'};
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
