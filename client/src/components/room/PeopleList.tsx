import styled from 'styled-components';

const PeopleSetcion = styled.div`
	margin-top: 80px;
	margin-bottom: 10px;
	width: 230px;
	height: 110px;
	background-color: ${(props) => props.theme.colors.white};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	box-shadow: 0px 5px 5px 0px ${(props) => props.theme.colors.gray500};
`;

const PeopleContainer = styled.div`
	height: 110px;
	border-radius: 0px 0px ${(props) => props.theme.radius.largeRadius} 10px;
	padding: 10px;
	overflow: scroll;
	font-size: ${(props) => props.theme.fontSize.xSmall};
`;

const Person = styled.div`
	margin: 5px;
	padding-bottom: 5px;
	border-bottom: solid 1px ${(props) => props.theme.colors.gray400};
`;

const PeoplePart = () => {
	return (
		<PeopleSetcion>
			<PeopleContainer>
				<Person>문지훈</Person>
				<Person>송준모</Person>
				<Person>홍유진</Person>
				<Person>김아리</Person>
				<Person>노영석</Person>
				<Person>정경은</Person>
			</PeopleContainer>
		</PeopleSetcion>
	);
};

export default PeoplePart;
