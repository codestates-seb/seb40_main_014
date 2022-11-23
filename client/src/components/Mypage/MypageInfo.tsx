import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MyInitialStateValue } from '../../slices/mySlice';
import { AiFillEdit } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { followApi } from '../../api/userApi';
import Badge from '../../components/common/Badge';

type MypageInfoType = {
	userInfo: MyInitialStateValue;
	myId: number;
};

const MypageInfo = ({ userInfo, myId }: MypageInfoType) => {
	const { memberId, name, grade, follow, followState, picture } = userInfo;

	const [followNum, setFollowNum] = useState(follow);
	const [followCheck, setFollowCheck] = useState(followState);

	useEffect(() => {
		setFollowNum(follow);
		setFollowCheck(followState);
	}, [follow, followState]);

	const handleFollow = () => {
		followApi(memberId).then((res) => {
			console.log('follow res', res);

			const { follow, followState } = res.data;

			setFollowNum(follow);
			setFollowCheck(followState);
		});
	};

	return (
		<Wrapper>
			<Top>
				<Img src={picture} alt="profile" />
				<Info>
					<Badge grade={grade} margin="0px 0px 15px 0px" />
					<div>
						<Name>{name}</Name>
						{myId === memberId && (
							<Link to="/editProfile">
								<AiFillEdit />
							</Link>
						)}
					</div>
					<Follower>
						팔로워
						<span>{followNum}</span>
						{myId !== memberId && (
							<button onClick={handleFollow}>
								{followCheck ? '언팔로우' : '팔로우'}
							</button>
						)}
					</Follower>
				</Info>
			</Top>
			<Bottom className="bottom">자기소개</Bottom>
		</Wrapper>
	);
};

export default MypageInfo;

const Wrapper = styled.div`
	padding: 40px 0;
`;

const Top = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 60px;
`;

const Img = styled.img`
	width: 190px;
	height: 190px;
	border-radius: 50%;
	margin-right: 12%;

	// Tablet
	@media screen and (max-width: 980px) {
		width: 170px;
		height: 170px;
	}
	// Mobile
	@media screen and (max-width: 640px) {
		width: 120px;
		height: 120px;
	}
`;

const Info = styled.div`
	> div:nth-of-type(2) {
		position: relative;
		margin-bottom: 40px;

		a {
			position: absolute;
			top: 0;
			right: -40px;
			color: ${(props) => props.theme.colors.gray500};
			font-size: 18px;
			transition: 0.1s;
			padding: 5px;

			:hover {
				color: ${(props) => props.theme.colors.gray600};
			}

			// Mobile
			@media screen and (max-width: 640px) {
				right: -30px;
			}
		}
	}
`;

const Name = styled.div`
	font-size: 24px;
	font-weight: 500;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 22px;
	}
`;

const Follower = styled.div`
	display: flex;
	align-items: center;

	span {
		margin-left: 10px;

		// Mobile
		@media screen and (max-width: 640px) {
			margin-left: 7px;
		}
	}

	button {
		margin-left: 20px;
		padding: 4px;
		background-color: ${(props) => props.theme.colors.purple};
		color: ${(props) => props.theme.colors.white};
		font-size: ${(props) => props.theme.fontSize.xSmall};
		border-radius: ${(props) => props.theme.radius.smallRadius};
		transition: 0.1s;

		:hover {
			background-color: #410bae;
		}

		// Mobile
		@media screen and (max-width: 640px) {
			margin-left: 17px;
			font-size: 10px;
		}
	}
`;

const Bottom = styled.div`
	height: 100px;
	background-color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 1px 1px 10px #4d0bd133;
`;
