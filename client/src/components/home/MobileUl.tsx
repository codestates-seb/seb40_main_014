import { Link } from 'react-router-dom';
import { PcUlType, SearchInput, Ul } from './PcUl';
import { LoginButton } from './Header';
import styled from 'styled-components';

function MobileUl({ handleChangeMenu, handleOpenModal }: PcUlType) {
	return (
		<Ul>
			<li>
				<LoginButton onClick={handleOpenModal} className="off-mobile">
					<Link to="/" id="login" onClick={handleChangeMenu}>
						로그인
					</Link>
				</LoginButton>
			</li>
			<Hr />
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
			<Hr />
			<li>
				<SearchInput type="text" placeholder="검색어를 입력하세요" />
			</li>
		</Ul>
	);
}

export default MobileUl;

export const Hr = styled.hr`
	width: 100%;
	margin: 20px 0;
	border: none;
	height: 0.1px;
	background-color: ${(props) => props.theme.colors.gray500};
`;
