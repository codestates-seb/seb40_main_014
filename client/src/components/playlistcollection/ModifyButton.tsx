import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePlayList } from '../../api/playlistApi';
import { myValue } from '../../slices/mySlice';

const ModifyButton = ({ playlistId }) => {
	const navigate = useNavigate();
	const loginId = useSelector(myValue).memberId;

	const onClickDelete = () => {
		deletePlayList(playlistId).then((res) => {
			console.log();
			// if (res === 'success playlist deleted') {
			// 	navigate(`/mypage/${loginId}`);
			// }
		});
	};

	return (
		<ModifyButtonStyle>
			<EditButton
				onClick={() => navigate(`/makeplaylist/modify/${playlistId}`)}>
				수정
			</EditButton>
			<Deletebutton onClick={onClickDelete}>삭제</Deletebutton>
		</ModifyButtonStyle>
	);
};

export default ModifyButton;

const ModifyButtonStyle = styled.div`
	display: flex;

	button {
		padding: 7px 18px;
		font-size: 14px;
		border-radius: ${(props) => props.theme.radius.smallRadius};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		justify-content: flex-end;

		button {
			padding: 5px 12px;
			font-size: 12px;
		}
	}
`;

const EditButton = styled.button`
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	:hover {
		background-color: #3f0ba9;
	}
`;

const Deletebutton = styled.button`
	margin-left: 15px;
	border: 1.3px solid ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.purple};
	:hover {
		background-color: ${(props) => props.theme.colors.gray50};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		margin-left: 10px;
	}
`;
