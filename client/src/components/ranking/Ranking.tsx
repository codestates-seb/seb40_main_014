import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RankingInfoType } from '../../pages/RankingList';

type RankingType = {
	ranking: RankingInfoType;
};

const Ranking = ({ ranking }: RankingType) => {
	const rankingRef = useRef(null);

	return (
		<RankingStyle ref={rankingRef}>
			<div>{ranking.rank}</div>
			<div>
				<Link to={`/mypage/${ranking.memberId}`}>{ranking.name}</Link>
			</div>
			<div>{ranking.follow}</div>
			<div>{ranking.like}</div>
		</RankingStyle>
	);
};

export default Ranking;

const RankingStyle = styled.div`
	display: flex;
	padding: 16px 0;
	text-align: center;
	font-size: 18px;

	// 순위
	> div:nth-of-type(1) {
		width: 10%;
	}
	// 닉네임
	> div:nth-of-type(2) {
		width: 40%;

		a:hover {
			color: ${(props) => props.theme.colors.gray700};
		}
	}
	// 팔로워
	> div:nth-of-type(3) {
		width: 25%;
	}
	// 좋아요수
	> div:nth-of-type(4) {
		width: 25%;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.medium};
	}
`;
