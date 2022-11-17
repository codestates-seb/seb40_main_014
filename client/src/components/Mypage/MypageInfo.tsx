import styled from 'styled-components';

const MypageInfo = () => {
	return (
		<Wrapper>
			<div className="top">
				<img
					src="https://t1.daumcdn.net/thumb/R720x0.fpng/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/0_JTh3JET7ZCHaT_IJhG4VbhEpI.png"
					alt="이미지"
				/>
				<div>
					<div className="nickname">닉네임</div>
					<div>팔로우, 등급, 부가요소</div>
				</div>
			</div>
			<div className="bottom">자기소개</div>
		</Wrapper>
	);
};

export default MypageInfo;

const Wrapper = styled.div`
	div {
		margin: 30px 0;
	}
	.top {
		display: flex;
		justify-content: center;
		align-items: center;
		img {
			width: 20%;
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
