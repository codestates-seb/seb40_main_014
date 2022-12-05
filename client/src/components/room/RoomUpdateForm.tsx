import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { updateRoom } from '../../api/roomApi';
import { useParams } from 'react-router-dom';

type updateRoomInfo = {
	title: string;
	password?: string;
	playlist: string[] | string;
	people: string;
};

const UpdateForm = styled.form`
	font-size: ${(props) => props.theme.fontSize.small};
	display: flex;
	flex-direction: column;
	align-items: center;
	.top {
		margin-top: 15px;
	}
	z-index: 9999;
`;
const DefaultInput = styled.input`
	width: 300px;
	height: 35px;
	border: 1px solid ${(props) => props.theme.colors.gray500};
	border-radius: ${(props) => props.theme.radius.largeRadius};
	padding: 0px 10px 0px 10px;
	margin: 5px;
	:focus-within {
		outline: none;
		border-color: ${(props) => props.theme.colors.lightPurple};
		box-shadow: 0 0 10px ${(props) => props.theme.colors.lightPurple};
	}
`;

const InputContainer = styled.div`
	color: ${(props) => props.theme.colors.gray700};
	margin: 10px;
	.add {
		justify-content: space-between;
	}
	z-index: 9999;
`;
const InputInfo = styled.div`
	margin: 5px;
	display: flex;
	align-items: center;
	color: ${(props) => props.theme.colors.black};
`;

const ErrorInfo = styled.div`
	font-size: ${(props) => props.theme.fontSize.xSmall};
	margin: 8px;
	color: #ff4848;
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

const RoomUpdateForm = ({ setTitle, setModalOpen, modalOpen, title }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<updateRoomInfo>();
	const [checked, setChecked] = useState(false);
	const params = useParams();
	const roomId = params.id;
	const onValid = (e) => {
		const UpdateRoomInfo = {
			title: e.title,
		};
		updateRoom(UpdateRoomInfo, roomId)
			.then((res) => {
				setTitle(res.data.title);
			})
			.then(() => setModalOpen(!modalOpen))
			.catch((err) => console.log(err));
	};

	const onCheck = () => {
		setChecked(!checked);
	};

	return (
		<UpdateForm onSubmit={handleSubmit(onValid)}>
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
					placeholder={title}></TitleInput>
			</InputContainer>
			<InputContainer>
				<InputInfo>
					비밀번호
					<PasswordCheckInput
						type="checkbox"
						onChange={onCheck}
						disabled></PasswordCheckInput>
				</InputInfo>
				<PasswordInput
					{...register('password')}
					placeholder="비밀번호는 수정할 수 없습니다!"
					autoComplete="off"
					disabled={!checked}></PasswordInput>
			</InputContainer>
			<InputContainer>
				<InputInfo className="add">플레이리스트</InputInfo>
				<PlaylistInput
					{...register('playlist')}
					placeholder="플레이리스트는 수정할 수 없습니다!"
					type="text"
					autoComplete="off"
					disabled></PlaylistInput>
			</InputContainer>
			{/* <InputContainer>
				<InputInfo>최대 인원 수</InputInfo>
				<PeopleInput
					{...register('people')}
					placeholder="최대 인원 수는 수정할 수 없습니다!"
					type="number"
					disabled></PeopleInput>
			</InputContainer> */}
			<CreateRoomBtn
				as="input"
				autoComplete="off"
				type="submit"
				value="방 수정"></CreateRoomBtn>
			{/* <CreateRoomBtn type="submit">방 수정</CreateRoomBtn> */}
		</UpdateForm>
	);
};

export default RoomUpdateForm;
