import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MyInitialStateValue, myLogin } from '../../slices/mySlice';
import Badge from '../common/Badge';
import { LinkRoom, RoomStyle } from '../home/Room';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

type SearchUserType = {
	user: MyInitialStateValue;
};

const User = ({ user }: SearchUserType) => {
	const navigate = useNavigate();
	const isLogin = useSelector(myLogin);

	const { picture, memberId, grade, name, email } = user;

	const onClickLinkName = () => {
		if (!isLogin) {
			Swal.fire({
				icon: 'warning',
				text: '로그인 후 이동하실 수 있습니다.',
			});
		} else {
			navigate(`/mypage/${memberId}`);
		}
	};

	return (
		<SearchUserStyle>
			<LinkUser onClick={onClickLinkName}>
				<Profile>
					<img src={picture} alt="프로필" />
				</Profile>
				<div>
					<Badge grade={grade} margin="0 0 8px 0" />
					<Name>{name}</Name>
					<Email>{email}</Email>
				</div>
			</LinkUser>
		</SearchUserStyle>
	);
};

const SearchUserStyle = styled(RoomStyle)`
	display: flex;
	align-items: center;
`;

const LinkUser = styled(LinkRoom)`
	display: flex;
	align-items: center;
`;

const Profile = styled.div`
	position: relative;
	margin-right: 20px;
	cursor: pointer;

	:hover {
		opacity: 0.75;
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
	margin-bottom: 8px;
	text-align: left;
`;

const Email = styled.div`
	color: ${(props) => props.theme.colors.gray600};
	font-size: ${(props) => props.theme.fontSize.xSmall};
`;

export default User;
