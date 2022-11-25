import { useCallback, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export type PcUlType = {
	currentMenu: string;
};

function PcUl({ currentMenu }: PcUlType) {
	const [isOpenSearch, setOpenSearch] = useState(false);

	const handleOpenSearch = useCallback(() => {
		setOpenSearch(!isOpenSearch);
	}, [isOpenSearch]);

	return (
		<Ul>
			<li className={currentMenu === 'room' ? 'active' : ''}>
				<Link to="/">방</Link>
			</li>
			<li className={currentMenu === 'playlist' ? 'active' : ''}>
				<Link to="/playlist">플레이리스트</Link>
			</li>
			<li className={currentMenu === 'ranking' ? 'active' : ''}>
				<Link to="/ranking">랭킹</Link>
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

const Ul = styled.ul`
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.gray500};

	li {
		padding: 10px;
		margin: 0 20px;
		transition: 0.1s;

		:hover {
			color: ${(props) => props.theme.colors.white};
		}

		&.active {
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
`;

export const SearchButton = styled.button`
	display: flex;
	align-items: center;

	.search-icon {
		margin-right: 15px;
	}
`;

const SearchInput = styled.input`
	font-size: 16.5px;
	background-color: inherit;
	color: ${(props) => props.theme.colors.white};
`;
