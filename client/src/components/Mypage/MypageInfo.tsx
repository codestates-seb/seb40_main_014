import styled from 'styled-components';
import { MyInitialStateValue, myLogin, myValue } from '../../slices/mySlice';
import { AiFillEdit } from 'react-icons/ai';
import { useState, useCallback, useEffect } from 'react';
import { followUser } from '../../api/userApi';
import Badge from '../../components/common/Badge';
import EditProfileModal from './EditProfileModal';
import { ModalBackdrop } from '../home/LoginModal';
import { useSelector } from 'react-redux';

type MypageInfoType = {
	userInfo: MyInitialStateValue;
	myId: number;
};

const MypageInfo = ({ userInfo, myId }: MypageInfoType) => {
	const {
		memberId,
		name,
		grade,
		follow,
		followState,
		picture,
		email,
		content,
	} = userInfo;

	const isLogin = useSelector(myLogin);
	const my = useSelector(myValue);

	const [isOpenModal, setOpenModal] = useState(false);
	const [isOpenSide, setOpenSide] = useState(false);
	const [followNum, setFollowNum] = useState(follow);
	const [followCheck, setFollowCheck] = useState(followState);
	const [myName, setMyName] = useState(my.name);
	const [myIntro, setMyIntro] = useState(my.content);

	useEffect(() => {
		setMyName(my.name);
		setMyIntro(my.content);
		setFollowNum(follow);
		setFollowCheck(followState);
	}, [my.name, my.content, follow, followState]);

	const handleOpenModal = useCallback(() => {
		setOpenModal(!isOpenModal);
	}, [isOpenModal]);

	const handleOpenSide = useCallback(() => {
		setOpenSide(!isOpenSide);
	}, [isOpenSide]);

	const handleFollow = () => {
		followUser(memberId).then((res) => {
			console.log('follow res', res);

			const { follow, followState } = res.data;

			setFollowNum(follow);
			setFollowCheck(followState);
		});
	};

	return (
		<>
			<Wrapper>
				<Top>
					<Img src={picture} alt="profile" />
					<Info>
						<Badge grade={grade} margin="0px 0px 15px 0px" />
						<div>
							<Name>{myId === memberId ? myName : name}</Name>
							{myId === memberId && (
								<Edit onClick={handleOpenModal}>
									<AiFillEdit />
								</Edit>
							)}
						</div>
						<Email>{email}</Email>
						<Follower>
							팔로워
							<span>{followNum}</span>
							{isLogin && myId !== memberId && (
								<button onClick={handleFollow}>
									{followCheck ? '언팔로우' : '팔로우'}
								</button>
							)}
						</Follower>
					</Info>
				</Top>
				<Bottom>{myId === memberId ? myIntro : content}</Bottom>
			</Wrapper>
			{isOpenModal && (
				<EditProfileModal
					handleOpenModal={handleOpenModal}
					memberId={memberId}
					myName={myName}
					myIntro={myIntro}
				/>
			)}
			{isOpenSide && (
				<ModalBackdrop
					onClick={(e) => {
						e.preventDefault();
						handleOpenSide();
					}}
				/>
			)}
		</>
	);
};

export default MypageInfo;

const Wrapper = styled.div`
	padding: 40px 0 80px;
	// Mobile
	@media screen and (max-width: 640px) {
		padding: 20px 0 60px;
	}
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
		display: flex;
		margin-bottom: 15px;
	}
`;

const Name = styled.div`
	font-size: 24px;
	font-weight: 500;
	margin-right: 10px;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 20px;
	}
`;

const Edit = styled.button`
	padding: 5px;
	color: ${(props) => props.theme.colors.gray500};
	font-size: 18px;
	transition: 0.1s;

	:hover {
		color: ${(props) => props.theme.colors.gray600};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 16px;
	}
`;

export const Follower = styled.div`
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

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 14px;
	}
`;

const Email = styled.div`
	margin-bottom: 40px;
	color: ${(props) => props.theme.colors.gray600};
	font-size: 14px;
	font-weight: 300;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: 12px;
	}
`;

const Bottom = styled.div`
	padding: 40px 60px;
	min-height: 120px;
	background-color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	box-shadow: 1px 1px 10px #4d0bd133;

	// Mobile
	@media screen and (max-width: 640px) {
		padding: 30px;
		min-height: 80px;
	}
`;
