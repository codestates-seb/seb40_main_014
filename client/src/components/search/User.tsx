import { MyInitialStateValue } from '../../slices/mySlice';
import { RoomStyle } from '../home/Room';

type SearchUserType = {
	user: MyInitialStateValue;
};

const User = ({ user }: SearchUserType) => {
	return (
		<RoomStyle>
			<img src={user.picture} alt="profile" />
			<div>{user.name}</div>
			<div>{user.email}</div>
			<div>{user.follow}</div>
			<div>{user.grade}</div>
			<div>{user.rank}</div>
		</RoomStyle>
	);
};

export default User;
