import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DefaultButton } from '../components/common/Button';
import Room from '../components/home/Room';

function RoomList() {
	return (
		<>
			<ButtonWrapper>
				<Link to="/addPlaylist">
					<DefaultButton fontSize="16px" width="105px" height="42px">
						방 만들기
					</DefaultButton>
				</Link>
			</ButtonWrapper>
			<H2>방 Top 8</H2>
			<H2>최신 방</H2>
			<ListsStyle>
				<Room />
			</ListsStyle>
		</>
	);
}

export default RoomList;

export const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-bottom: 40px;
`;

export const H2 = styled.h2`
	margin-bottom: 30px;
	font-size: 22px;
	font-weight: 500;
`;

export const ListsStyle = styled.div`
	display: flex;
	flex-wrap: wrap;
	z-index: 1111;

	> div:not(:nth-of-type(4n)) {
		margin-right: calc((100vw - 30vw) * 0.03);
	}
	> div:nth-of-type(4n) {
		margin-right: 0;
	}

	// 14
	@media screen and (max-width: 1512px) {
		> div:not(:nth-of-type(3n)) {
			margin-right: calc((100vw - 30vw) * 0.04);
		}
		> div:nth-of-type(3n) {
			margin-right: 0;
		}
	}
	// Tablet
	@media screen and (max-width: 980px) {
		> div:not(:nth-of-type(2n)) {
			margin-right: calc((100vw - 160px) * 0.06);
		}
		> div:nth-of-type(2n) {
			margin-right: 0;
		}
	}
	// Mobile
	@media screen and (max-width: 640px) {
		> div {
			margin-right: 0 !important;
		}
	}
`;
