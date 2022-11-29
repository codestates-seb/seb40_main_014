import styled from 'styled-components';
import { MyInitialStateValue } from '../../slices/mySlice';

type SearchUserType = {
	user: MyInitialStateValue;
};

const User = ({ user }: SearchUserType) => {
	console.log(user);
	return (
		<SearchUserStyle>
			<img src={user.picture} alt="profile" />
			<div>{user.name}</div>
			<div>{user.email}</div>
			<div>{user.follow}</div>
			<div>{user.grade}</div>
			<div>{user.rank}</div>
		</SearchUserStyle>
	);
};

export default User;

const SearchUserStyle = styled.div``;
