import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../../assets/images/header-logo.png';
import { useCallback, useState, useEffect } from 'react';
import LoginModal, { Backdrop } from './LoginModal';
import PcUl from './PcUl';
import MobileUl from './MobileUl';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';

function Header() {
	const [isOpenModal, setOpenModal] = useState<boolean>(false);
	const [currentMenu, setCurrentMenu] = useState<string>('room');
	const [prevMenu, setPrevMenu] = useState<string>('');
	const [isOpenSide, setOpenSide] = useState<boolean>(false);

	const handleOpenModal = useCallback(() => {
		setOpenModal(!isOpenModal);
	}, [isOpenModal]);

	const handleChangeMenu = useCallback(
		(e) => {
			setCurrentMenu(e.target.id);
			if (isOpenSide) setOpenSide(!isOpenSide);
		},
		[currentMenu, isOpenSide],
	);

	const handleOpenSide = useCallback(() => {
		setOpenSide(!isOpenSide);
	}, [isOpenSide]);

	useEffect(() => {
		// console.log('#1', currentMenu);
		if (currentMenu === 'logo') setCurrentMenu('login');

		const current = document.getElementById(currentMenu);
		if (current != undefined) current.style.color = '#ffffff';

		const prev = document.getElementById(prevMenu);
		if (prev != undefined) prev.style.color = '#a3a3a3';

		setPrevMenu(currentMenu);
	}, [currentMenu]);

	return (
		<>
			<HeaderStyle>
				<Logo>
					<Link to="/" id="logo" onClick={handleChangeMenu}>
						<img src={LogoImg} alt="logo" />
					</Link>
				</Logo>
				<div className="on-pc">
					<PcUl handleChangeMenu={handleChangeMenu} />
				</div>
				{isOpenSide && (
					<div className="on-mobile">
						<MobileUl
							handleChangeMenu={handleChangeMenu}
							handleOpenModal={handleOpenModal}
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
	z-index: 9999;

	.on-pc {
		display: block;
	}
	.on-mobile {
		display: none;
	}

	// Tablet
	@media screen and (max-width: 980px) {
		padding: 20px 100px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		padding: 20px 50px;
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
