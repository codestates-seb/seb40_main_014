import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AddModal from './addModal';
import { DefaultButton } from '../common/Button';

export type roomInfo = {
	title: string;
	password?: string;
	category: string[];
	content: string;
	people: string;
};

const CreateForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
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
	margin: 5px;
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
const CategorySelect = styled.select`
	width: 300px;
	height: 35px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	padding: 0px 10px 0px 5px;
	:focus {
		outline: 0.1px solid ${(props) => props.theme.colors.purple};
		box-shadow: ${(props) => props.theme.colors.purple} 0px 0px 0px 1px;
		border: none;
	}
`;
const CategoryList = styled.div`
	margin-top: 5px;
	display: flex;

	span {
		display: flex;
		font-size: ${(props) => props.theme.fontSize.xSmall};
		justify-content: center;
		align-items: center;
		width: 45px;
		height: 20px;
		margin: 3px;
		background-color: ${(props) => props.theme.colors.purple};
		border-radius: 5px;
		color: ${(props) => props.theme.colors.white};
	}
`;
const CreateRoomBtn = styled.button`
	background-color: ${(props) => props.theme.colors.purple};
	color: ${(props) => props.theme.colors.white};
	width: 70px;
	height: 30px;
	border-radius: ${(props) => props.theme.radius.largeRadius};
	margin-top: 10px;
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

// const AddPlaylistBtn = styled.button`
// 	background-color: ${(props) => props.theme.colors.purple};
// 	color: ${(props) => props.theme.colors.white};
// 	width: 40px;
// 	height: 23px;
// 	border-radius: ${(props) => props.theme.radius.largeRadius};
// `;

const RoomCreateForm = () => {
	const { register, handleSubmit } = useForm<roomInfo>();
	const [checked, setChecked] = useState(false);
	const [pickCategory, setPickCategory] = useState<string[]>([]);
	const [addModalOpen, setAddModalOpen] = useState(false);

	const handleSelect = (e) => {
		if (e.target.value !== '' && !pickCategory.includes(e.target.value)) {
			setPickCategory([...pickCategory, e.target.value]);
		}
	};

	const onValid = (e) => {
		const CreateRoomInfo = {
			title: e.title,
			password: e.password,
			category: pickCategory,
			playlist: e.content,
			people: e.people,
		};

		console.log('생성될 방의 정보', CreateRoomInfo);
	};

	const onCheck = () => {
		setChecked(!checked);
	};

	const handleAdd = () => {
		return setAddModalOpen(!addModalOpen);
	};

	return (
		<CreateForm onSubmit={handleSubmit(onValid)}>
			<InputContainer>
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
				<InputInfo>카테고리</InputInfo>
				<CategorySelect onChange={handleSelect} name="category">
					<option value="">카테고리 선택</option>
					<option value="팝">팝</option>
					<option value="발라드">발라드</option>
					<option value="댄스">댄스</option>
					<option value="인디">인디</option>
					<option value="힙합">힙합</option>
				</CategorySelect>
				<CategoryList>
					{pickCategory.map((e) => (
						<span key={e}>{e}</span>
					))}
				</CategoryList>
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
					{...register('content')}
					placeholder="플레이리스트를 추가해주세요!"
					type="text"></PlaylistInput>
			</InputContainer>
			<InputContainer>
				<InputInfo>인원 수</InputInfo>
				<PeopleInput
					{...register('people')}
					placeholder="인원 수"
					type="number"></PeopleInput>
			</InputContainer>
			<CreateRoomBtn as="input" type="submit" value="방 생성"></CreateRoomBtn>
		</CreateForm>
	);
};

export default RoomCreateForm;
