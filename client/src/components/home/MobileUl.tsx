import { Link } from 'react-router-dom';
import { LoginButton } from './Header';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { myValue } from '../../slices/mySlice';

export type MobileUlType = {
	currentMenu: string;
	setOpenModal: any;
	handleOpenSide: () => void;
};

function MobileUl({ currentMenu, setOpenModal, handleOpenSide }: MobileUlType) {
	const { name } = useSelector(myValue);

	return (
		<Ul>
			{name ? null : (
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
			<Hr />
			<li>
				<SearchInput type="text" placeholder="검색어를 입력하세요" />
			</li>
		</Ul>
	);
}

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

const SearchInput = styled.input`
	padding: 10px;
	background-color: ${(props) => props.theme.colors.gray10};
	border: 1px solid ${(props) => props.theme.colors.gray400};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	font-size: ${(props) => props.theme.fontSize.small};
	color: ${(props) => props.theme.colors.gray900};

	&:focus {
		background-color: ${(props) => props.theme.colors.gray100};
	}
`;
