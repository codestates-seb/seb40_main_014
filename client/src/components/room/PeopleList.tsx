import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { getRoomById } from '../../api/roomApi';
import { GiChessKing } from 'react-icons/gi';
import { AiTwotoneHome } from 'react-icons/ai';
import { followUser, getAllUserInfo, getFollowList } from '../../api/userApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Swal from 'sweetalert2';

const PeopleSetcion = styled.div`
	margin-top: 80px;
	margin-bottom: 10px;
	width: 230px;
	height: 110px;
	background-color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
	@media screen and (max-width: 640px) {
		margin-top: -10px;
		margin-bottom: 20px;
		height: 65px;
	}
`;

const PeopleContainer = styled.div`
	height: 110px;
	border-radius: 0px 0px ${(props) => props.theme.radius.largeRadius} 10px;
	padding: 10px;
	overflow-y: scroll;
	font-size: ${(props) => props.theme.fontSize.xSmall};

	::-webkit-scrollbar {
		display: none;
	}
	:hover {
		::-webkit-scrollbar {
			display: block;
			width: 8px;
		}

		::-webkit-scrollbar-thumb {
			height: 30%;
			background-color: ${(props) => props.theme.colors.gray300};

			border-radius: ${(props) => props.theme.radius.largeRadius};
		}

		::-webkit-scrollbar-track {
			background: rgba(33, 122, 244, 0.1);
			border-radius: ${(props) => props.theme.radius.largeRadius};
		}
	}
	@media screen and (max-width: 640px) {
		height: 65px;
	}
`;

const Person = styled.div`
	margin: 5px;
	padding-bottom: 5px;
	border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
	display: flex;
	justify-content: space-between;
	align-items: center;

	.follow {
		margin-right: 5px;
		height: 20px;

		:hover {
			opacity: 0.7;
		}
	}

	.home {
		cursor: pointer;
		:hover {
			color: ${(props) => props.theme.colors.purple};
		}
	}

	.option_btn {
		color: #df7a2894;
		width: 12px;
		height: 12px;
		margin-right: 2px;
	}
`;

const FollowBtn = styled.button`
	margin-right: 12px;
	width: 40px;
	font-size: 10px;
	background-color: ${(props) => props.theme.colors.white};
	color: ${(props) => props.theme.colors.purple};
	border-radius: ${(props) => props.theme.radius.smallRadius};
	transition: 0.1s;
	border: 1px solid ${(props) => props.theme.colors.purple};
	padding: 2px;
`;

const EmptyDiv = styled.div`
	padding: 2px;
`;

const PeoplePart = ({ people, roomId }) => {
	// const [people, setPeople] = useState([]);
	// const params = useParams();
	// const roomId = params.id;
	const [admin, setAdmin] = useState<string>('');
	const userRef = useRef(null);
	const userInfo = useSelector((state: RootState) => state.my.value);

	const follow = (e) => {
		getAllUserInfo()
			// localStorage.getItem('accessToken')
			.then((res) => {
				const filtered = res.data.filter(
					(el) =>
						el.name === e.target.parentNode.parentNode.innerText.split('\n')[0],
				);
				return filtered;
			})
			.then((data) => {
				getFollowList(userInfo.memberId)
					.then((response) => {
						const followlist = response.data.map((e) => e.name);

						if (followlist.includes(data[0].name)) {
							Swal.fire({
								// icon: 'warning',
								text: '이미 팔로우 된 유저입니다. 언팔로우하시겠습니까?',
								showCancelButton: true,
							}).then((res) => {
								if (res.isConfirmed) {
									followUser(data[0].memberId).then(() => {
										Swal.fire({
											// icon: 'warning',
											text: '해당 유저를 언팔로우하였습니다.',
										});
									});
								} else {
									Swal.fire({
										// icon: 'warning',
										text: '취소하였습니다.',
									});
								}
							});
						} else {
							followUser(data[0].memberId).then(() => {
								Swal.fire({
									// icon: 'warning',
									text: '해당 유저를 팔로우하였습니다.',
								});
							});
						}
					})

					.catch((err) => console.log(err));
			});
	};

	const linkMyPage = (e) => {
		getAllUserInfo()
			// localStorage.getItem('accessToken')
			.then((res) => {
				return res.data.filter(
					(el) =>
						el.name ===
						e.target.parentNode.parentNode.parentNode.innerText.split('\n')[0],
				);
			})
			.then((data) => {
				window.open(`/mypage/${data[0].memberId}`, '_blank');
			});
	};
	const adminCheck = () => {
		getRoomById(roomId).then((res) =>
			setAdmin(res.data.memberResponseDto.name),
		);
	};

	useEffect(() => {
		adminCheck();
	}, []);

	return (
		<PeopleSetcion>
			<PeopleContainer>
				{people.map((e, index) => {
					return (
						<Person key={index}>
							<div ref={userRef}>
								{e === admin ? (
									<GiChessKing className="option_btn"></GiChessKing>
								) : null}
								{e}
							</div>

							<div className="option">
								{e === userInfo.name ? (
									<EmptyDiv></EmptyDiv>
								) : (
									<FollowBtn className="follow" onClick={follow}>
										팔로우
									</FollowBtn>
								)}

								<AiTwotoneHome
									className="option_btn home"
									onClick={linkMyPage}></AiTwotoneHome>
							</div>
						</Person>
					);
				})}
			</PeopleContainer>
		</PeopleSetcion>
	);
};

export default PeoplePart;
