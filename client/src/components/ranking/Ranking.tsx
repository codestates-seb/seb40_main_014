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
				<Link to={`/mypage/${ranking.memberId}`}>
					<Img src={ranking.picture} alt="프로필" />
					{ranking.name}
				</Link>
			</div>
			<div>{ranking.follow}</div>
			<div>{ranking.like}</div>
		</RankingStyle>
	);
};

export default Ranking;

const RankingStyle = styled.div`
	display: flex;
	align-items: center;
	padding: 16px 0;
	text-align: center;

	// 순위
	> div:nth-of-type(1) {
		width: 10%;
	}
	// 닉네임
	> div:nth-of-type(2) {
		width: 40%;

		> a {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		:hover {
			opacity: 0.75;
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
`;

const Img = styled.img`
	width: 26px;
	height: 26px;
	border-radius: 50%;
	margin-right: 18px;

	// Mobile
	@media screen and (max-width: 640px) {
		display: none;
	}
`;
