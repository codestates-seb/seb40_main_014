import { Dispatch } from 'react';
import { Link } from 'react-router-dom';
import { LoginButton } from './Header';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { myLogin } from '../../slices/mySlice';

export type MobileUlType = {
	currentMenu: string;
	setOpenModal: Dispatch<boolean>;
	handleOpenSide: () => void;
};

const MobileUl = ({
	currentMenu,
	setOpenModal,
	handleOpenSide,
}: MobileUlType) => {
	const isLogin = useSelector(myLogin);

	return (
		<Ul>
			{!isLogin && (
				<>
					<li>
						<LoginButton
							id="login"
							onClick={() => {
								setOpenModal(true);
								handleOpenSide();
							}}
							className="off-mobile">
							로그인
						</LoginButton>
					</li>
					<Hr />
				</>
			)}
			<li className={currentMenu === 'room' ? 'active' : ''}>
				<Link
					to="/"
					onClick={() => {
						setOpenModal(false);
						handleOpenSide();
					}}>
					방
				</Link>
			</li>
			<li className={currentMenu === 'playlist' ? 'active' : ''}>
				<Link
					to="/playlist"
					onClick={() => {
						setOpenModal(false);
						handleOpenSide();
					}}>
					플레이리스트
				</Link>
			</li>
			<li className={currentMenu === 'ranking' ? 'active' : ''}>
				<Link
					to="/ranking"
					onClick={() => {
						setOpenModal(false);
						handleOpenSide();
					}}>
					랭킹
				</Link>
			</li>
			<li className={currentMenu === 'searchbar' ? 'active' : ''}>
				<Link
					to="/searchbar"
					onClick={() => {
						setOpenModal(false);
						handleOpenSide();
					}}>
					<FaSearch className="search-icon" />
					<span>검색</span>
				</Link>
			</li>
		</Ul>
	);
};

export default MobileUl;

const Ul = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	position: absolute;
	top: 73px;
	right: 0;
	padding: 20px 30px;
	height: calc(100vh - 73px);
	background-color: ${(props) => props.theme.colors.background};
	color: ${(props) => props.theme.colors.gray800};
	animation: open-slide 0.5s ease-in-out;

	z-index: 5555;

	li {
		padding: 5px 0;
		margin: 10px 0;
		transition: 0.1s;

		:hover {
			color: ${(props) => props.theme.colors.purple};
		}

		&.active {
			color: ${(props) => props.theme.colors.purple};
		}
	}

	li:last-of-type {
		a {
			display: flex;
			align-items: center;
			span {
				margin-left: 10px;
			}
		}
	}

	@keyframes open-slide {
		from {
			right: -270px;
		}
		to {
			right: 0px;
		}
	}
`;

export const Hr = styled.hr`
	width: 100%;
	margin: 15px 0;
	border: none;
	height: 0.1px;
	background-color: ${(props) => props.theme.colors.gray500};
`;
