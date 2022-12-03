import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AddModal from './addModal';
import { DefaultButton } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { myLogin } from '../../slices/mySlice';
import { createRoom } from '../../api/roomApi';
import { getBookmarkList, getUserInfo } from '../../api/userApi';
import Swal from 'sweetalert2';

export type roomInfo = {
	memberId: number;
	title: string;
	password?: string;
	playlist: string[] | string;
	people: string;
};

const CreateForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-size: ${(props) => props.theme.fontSize.small};
	.top {
		margin-top: 15px;
	}
`;
const DefaultInput = styled.input`
	width: 300px;
	height: 35px;
	border: 1px solid ${(props) => props.theme.colors.gray500};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	padding: 0px 10px 0px 10px;
	:focus-within {
		outline: none;
		border-color: ${(props) => props.theme.colors.lightPurple};
		box-shadow: 0 0 10px ${(props) => props.theme.colors.lightPurple};
	}
`;

const InputContainer = styled.div`
	margin: 10px;
	.add {
		justify-content: space-between;
	}
`;
const InputInfo = styled.div`
	margin: 5px 5px 10px 5px;
	display: flex;
	align-items: center;

	span {
		font-size: ${(props) => props.theme.fontSize.xSmall};
		margin-left: 23px;
		color: #ff4848;
	}
`;
const TitleInput = styled(DefaultInput)``;
const PasswordInput = styled(DefaultInput)``;
const PasswordCheckInput = styled.input``;
const PlaylistInput = styled(DefaultInput)``;

const CreateRoomBtn = styled.button`
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	width: 70px;
	height: 30px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	margin-top: 75px;
	box-shadow: inset 0px 2px 2px 0px rgba(255, 255, 255, 0.5),
		3px 3px 3px 0px rgba(0, 0, 0, 0.1), 2px 2px 3px 0px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	:hover {
		cursor: pointer;
		background: linear-gradient(
			0deg,
			rgba(96, 9, 240, 1) 0%,
			rgba(129, 5, 240, 1) 100%
		);
	}
`;

const ErrorInfo = styled.div`
	font-size: ${(props) => props.theme.fontSize.xSmall};
	margin: 8px;
	color: #ff4848;
`;
const RoomCreateForm = () => {
	const navigate = useNavigate();
	const userInfo = useSelector((state: RootState) => state.my.value);

	const isLogin = useSelector(myLogin);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<roomInfo>();
	const [checked, setChecked] = useState<boolean>(false);
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
	const [playlist, setPlaylist] = useState([]);
	const [bookMarkPlaylist, setBookMarkPlaylist] = useState([]);
	const [selectedPlaylist, setSelectedPlaylist] = useState({
		title: '',
		playlistId: 0,
	});
	useEffect(() => {
		getUserInfo(userInfo.memberId)
			.then((res) => {
				setPlaylist(res.data.playlist.data);
			})
			.catch((err) => console.log(err));

		// .catch((err) => {
		// 	if (err.name === 'TypeError')
		// 		Swal.fire({
		// 			icon: 'warning',
		// 			text: '로그인이 만료되었습니다. 로그인을 다시 해주세요.',
		// 		});
		// });
	}, []);
	useEffect(() => {
		getBookmarkList(userInfo.memberId).then((res) => {
			setBookMarkPlaylist(res.data);
		});
	}, []);

	const onValid = (e) => {
		const CreateRoomInfo = {
			memberId: userInfo.memberId,
			title: e.title,
			pwd: e.password,
			playlistId: selectedPlaylist.playlistId,
			maxCount: 100,
		};
		if (!isLogin) {
			Swal.fire({
				icon: 'warning',
				text: '로그인 후 생성하실 수 있습니다.',
			});
		} else {
			createRoom(CreateRoomInfo)
				.then((res) => {
					navigate(`rooms/${res.data.roomId}`);
				})
				.catch((err) => {
					if (err.name === 'TypeError') {
						Swal.fire({
							icon: 'warning',
							text: '플레이리스트를 추가해야합니다.',
						});
					}
				});
		}
	};

	const onCheck = () => {
		setChecked(!checked);
	};

	const handleAdd = () => {
		return setAddModalOpen(!addModalOpen);
	};

	return (
		<CreateForm onSubmit={handleSubmit(onValid)}>
			<InputContainer className="top">
				<InputInfo>방 제목</InputInfo>
				<ErrorInfo>{errors?.title?.message}</ErrorInfo>
				<TitleInput
					{...register('title', {
						required: '방 제목을 입력해주세요!',
						maxLength: {
							value: 20,
							message: '방 제목은 20자 이하여야 합니다.',
						},
					})}
					autoComplete="off"
					placeholder="방 제목"></TitleInput>
			</InputContainer>
			<InputContainer>
				<InputInfo>
					비밀번호
					<PasswordCheckInput
						type="checkbox"
						onChange={onCheck}></PasswordCheckInput>
				</InputInfo>
				<ErrorInfo>{errors?.password?.message}</ErrorInfo>
				<PasswordInput
					{...register('password', {
						maxLength: {
							value: 4,
							message: '비밀번호는 4자 이하여야 합니다.',
						},
					})}
					placeholder="비밀번호 설정 시 4자 이하여야 합니다."
					autoComplete="off"
					disabled={!checked}></PasswordInput>
			</InputContainer>

			<InputContainer>
				<InputInfo className="add">
					플레이리스트
					<DefaultButton
						width="40px"
						height="20px"
						fontSize="10px"
						onClick={handleAdd}>
						추가
					</DefaultButton>
					{addModalOpen && (
						<AddModal
							addModalOpen={addModalOpen}
							setAddModalOpen={setAddModalOpen}
							bookMarkPlaylist={bookMarkPlaylist}
							playlist={playlist}
							setSelectedPlaylist={setSelectedPlaylist}></AddModal>
					)}
				</InputInfo>
				<PlaylistInput
					{...register('playlist', { required: true })}
					placeholder="플레이리스트를 추가해주세요!"
					autoComplete="off"
					type="text"
					readOnly
					value={
						isLogin
							? selectedPlaylist.title
								? selectedPlaylist.title
								: '플레이리스트를 추가해주세요'
							: '로그인이 만료되었습니다. 로그인을 다시 해주세요.'
					}></PlaylistInput>
			</InputContainer>
			{/* <InputContainer>
				<InputInfo>최대 인원 수</InputInfo>
				<PeopleInput
					{...register('people')}
					placeholder="최대 인원 수"
					type="number"></PeopleInput>
			</InputContainer> */}
			<CreateRoomBtn as="input" type="submit" value="방 생성"></CreateRoomBtn>
		</CreateForm>
	);
};

export default RoomCreateForm;
