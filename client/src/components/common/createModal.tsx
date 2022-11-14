import styled from 'styled-components';
import { ImExit } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const ModalContaincer = styled.div`
	font-size: var(--x-small);
	background-color: var(--background-color);
	width: 550px;
	height: 500px;
	box-shadow: var(--gray-400) 0px 5px 12px;
	border-radius: var(--radius);
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 2;
`;

const Modalheader = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: var(--purple);
	color: var(--white);
	border-radius: var(--radius) var(--radius) 0px 0px;
	margin-bottom: 10px;
`;

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 15px;
`;
const ModalOverlay = styled.div`
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	backdrop-filter: blur(2px);
	z-index: 1;
	position: fixed;
`;

const ExitBtn = styled.button`
	font-size: var(--x-medium);
`;

const CreateForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const DefaultInput = styled.input`
	width: 300px;
	height: 35px;
	border: 1px solid var(--gray-500);
	border-radius: var(--radius);
	padding: 0px 10px 0px 10px;
	:focus {
		outline: 0.5px solid var(--purple);
		box-shadow: var(--purple) 0px 0px 0px 1px;
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
	width: 320px;
	height: 35px;
	border-radius: var(--radius);
	padding: 0px 10px 0px 5px;
`;
const CategoryList = styled.div`
	margin-top: 5px;
	display: flex;

	span {
		display: flex;
		font-size: var(--x-small);
		justify-content: center;
		align-items: center;
		width: 45px;
		height: 20px;
		margin: 3px;
		background-color: var(--purple);
		border-radius: 5px;
		color: var(--white);
	}
`;
const CreateRoomBtn = styled.button`
	background-color: var(--purple);
	color: var(--white);
	width: 70px;
	height: 30px;
	border-radius: var(--radius);
	margin-top: 10px;
`;

const AddPlaylistBtn = styled.button`
	background-color: var(--purple);
	color: var(--white);
	width: 40px;
	height: 23px;
	border-radius: var(--radius);
`;

const CreateModal = ({ modalOpen, setModalOpen }) => {
	const { register, watch, handleSubmit } = useForm();
	const [checked, setChecked] = useState(false);
	const [pickCategory, setPickCategory] = useState<string[]>([]);
	const [addModalOpen, setAddModalOpen] = useState(false);

	const onClick = () => {
		setModalOpen(!modalOpen);
	};

	const onCheck = () => {
		setChecked(!checked);
	};

	const handleSelect = (e) => {
		if (e.target.value !== '' && !pickCategory.includes(e.target.value)) {
			setPickCategory([...pickCategory, e.target.value]);
		}

		console.log(pickCategory);
	};

	const onValid = (e) => {
		console.log(e);
	};

	const handleAdd = () => {
		return setAddModalOpen(!addModalOpen);
	};

	return (
		<>
			<ModalOverlay></ModalOverlay>
			<ModalContaincer>
				<Modalheader>
					<HeaderContent>
						<div>방 만들기</div>
					</HeaderContent>
					<HeaderContent>
						<ExitBtn onClick={onClick}>
							<ImExit />
						</ExitBtn>
					</HeaderContent>
				</Modalheader>

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
							<AddPlaylistBtn onClick={handleAdd}>추가</AddPlaylistBtn>
						</InputInfo>

						<PlaylistInput></PlaylistInput>
					</InputContainer>
					<InputContainer>
						<InputInfo>인원 수</InputInfo>
						<PeopleInput
							{...register('people')}
							placeholder="인원 수"
							type="number"></PeopleInput>
					</InputContainer>
					<CreateRoomBtn
						as="input"
						type="submit"
						value="방 생성"></CreateRoomBtn>
				</CreateForm>
			</ModalContaincer>
		</>
	);
};

export default CreateModal;
