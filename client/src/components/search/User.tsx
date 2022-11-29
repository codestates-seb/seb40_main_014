import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MyInitialStateValue } from '../../slices/mySlice';
import Badge from '../common/Badge';
import { RoomStyle, ThumbnailBackdrop } from '../home/Room';

type SearchUserType = {
	user: MyInitialStateValue;
};

const User = ({ user }: SearchUserType) => {
	const { picture, memberId, grade, name, email } = user;

	return (
		<SearchUserStyle>
			<Profile>
				<img src={picture} alt="thumbnail" />
				<Link to={`/mypage/${memberId}`}>
					<ProfileBackdrop />
				</Link>
			</Profile>
			<div>
				<Badge grade={grade} margin="0 0 7px 0" />
				<Name>
					<Link to={`/mypage/${memberId}`}>{name}</Link>
				</Name>
				<Email>{email}</Email>
			</div>
		</SearchUserStyle>
	);
};

const SearchUserStyle = styled(RoomStyle)`
	display: flex;
	align-items: center;
`;

const ProfileBackdrop = styled(ThumbnailBackdrop)`
	border-radius: 50%;
`;

const Profile = styled.div`
	position: relative;
	margin-right: 20px;
	cursor: pointer;

	:hover {
		${ThumbnailBackdrop} {
			display: block;
		}
	}

	img {
		width: 55px;
		border-radius: 50%;

		// Mobile
		@media screen and (max-width: 640px) {
			width: 50px;
		}
	}
`;

const Name = styled.div`
	margin-bottom: 7px;

	:hover {
		color: ${(props) => props.theme.colors.purple};
	}
`;

const Email = styled.div`
	color: ${(props) => props.theme.colors.gray600};
	font-size: 12px;
`;

export default User;
