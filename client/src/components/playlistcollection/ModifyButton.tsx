import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { deletePlayList } from '../../api/playlistApi';
import { getUserInfo } from '../../api/userApi';
type ModifyButtonType = {
	playlistId: number;
	setPlayLists?: Dispatch<SetStateAction<Array<object>>>;
	fontSize?: string;
};

type ModifyButtonProps = {
	fontSize?: string;
};

const ModifyButton = ({
	playlistId,
	setPlayLists,
	fontSize,
}: ModifyButtonType) => {
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
		<ModifyButtonStyle fontSize={fontSize}>
			<EditButton
				onClick={() => navigate(`/makeplaylist/modify/${playlistId}`)}>
				수정
			</EditButton>
			<Deletebutton onClick={onClickDelete}>삭제</Deletebutton>
		</ModifyButtonStyle>
	);
};

export default ModifyButton;

const ModifyButtonStyle = styled.div<ModifyButtonProps>`
	display: flex;

	button {
		margin-left: 15px;
		width: 60px;
		height: 35px;
		font-size: ${(props) => (props.fontSize ? props.fontSize : '14px')};
		border-radius: ${(props) => props.theme.radius.smallRadius};
	}

	// Mobile
	@media screen and (max-width: 640px) {
		justify-content: flex-end;

		button {
			margin-left: 10px;
			width: 52px;
			height: 30px;
			font-size: ${(props) => (props.fontSize ? '14px' : '12px')};
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
	background-color: ${(props) => props.theme.colors.white};
	border: 1.3px solid ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.purple};
	:hover {
		background-color: #f1eaff;
	}
`;
