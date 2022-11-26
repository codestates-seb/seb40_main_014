import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getRoomById } from '../../api/roomApi';

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

	:hover {
		::-webkit-scrollbar {
			width: 8px;
		}

		::-webkit-scrollbar-thumb {
			height: 30%;
			background: ${(props) => props.theme.colors.gray300};

			border-radius: 10px;
		}

		::-webkit-scrollbar-track {
			background: rgba(33, 122, 244, 0.1);
		}
	}
`;

const Person = styled.div`
	margin: 5px;
	padding-bottom: 5px;
	border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
`;

const PeoplePart = () => {
	const [people, setPeople] = useState([]);
	const params = useParams();
	const roomId = params.id;
	useEffect(() => {
		getRoomById(roomId)
			.then((res) => setPeople(res.data.userlist))
			.catch((err) => console.log(err));
	}, []);

	// 사람이 들어올때 어떻게 할것인가..
	return (
		<PeopleSetcion>
			<PeopleContainer>
				{people.map((e, index) => {
					return <Person key={index}>{e}</Person>;
				})}
			</PeopleContainer>
		</PeopleSetcion>
	);
};

export default PeoplePart;
