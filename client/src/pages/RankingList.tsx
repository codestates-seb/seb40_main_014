import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRanking } from '../api/rankingApi';
import Ranking from '../components/ranking/Ranking';

export type RankingInfoType = {
	name: string;
	picture: string;
	grade: string;
	follow: number;
	rank: number;
	createdAt: string;
	modifiedAt: string;
	like: number;
	memberId: number;
};

function RankingList() {
	const [rankings, setRankings] = useState<RankingInfoType[]>([]);

	useEffect(() => {
		getRanking().then((res) => {
			console.log('ranking res', res);

			setRankings(res.data);
		});
	}, []);

	return (
		<>
			<RankingListStyle>
				<H2>
					DJ 랭킹 <span>TOP7</span>
				</H2>
				<Rankings>
					<Title>
						<div>순위</div>
						<div>닉네임</div>
						<div>팔로워</div>
						<div>플리 좋아요</div>
					</Title>
					{rankings.map((ranking, idx) => (
						<Ranking ranking={ranking} key={idx} />
					))}
				</Rankings>
			</RankingListStyle>
		</>
	);
}

export default RankingList;

const RankingListStyle = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 80px - 120px);
`;

const H2 = styled.h2`
	font-size: ${(props) => props.theme.fontSize.xLarge};
	font-weight: 600;
	margin-bottom: 60px;

	> span {
		color: ${(props) => props.theme.colors.purple};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 24px;
	}
`;

const Rankings = styled.div`
	width: 100%;
	max-width: 800px;
	padding: 34px 50px;
	background-color: #ffffff74;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0 0 50px 1px ${(props) => props.theme.colors.gray300};
`;

const Title = styled.div`
	display: flex;
	padding: 16px 0;
	margin-bottom: 9px;
	text-align: center;
	color: ${(props) => props.theme.colors.purple};
	font-weight: 600;
	font-size: 18px;

	> div:nth-of-type(1) {
		width: 10%;
	}
	> div:nth-of-type(2) {
		width: 40%;
	}
	> div:nth-of-type(3) {
		width: 25%;
	}
	> div:nth-of-type(4) {
		width: 25%;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.medium};
		font-weight: 500;
	}
`;
