import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getRanking } from '../api/rankingApi';
import Ranking from '../components/ranking/Ranking';
import { Info, InfoText, MinHeightWrapper, Title } from './RoomList';
import { AiFillInfoCircle } from 'react-icons/ai';

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

const RankingList = () => {
	const infoRef = useRef(null);
	const infoTextRef = useRef(null);

	const [rankings, setRankings] = useState<RankingInfoType[]>([]);

	useEffect(() => {
		getRanking()
			.then((res) => {
				// console.log('ranking res', res);

				setRankings(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// 정보창 오픈
	const handleOpenInfoText = ({ target }) => {
		if (!infoRef.current) return;

		if (infoRef.current.contains(target)) {
			infoTextRef.current.style.display = 'block';
		} else {
			infoTextRef.current.style.display = 'none';
		}
	};

	useEffect(() => {
		window.addEventListener('mouseover', handleOpenInfoText);
		return () => {
			window.removeEventListener('mouseover', handleOpenInfoText);
		};
	});

	return (
		<RankingListStyle>
			<Title>
				<H2>
					DJ 랭킹 <span>TOP7</span>
				</H2>
				<Info ref={infoRef}>
					<AiFillInfoCircle color="#a3a3a3" cursor="pointer" />
					<InfoText ref={infoTextRef}>
						랭킹은 팔로워와 플리 좋아요의 합산을 기준으로 계산됩니다.
						<br />
						(동점시 가입자순으로 정렬됩니다.)
					</InfoText>
				</Info>
			</Title>
			<Rankings>
				<SubTitle>
					<div>순위</div>
					<div>닉네임</div>
					<div>팔로워</div>
					<div>플리 좋아요</div>
				</SubTitle>
				{rankings &&
					rankings.map((ranking, idx) => (
						<Ranking ranking={ranking} key={idx} />
					))}
			</Rankings>
		</RankingListStyle>
	);
};

export default RankingList;

export const RankingListStyle = styled(MinHeightWrapper)`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const H2 = styled.h2`
	font-size: ${(props) => props.theme.fontSize.xLarge};
	font-weight: 600;
	margin-bottom: 60px;

	> span {
		color: ${(props) => props.theme.colors.purple};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		margin-bottom: 40px;
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

const SubTitle = styled.h3`
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
