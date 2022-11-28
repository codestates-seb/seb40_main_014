import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getRoomById } from '../../api/roomApi';
import { GiChessKing } from 'react-icons/gi';
import UserModal from './userModal';
import { AiTwotoneHome } from 'react-icons/ai';

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

			border-radius: 10px;
		}

		::-webkit-scrollbar-track {
			background: rgba(33, 122, 244, 0.1);
			border-radius: 10px;
		}
	}
`;

const Person = styled.div`
	margin: 5px;
	padding-bottom: 5px;
	border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
	display: flex;
	justify-content: space-between;

	:hover {
		cursor: pointer;
	}

	.option_btn {
		color: #df7a2894;
		width: 13px;
		height: 13px;
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

const PeoplePart = ({ people, isAdmin, roomId }) => {
	// const [people, setPeople] = useState([]);
	// const params = useParams();
	// const roomId = params.id;
	const userRef = useRef(null);
	const [peopleList, setPeopleList] = useState([]);
	const filtered = people.reduce((acc, v) => {
		return acc.includes(v) ? acc : [...acc, v];
	}, []);

	const onClick = (e) => {
		console.log(userRef.current.innerText);
	};

	const linkMyPage = (e) => {
		console.log(e);
	};
	useEffect(() => {
		getRoomById(roomId)
			.then((res) => {
				setPeopleList(res.data.userlist);
				console.log('피플때매 렌더링', res.data.userlist);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<PeopleSetcion>
			<PeopleContainer>
				{peopleList.map((e, index) => {
					return (
						<>
							<Person onClick={onClick} key={index}>
								<div ref={userRef}>
									{isAdmin ? (
										<GiChessKing className="option_btn"></GiChessKing>
									) : null}
									{e}
								</div>
								<div>
									<FollowBtn className="follow">팔로우</FollowBtn>
									<AiTwotoneHome
										className="option_btn home"
										onClick={linkMyPage}></AiTwotoneHome>
								</div>
							</Person>

							{/* {modalOpen && (
								<UserModal
									userRef={userRef}
									modalOpen={modalOpen}
									setModalOpen={setModalOpen}
								/>
							)} */}
						</>
					);
				})}
			</PeopleContainer>
		</PeopleSetcion>
	);
};

export default PeoplePart;
