import { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export type PcUlType = {
	handleChangeMenu: (e) => void;
	handleOpenModal?: () => void;
};

function PcUl({ handleChangeMenu }: PcUlType) {
	const [isOpenSearch, setOpenSearch] = useState<boolean>(false);

	const handleOpenSearch = useCallback(() => {
		setOpenSearch(!isOpenSearch);
	}, [isOpenSearch]);

	return (
		<Ul>
			<li>
				<Link to="/" id="room" onClick={handleChangeMenu}>
					방
				</Link>
			</li>
			<li>
				<Link to="/playlist" id="playlist" onClick={handleChangeMenu}>
					플레이리스트
				</Link>
			</li>
			<li>
				<Link to="/ranking" id="rank" onClick={handleChangeMenu}>
					랭킹
				</Link>
			</li>
			<li>
				{isOpenSearch ? (
					<SearchInput
						type="text"
						placeholder="검색어를 입력하세요"
						onBlur={handleOpenSearch}
						autoFocus
					/>
				) : (
					<SearchButton id="search" onClick={handleOpenSearch}>
						<FaSearch className="search-icon" />
						검색
					</SearchButton>
				)}
			</li>
		</Ul>
	);
}

export default PcUl;

export const Ul = styled.ul`
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.gray500};

	li {
		padding: 10px;
		margin: 0 20px;
		transition: 0.1s;

		&:hover {
			color: ${(props) => props.theme.colors.white};
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

	// Tablet
	@media screen and (max-width: 980px) {
		li {
			padding: 5px;
			margin: 0 10px;
		}
	}
	// Mobile
	@media screen and (max-width: 640px) {
		position: absolute;
		top: 73px;
		right: 0;
		flex-direction: column;
		align-items: flex-end;
		padding: 20px;
		height: calc(100vh - 73px);
		background-color: ${(props) => props.theme.colors.background};
		z-index: 9999;

		animation: open-slide 0.5s ease-in-out;

		li {
			padding: 10px 0;
			margin-bottom: 20px;
			color: ${(props) => props.theme.colors.gray800};
			&:hover {
				color: ${(props) => props.theme.colors.purple};
			}
		}
	}
`;

export const SearchButton = styled.button`
	display: flex;
	align-items: center;

	.search-icon {
		margin-right: 15px;
	}
`;

export const SearchInput = styled.input`
	background-color: inherit;
	border: none;
	outline: none;
	font-family: inherit;
	font-size: 16.5px;
	color: ${(props) => props.theme.colors.white};

	// Mobile
	@media screen and (max-width: 640px) {
		padding: 10px;
		background-color: ${(props) => props.theme.colors.gray10};
		border: 1px solid ${(props) => props.theme.colors.gray400};
		border-radius: ${(props) => props.theme.radius.smallRadius};
		font-size: ${(props) => props.theme.fontSize.small};
		color: ${(props) => props.theme.colors.gray900};

		&:focus {
			background-color: ${(props) => props.theme.colors.gray100};
		}
	}
`;
