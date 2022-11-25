import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AddModal from './addModal';
import { DefaultButton } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { myLogin } from '../../slices/mySlice';
import { currentRoomInfo } from '../../slices/roomSlice';
import instance, { root } from '../../api/root';
import { createRoom } from '../../api/roomApi';

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
	:focus {
		outline: 0.1px solid ${(props) => props.theme.colors.purple};
		box-shadow: ${(props) => props.theme.colors.purple} 0px 0px 0px 1px;
		border: none;
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
`;
const TitleInput = styled(DefaultInput)``;
const PasswordInput = styled(DefaultInput)``;
const PasswordCheckInput = styled.input``;
const PlaylistInput = styled(DefaultInput)``;
const PeopleInput = styled(DefaultInput)``;

const CreateRoomBtn = styled.button`
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	width: 70px;
	height: 30px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	margin-top: 30px;
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

const RoomCreateForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userInfo = useSelector((state: RootState) => state.my.value);
	const roomInfo = useSelector((state: RootState) => state.room);
	console.log('roomInfo', roomInfo);
	const isLogin = useSelector(myLogin);
	const { register, handleSubmit } = useForm<roomInfo>();
	const [checked, setChecked] = useState<boolean>(false);
	const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

	const onValid = async (e) => {
		const CreateRoomInfo = {
			memberId: userInfo.memberId,
			title: e.title,
			pwd: e.password,
			playlist: e.playlist,
			maxCount: e.people,
		};
		// console.log('생성될 방의 정보', CreateRoomInfo);

		if (!isLogin) {
			alert('로그인 후 생성하실 수 있습니다.');
		} else {
			// instance
			// 	.post(`/rooms`, CreateRoomInfo)
			// 	.then((res) => {
			// 		console.log(res);
			// 		navigate(`rooms/${res.data.roomId}`);
			// 	})
			// 	.catch((err) => console.log(err));
			createRoom(CreateRoomInfo)
				.then((res) => {
					// console.log(res);
					navigate(`rooms/${res.data.roomId}`);
				})
				.catch((err) => console.log(err));
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
				<TitleInput
					{...register('title', { required: true })}
					placeholder="방 제목"></TitleInput>
			</InputContainer>
			<InputContainer>
				<InputInfo>
					비밀번호
					<PasswordCheckInput
						type="checkbox"
						onChange={onCheck}></PasswordCheckInput>
				</InputInfo>
				<PasswordInput
					{...register('password')}
					placeholder="비밀번호"
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
					{addModalOpen && <AddModal></AddModal>}
				</InputInfo>
				<PlaylistInput
					{...register('playlist', { required: true })}
					placeholder="플레이리스트를 추가해주세요!"
					type="text"></PlaylistInput>
			</InputContainer>
			<InputContainer>
				<InputInfo>최대 인원 수</InputInfo>
				<PeopleInput
					{...register('people')}
					placeholder="최대 인원 수"
					type="number"></PeopleInput>
			</InputContainer>
			<CreateRoomBtn as="input" type="submit" value="방 생성"></CreateRoomBtn>
		</CreateForm>
	);
};

export default RoomCreateForm;
