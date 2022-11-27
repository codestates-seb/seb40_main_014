import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deletePlayList } from '../../api/playlistApi';
import { getUserInfo } from '../../api/userApi';
type ModifyButtonType = {
	playlistId: number;
	setPlayLists?: Dispatch<SetStateAction<Array<object>>>;
};

const ModifyButton = ({ playlistId, setPlayLists }: ModifyButtonType) => {
	const navigate = useNavigate();
	const pathname = useLocation().pathname.split('/')[1];
	const { userId } = useParams();

	const onClickDelete = () => {
		deletePlayList(playlistId).then((res) => {
			console.log();
			if (res === 'success playlist deleted') {
				if (pathname === 'playlistdetail') {
					navigate(-1);
				}
				if (pathname === 'playlistcollection') {
					getUserInfo(Number(userId)).then((res) => {
						if (res.data) {
							setPlayLists(res.data.playlist.data);
						} else {
							alert(res);
						}
					});
				}
			}
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
		background-color: #f1eaff;
	}

	// Mobile
	@media screen and (max-width: 640px) {
		margin-left: 10px;
	}
`;
