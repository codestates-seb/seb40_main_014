import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoImg from '../../assets/images/header-logo.png';
import { FaSearch } from 'react-icons/fa';
import { useCallback, useRef, useState } from 'react';
import LoginModal from './LoginModal';

function Header() {
	const inputRef = useRef<HTMLInputElement>(null);

	const [isOpenModal, setOpenModal] = useState<boolean>(false);
	const [isOpenSearch, setOpenSearch] = useState<boolean>(false);

	const handleOpenModal = useCallback(() => {
		setOpenModal(!isOpenModal);
	}, [isOpenModal]);

	const handleOpenSearch = useCallback(() => {
		setOpenSearch(!isOpenSearch);
	}, [isOpenSearch]);

	return (
		<>
			<HeaderStyle>
				<Logo>
					<Link to="/">
						<img src={LogoImg} alt="logo" />
					</Link>
				</Logo>
				<Ul>
					<li>
						<Link to="/">방</Link>
					</li>
					<li>
						<Link to="/playlist">플레이리스트</Link>
					</li>
					<li>
						<Link to="/">랭킹</Link>
					</li>
					<li>
						{isOpenSearch ? (
							<SearchInput
								type="text"
								placeholder="검색어를 입력하세요"
								ref={inputRef}
								onBlur={handleOpenSearch}
								autoFocus
							/>
						) : (
							<SearchButton onClick={handleOpenSearch}>
								<FaSearch className="search-icon" />
								검색
							</SearchButton>
						)}
					</li>
				</Ul>
				<LoginButton onClick={handleOpenModal}>
					<Link to="/">로그인</Link>
				</LoginButton>
			</HeaderStyle>
			{isOpenModal && <LoginModal onClick={handleOpenModal} />}
		</>
	);
}

export default Header;

const HeaderStyle = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 17px 300px;
	background-color: var(--header-background-color);
	font-size: 18px;

	// Tablet
	@media screen and (max-width: 980px) {
		padding: 20px 70px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		padding: 20px 40px;
		font-size: var(--medium);
	}
`;

const Logo = styled.div`
	img {
		width: 110px;
	}
`;

const Ul = styled.ul`
	display: flex;
	align-items: center;
	color: var(--gray-400);

	li {
		padding: 10px;
		margin: 0 20px;
		transition: 0.1s;

		&:hover {
			color: var(--white);
		}
	}
`;

const SearchButton = styled.button`
	display: flex;
	align-items: center;

	.search-icon {
		margin-right: 15px;
	}
`;

const SearchInput = styled.input`
	background-color: inherit;
	border: none;
	outline: none;
	border: none;
	font-family: inherit;
	font-size: 16.5px;
	color: var(--white);
`;

const LoginButton = styled.button`
	color: var(--gray-400);

	&:hover {
		color: var(--white);
	}
`;
