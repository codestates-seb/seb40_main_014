import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export type PcUlType = {
	currentMenu: string;
};

const PcUl = ({ currentMenu }: PcUlType) => {
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
			<li className={currentMenu === 'searchbar' ? 'active' : ''}>
				<Link to="/searchbar">
					<FaSearch className="search-icon" />
					<span>검색</span>
				</Link>
			</li>
		</Ul>
	);
};

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

	li:last-of-type {
		a {
			display: flex;
			align-items: center;
			span {
				margin-left: 15px;
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

	// 14inch, Tablet
	@media screen and (max-width: 1512px) {
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
