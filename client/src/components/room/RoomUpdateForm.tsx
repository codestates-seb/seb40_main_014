import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';

type updateRoomInfo = {
	title: string;
	password?: string;
	playlist: string[] | string;
	people: string;
};

const UpdateForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
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
	margin: 5px;
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

const RoomUpdateForm = () => {
	const { register, handleSubmit } = useForm<updateRoomInfo>();
	const [checked, setChecked] = useState(false);

	const onValid = (e) => {
		const UpdateRoomInfo = {
			title: e.title,
			password: e.password,
			people: e.people,
		};

		console.log('수정될 방의 정보', UpdateRoomInfo);

		axios
			.post(
				`${process.env.REACT_APP_STACK_SERVER_TEST}/rooms/update`,
				UpdateRoomInfo,
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const onCheck = () => {
		setChecked(!checked);
	};

	return (
		<UpdateForm onSubmit={handleSubmit(onValid)}>
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
				<InputInfo className="add">플레이리스트</InputInfo>
				<PlaylistInput
					{...register('playlist')}
					placeholder="플레이리스트는 수정할 수 없습니다!"
					type="text"
					disabled></PlaylistInput>
			</InputContainer>
			<InputContainer>
				<InputInfo>최대 인원 수</InputInfo>
				<PeopleInput
					{...register('people')}
					placeholder="최대 인원 수"
					type="number"></PeopleInput>
			</InputContainer>
			{/* <Link to="/room"> */}
			<CreateRoomBtn as="input" type="submit" value="방 수정"></CreateRoomBtn>
			{/* </Link> */}
		</UpdateForm>
	);
};

export default RoomUpdateForm;
