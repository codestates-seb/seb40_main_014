import styled from 'styled-components';
import { MyInitialStateValue, myValue } from '../../slices/mySlice';
import { AiFillEdit, AiFillInfoCircle } from 'react-icons/ai';
import { useState, useCallback, useEffect, useRef } from 'react';
import { followUser } from '../../api/userApi';
import Badge from '../common/Badge';
import EditProfileModal from './EditProfileModal';
import { ModalBackdrop } from '../home/LoginModal';
import { useSelector } from 'react-redux';
import { Info, InfoText, Title } from '../../pages/RoomList';

type MypageInfoType = {
	userInfo: MyInitialStateValue;
	myId: number;
};

const MypageInfo = ({ userInfo, myId }: MypageInfoType) => {
	const infoRef = useRef(null);
	const infoTextRef = useRef(null);

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
			const { follow, followState } = res.data;

			setFollowNum(follow);
			setFollowCheck(followState);
		});
	};

	//* 등급 정보창 오픈
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
		<>
			<Wrapper>
				<Top>
					<Img src={picture} alt="프로필" />
					<MyInfo>
						<Title>
							<Badge grade={grade} margin="0px 0px 15px 0px" />
							<Info ref={infoRef}>
								<AiFillInfoCircle
									color="#a3a3a3"
									cursor="pointer"
									fontSize="14px"
								/>
								<MyInfoText ref={infoTextRef}>
									<BadgeInfo>
										<div>
											<Badge grade="SILVER" />
											<span>팔로워 + 플리 좋아요 0 이상</span>
										</div>
										<div>
											<Badge grade="GOLD" />
											<span>팔로워 + 플리 좋아요 5 이상</span>
										</div>
										<div>
											<Badge grade="VIP" />
											<span>팔로워 + 플리 좋아요 10 이상</span>
										</div>
										<div>
											<Badge grade="LUVIP" />
											<span>팔로워 + 플리 좋아요 20 이상</span>
										</div>
									</BadgeInfo>
								</MyInfoText>
							</Info>
						</Title>
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
							{myId !== memberId && (
								<button onClick={handleFollow}>
									{followCheck ? '언팔로우' : '팔로우'}
								</button>
							)}
						</Follower>
					</MyInfo>
				</Top>
				<Bottom>
					{myId === memberId && (
						<IntroEdit onClick={handleOpenModal}>
							<AiFillEdit />
						</IntroEdit>
					)}
					{myId === memberId
						? myIntro || '등록된 자기소개가 없습니다'
						: content || '등록된 자기소개가 없습니다'}
				</Bottom>
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

//
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

const MyInfo = styled.div`
	> div:nth-of-type(2) {
		display: flex;
		margin-bottom: 15px;
	}
`;

const MyInfoText = styled(InfoText)`
	width: 265px;
`;

const BadgeInfo = styled.div`
	> div {
		display: flex;
		> *:first-of-type {
			width: 61.198px;
		}
		span {
			margin-left: 7px;
		}
	}
	> div:nth-of-type(1) {
		color: ${(props) => props.theme.colors.gray600};
	}
	> div:nth-of-type(2) {
		color: #f59f00;
	}
	> div:nth-of-type(3) {
		color: ${(props) => props.theme.colors.purple};
	}
	> div:nth-of-type(4) {
		color: ${(props) => props.theme.colors.pink};
	}
`;

const Name = styled.div`
	font-size: 24px;
	font-weight: 500;
	margin-right: 10px;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.large};
	}
`;

const Edit = styled.button`
	padding: 5px;
	color: ${(props) => props.theme.colors.gray500};
	font-size: 18px;
	transition: 0.1s;

	:hover {
		opacity: 0.75;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.medium};
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
			opacity: 0.75;
		}

		// Mobile
		@media screen and (max-width: 640px) {
			margin-left: 17px;
			font-size: 10px;
		}
	}

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.small};
	}
`;

const Email = styled.div`
	margin-bottom: 40px;
	color: ${(props) => props.theme.colors.gray600};
	font-size: ${(props) => props.theme.fontSize.small};
	font-weight: 300;

	// Mobile
	@media screen and (max-width: 640px) {
		font-size: ${(props) => props.theme.fontSize.xSmall};
	}
`;

const Bottom = styled.div`
	position: relative;
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

const IntroEdit = styled(Edit)`
	position: absolute;
	top: 10px;
	right: 15px;

	// Mobile
	@media screen and (max-width: 640px) {
		top: 5px;
		right: 10px;
	}
`;
