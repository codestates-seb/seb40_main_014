import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getRoomById } from '../../api/roomApi';
import { GiChessKing } from 'react-icons/gi';
import UserModal from './userModal';

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

const PeoplePart = ({ people, isAdmin }) => {
	// const [people, setPeople] = useState([]);
	// const params = useParams();
	// const roomId = params.id;
	const userRef = useRef(null);
	const filtered = people.reduce((acc, v) => {
		return acc.includes(v) ? acc : [...acc, v];
	}, []);
	const [modalOpen, setModalOpen] = useState(false);
	const onClick = (e) => {
		setModalOpen(!modalOpen);
	};

	return (
		<PeopleSetcion>
			<PeopleContainer>
				{filtered.map((e, index) => {
					return (
						<>
							<Person ref={userRef} onClick={onClick} key={index}>
								{isAdmin ? (
									<GiChessKing className="option_btn"></GiChessKing>
								) : null}
								{e}
							</Person>
							{modalOpen && (
								<UserModal
									userRef={userRef}
									modalOpen={modalOpen}
									setModalOpen={setModalOpen}
								/>
							)}
						</>
					);
				})}
			</PeopleContainer>
		</PeopleSetcion>
	);
};

export default PeoplePart;
