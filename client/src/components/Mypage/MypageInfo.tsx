import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MyInitialStateValue } from '../../slices/mySlice';
import { AiFillEdit } from 'react-icons/ai';

type MypageInfoType = {
	userInfo: MyInitialStateValue;
	myId: number;
};

const MypageInfo = ({ userInfo, myId }: MypageInfoType) => {
	const { memberId, name, grade, follow, picture } = userInfo;

	return (
		<Wrapper>
			<Top>
				<Img src={picture} alt="profile" />
				<Info>
					<Grade>{grade}</Grade>
					<div>
						<Name>{name}</Name>
						{myId === memberId && (
							<Link to="/">
								<AiFillEdit />
							</Link>
						)}
					</div>
					<Follower>
						<span>팔로워</span> {follow}
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
			right: -45px;
			color: ${(props) => props.theme.colors.gray500};
			font-size: 18px;
			transition: 0.1s;
			padding: 5px;

			:hover {
				color: ${(props) => props.theme.colors.purple};
			}

			// Mobile
			@media screen and (max-width: 640px) {
				right: -35px;
			}
		}
	}
`;

const Grade = styled.div`
	display: inline-block;
	background-color: gray;
	color: white;
	font-size: 14px;
	padding: 5px;
	margin-bottom: 15px;
	border-radius: 5px;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 12px;
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
	span {
		margin-right: 5px;
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
