import styled from 'styled-components';
import { MyInitialStateValue } from '../../slices/mySlice';

type MypageInfoType = {
	userInfo: MyInitialStateValue;
};

const MypageInfo = ({ userInfo }: MypageInfoType) => {
	const { name, rank, grade, follow } = userInfo;

	return (
		<Wrapper>
			<div className="top">
				<img
					src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png"
					alt="이미지"
				/>
				<div>
					<div className="nickname">{name}</div>
					<div>{grade}</div>
					<div>팔로워 {follow}</div>
				</div>
			</div>
			<div className="bottom">자기소개</div>
		</Wrapper>
	);
};

export default MypageInfo;

const Wrapper = styled.div`
	div {
		margin: 40px 0;
	}
	.top {
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 230px;
			object-fit: cover;
			border-radius: 50%;
			margin-right: 10%;
		}
		.nickname {
			font-size: ${(props) => props.theme.fontSize.large};
		}
	}
	.bottom {
		height: 100px;
		background-color: ${(props) => props.theme.colors.white};
		border-radius: ${(props) => props.theme.radius.largeRadius};
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 1px 1px 10px #4d0bd133;
	}
`;
