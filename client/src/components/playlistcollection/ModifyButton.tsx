import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { deletePlayList } from '../../api/playlistApi';
import { DefaultBtn, DefaultButton } from '../common/Button';

const ModifyButton = ({ playlistId }) => {
	const navigate = useNavigate();

	const onClickDelete = () => {
		deletePlayList(playlistId).then((res) => console.log(res));
	};
	return (
		<ModifyButtonStyle>
			<DefaultButton
				onClick={() => navigate(`/makeplaylist/modify/${playlistId}`)}>
				수정
			</DefaultButton>
			<Deletebutton onClick={onClickDelete}>삭제</Deletebutton>
		</ModifyButtonStyle>
	);
};

export default ModifyButton;

const ModifyButtonStyle = styled.div`
	position: absolute;
	top: 7%;
	right: 3%;
	display: flex;
	justify-content: flex-end;
	align-items: center;

	button {
		margin-left: 16px;
		@media (max-width: 800px) {
			height: 20px;
		}
	}
`;

const Deletebutton = styled(DefaultBtn)`
	font-size: 16px;
	background-color: #f93c5fe5;
	:hover {
		background: linear-gradient(0deg, #fa1a2de9 0%, #fa243ddf 100%);
	}
`;
